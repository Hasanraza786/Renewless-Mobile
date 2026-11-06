import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { createSound } from 'react-native-nitro-sound';
import { navigate } from '../../navigation/service';
import { sendAiTurn } from '../../redux/actions/ai-action';
import { addSubscription } from '../../redux/actions/detail-action';
import { useAppDispatch } from '../../redux/store';
import type { AiDraft, AiInput, SubscriptionFormInput } from '../../types';
import { missingQuestion } from '../../utils/ai-draft';

const SPEEDS = [1, 1.5, 2] as const;
const LIVE_BARS = 32;
// Metering is dBFS (about -60 quiet to 0 loud); bars keep a small floor so silence still shows.
const meterLevel = (db?: number) => (db == null ? 0.15 : Math.min(1, Math.max(0.12, (db + 60) / 60)));

export type Recording = { elapsed_ms: number; locked: boolean; paused: boolean; levels: number[] };
export type ChatMessage = { id: string; role: 'user' | 'loop'; input: AiInput | null; text: string; failed: boolean };
export type Attachment = { uri: string; name: string; file_kind: 'image' | 'pdf' };

const TEXT_LIMIT = 2000;
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/heic', 'image/heif'];
const MB = 1024 * 1024;
const OPENING = 'Which service would you like to add? Send its name and billing details.';

let next_id = 0;
const messageId = () => `m${Date.now()}-${next_id++}`;

const draftInput = (draft: AiDraft): SubscriptionFormInput => ({
  name: draft.name!,
  platform_id: draft.platform_id,
  price: Number(draft.price).toFixed(2),
  currency: draft.currency!,
  cycle: draft.cycle!,
  category: draft.category ?? 'Other',
  start_date: draft.start_date,
  next_date: draft.trial ? null : draft.next_date,
  trial: draft.trial && draft.trial.end_date ? { days: draft.trial.days ?? 0, end_date: draft.trial.end_date, auto_renew: draft.trial.auto_renew } : null,
  notes: draft.notes,
  price_change: null,
});

// Loop: one free chat for text, voice and one image/PDF. Nothing is saved until Add subscription.
export default function useAiChat() {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: messageId(), role: 'loop', input: null, text: OPENING, failed: false }]);
  const [draft, setDraft] = useState<AiDraft | null>(null);
  const [added_id, setAddedId] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [thinking, setThinking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [attach_open, setAttachOpen] = useState(false);
  const [attach_error, setAttachError] = useState('');
  const [recording, setRecording] = useState<Recording | null>(null);
  // Bumped on each slide-to-cancel so the composer plays the bin animation.
  const [discarded, setDiscarded] = useState(0);
  const [playing, setPlaying] = useState<{ id: string; position_ms: number; duration_ms: number; paused: boolean } | null>(null);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [preview_uri, setPreviewUri] = useState<string | null>(null);
  const recorder = useRef(createSound()).current;
  const player = useRef(createSound()).current;
  const mounted = useRef(true);

  // Leaving the chat stops recording and playback; local clips live only for this conversation.
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      recorder.removeRecordBackListener();
      recorder.stopRecorder().catch(() => undefined);
      player.removePlayBackListener();
      player.stopPlayer().catch(() => undefined);
    };
  }, [player, recorder]);

  const has_failed = messages.some(message => message.failed);
  const busy = thinking || saving;
  const can_send = !busy && !has_failed && (text.trim().length > 0 || !!attachment);
  const missing = draft ? missingQuestion(draft) : null;
  const draft_status = added_id ? 'Added to your subscriptions' : saving ? 'Adding…' : thinking ? 'Updating details…' : missing ? 'A few details to finish' : 'Ready to add';
  const can_add = !!draft && !missing && !busy && !has_failed && !added_id;
  const show_draft = !!draft?.name;
  const added = !!added_id;

  const run = async (message: ChatMessage) => {
    if (!message.input) return;
    setThinking(true);
    const result = await dispatch(sendAiTurn(message.input, added_id ? null : draft));
    if (!mounted.current) return;
    setThinking(false);
    if ('error' in result) {
      setMessages(current => current.map(item => (item.id === message.id ? { ...item, failed: true } : item)));
      return;
    }
    setMessages(current => [...current.map(item => (item.id === message.id ? { ...item, failed: false } : item)), { id: messageId(), role: 'loop', input: null, text: result.reply, failed: false }]);
    if (result.draft) {
      // A new service after an added one starts a separate draft.
      if (added_id && result.draft.name) setAddedId(null);
      setDraft(result.draft);
    }
  };

  const submit = (input: AiInput, shown: string) => {
    const message: ChatMessage = { id: messageId(), role: 'user', input, text: shown, failed: false };
    setMessages(current => [...current, message]);
    run(message);
  };

  const changeText = (value: string) => setText(value.slice(0, TEXT_LIMIT));

  const send = () => {
    if (!can_send) return;
    if (attachment) {
      submit({ kind: 'file', uri: attachment.uri, name: attachment.name, file_kind: attachment.file_kind }, text.trim());
      setAttachment(null);
    } else submit({ kind: 'text', text: text.trim() }, text.trim());
    setText('');
  };

  const retry = (id: string) => {
    const message = messages.find(item => item.id === id);
    if (message && !busy) run(message);
  };

  const add = async () => {
    if (!draft || !can_add) return;
    setSaving(true);
    const id = await dispatch(addSubscription(draftInput(draft)));
    if (!mounted.current) return;
    setSaving(false);
    if (!id) return;
    setAddedId(id);
    navigate('SubscriptionDetail', { id });
  };

  const viewAdded = () => added_id && navigate('SubscriptionDetail', { id: added_id });

  // Voice (WhatsApp-style): hold to record, release to send, slide left to discard, slide up to lock
  // hands-free with Delete / Pause / Send. A release can arrive before the recorder has started,
  // so every stop waits for the start.
  const record_start = useRef<{ at: number; ready: Promise<boolean> } | null>(null);
  const startRecording = () => {
    if (busy || has_failed || recording) return;
    recorder.setSubscriptionDuration(0.1);
    recorder.addRecordBackListener(meta => {
      if (!mounted.current) return;
      const level = meterLevel(meta.currentMetering);
      setRecording(current => (current && !current.paused ? { ...current, elapsed_ms: meta.currentPosition, levels: [...current.levels, level].slice(-LIVE_BARS) } : current));
    });
    setRecording({ elapsed_ms: 0, locked: false, paused: false, levels: [] });
    const ready = recorder.startRecorder(undefined, undefined, true).then(
      () => true,
      () => {
        setRecording(null);
        setAttachError('Unable to record. Allow microphone access in Settings and try again.');
        return false;
      },
    );
    record_start.current = { at: Date.now(), ready };
  };

  // Stops the recorder and returns the clip, or null when nothing usable was recorded.
  const stopRecording = async () => {
    const start = record_start.current;
    if (!start) return null;
    record_start.current = null;
    setRecording(null);
    recorder.removeRecordBackListener();
    if (!(await start.ready)) return null;
    const uri = await recorder.stopRecorder();
    return { uri, at: start.at };
  };

  const finishRecording = async () => {
    const current = recording;
    if (!current) return;
    try {
      const clip = await stopRecording();
      const duration_ms = current.elapsed_ms || (clip ? Date.now() - clip.at : 0);
      if (!clip || duration_ms < 500) return;
      submit({ kind: 'voice', uri: clip.uri, duration_ms }, '');
    } catch {
      setAttachError('Unable to send this voice message. Please try again.');
    }
  };

  const cancelRecording = () => {
    if (!recording) return;
    stopRecording().catch(() => undefined);
    setDiscarded(count => count + 1);
  };

  const lockRecording = () => setRecording(current => (current && !current.locked ? { ...current, locked: true } : current));

  const toggleRecordPause = async () => {
    if (!recording) return;
    try {
      if (recording.paused) await recorder.resumeRecorder();
      else await recorder.pauseRecorder();
      setRecording(current => (current ? { ...current, paused: !current.paused } : current));
    } catch {
      setAttachError('Unable to record. Allow microphone access in Settings and try again.');
    }
  };

  // One clip plays at a time; audio state, not a timer, drives progress.
  const startClip = async (id: string, uri: string, from_ms = 0) => {
    await player.stopPlayer().catch(() => undefined);
    player.removePlayBackListener();
    player.addPlayBackListener(meta => mounted.current && setPlaying(current => (current && current.id === id ? { ...current, position_ms: meta.currentPosition, duration_ms: meta.duration } : current)));
    player.addPlaybackEndListener(() => mounted.current && setPlaying(null));
    setPlaying({ id, position_ms: from_ms, duration_ms: 0, paused: false });
    await player.startPlayer(uri);
    await player.setPlaybackSpeed(speed);
    if (from_ms) await player.seekToPlayer(from_ms);
  };

  const togglePlay = async (id: string, uri: string) => {
    try {
      if (playing?.id === id) {
        if (playing.paused) await player.resumePlayer();
        else await player.pausePlayer();
        setPlaying({ ...playing, paused: !playing.paused });
        return;
      }
      await startClip(id, uri);
    } catch {
      setPlaying(null);
      setAttachError('Unable to play this voice message. Please try again.');
    }
  };

  // Tapping or dragging the waveform jumps there; an idle clip starts playing from that point.
  const seekVoice = async (id: string, uri: string, position_ms: number) => {
    try {
      if (playing?.id !== id) return await startClip(id, uri, position_ms);
      setPlaying({ ...playing, position_ms });
      await player.seekToPlayer(position_ms);
    } catch {
      setAttachError('Unable to play this voice message. Please try again.');
    }
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (playing) player.setPlaybackSpeed(next).catch(() => undefined);
  };

  const openAttach = () => {
    setAttachError('');
    setAttachOpen(true);
  };
  const closeAttach = () => setAttachOpen(false);

  // Native pickers; a cancelled or rejected pick keeps the previous valid selection.
  const launchImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    const asset = result.assets?.[0];
    if (!asset?.uri) return;
    if (!asset.type || !IMAGE_TYPES.includes(asset.type)) return setAttachError('Choose a PNG, JPG or WebP image.');
    if (!asset.fileSize) return setAttachError('This file is empty. Choose another file.');
    if (asset.fileSize > 10 * MB) return setAttachError('Choose an image of 10 MB or smaller.');
    setAttachError('');
    setAttachment({ uri: asset.uri, name: asset.fileName ?? 'Image', file_kind: 'image' });
  };

  const launchPdf = async () => {
    try {
      const [file] = await pick({ type: [types.pdf] });
      if (!file?.uri) return;
      if (file.type && file.type !== 'application/pdf') return setAttachError('Choose a PDF document.');
      if (!file.size) return setAttachError('This file is empty. Choose another file.');
      if (file.size > 20 * MB) return setAttachError('Choose a PDF of 20 MB or smaller.');
      setAttachError('');
      setAttachment({ uri: file.uri, name: file.name ?? 'Document.pdf', file_kind: 'pdf' });
    } catch {
      // Cancelling the picker keeps the current selection.
    }
  };

  // iOS can't present a picker while the sheet's modal is still dismissing, so it opens on dismiss.
  const pending_pick = useRef<(() => Promise<void>) | null>(null);
  const choose = (launch: () => Promise<void>) => {
    setAttachOpen(false);
    if (Platform.OS === 'ios') pending_pick.current = launch;
    else launch();
  };
  const pickImage = () => choose(launchImage);
  const pickPdf = () => choose(launchPdf);
  const onAttachDismiss = () => {
    const launch = pending_pick.current;
    pending_pick.current = null;
    launch?.();
  };

  const removeAttachment = () => setAttachment(null);
  const openPreview = (uri: string) => setPreviewUri(uri);
  const closePreview = () => setPreviewUri(null);

  return {
    messages,
    draft,
    show_draft,
    draft_status,
    missing,
    added,
    text,
    thinking,
    saving,
    can_send,
    can_add,
    attachment,
    attach_open,
    attach_error,
    recording,
    playing,
    changeText,
    send,
    retry,
    add,
    viewAdded,
    discarded,
    speed,
    startRecording,
    finishRecording,
    cancelRecording,
    lockRecording,
    toggleRecordPause,
    togglePlay,
    seekVoice,
    cycleSpeed,
    openAttach,
    closeAttach,
    pickImage,
    pickPdf,
    onAttachDismiss,
    removeAttachment,
    preview_uri,
    openPreview,
    closePreview,
  };
}

export type AiChatController = ReturnType<typeof useAiChat>;
