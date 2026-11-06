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
  const [recording, setRecording] = useState<{ elapsed_ms: number; cancelling: boolean } | null>(null);
  const [playing, setPlaying] = useState<{ id: string; position_ms: number; duration_ms: number; paused: boolean } | null>(null);
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

  // Voice: hold to record, release to send, slide left to cancel.
  // A release can arrive before the recorder has started, so stop waits for the start.
  const record_start = useRef<{ at: number; ready: Promise<boolean> } | null>(null);
  const startRecording = () => {
    if (busy || has_failed || recording) return;
    recorder.setSubscriptionDuration(0.2);
    recorder.addRecordBackListener(meta => mounted.current && setRecording(current => (current ? { ...current, elapsed_ms: meta.currentPosition } : current)));
    setRecording({ elapsed_ms: 0, cancelling: false });
    const ready = recorder.startRecorder().then(
      () => true,
      () => {
        setRecording(null);
        setAttachError('Unable to record. Allow microphone access in Settings and try again.');
        return false;
      },
    );
    record_start.current = { at: Date.now(), ready };
  };

  const setCancelling = (cancelling: boolean) => setRecording(current => (current && current.cancelling !== cancelling ? { ...current, cancelling } : current));

  const finishRecording = async () => {
    const current = recording;
    const start = record_start.current;
    if (!current || !start) return;
    record_start.current = null;
    setRecording(null);
    recorder.removeRecordBackListener();
    if (!(await start.ready)) return;
    try {
      const uri = await recorder.stopRecorder();
      const duration_ms = Date.now() - start.at;
      if (current.cancelling || duration_ms < 500) return;
      submit({ kind: 'voice', uri, duration_ms }, '');
    } catch {
      setAttachError('Unable to send this voice message. Please try again.');
    }
  };

  // One clip plays at a time; audio state, not a timer, drives progress.
  const togglePlay = async (id: string, uri: string) => {
    try {
      if (playing?.id === id) {
        if (playing.paused) await player.resumePlayer();
        else await player.pausePlayer();
        setPlaying({ ...playing, paused: !playing.paused });
        return;
      }
      await player.stopPlayer().catch(() => undefined);
      player.removePlayBackListener();
      player.addPlayBackListener(meta => mounted.current && setPlaying(current => (current && current.id === id ? { ...current, position_ms: meta.currentPosition, duration_ms: meta.duration } : current)));
      player.addPlaybackEndListener(() => mounted.current && setPlaying(null));
      setPlaying({ id, position_ms: 0, duration_ms: 0, paused: false });
      await player.startPlayer(uri);
    } catch {
      setPlaying(null);
      setAttachError('Unable to play this voice message. Please try again.');
    }
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
    startRecording,
    setCancelling,
    finishRecording,
    togglePlay,
    openAttach,
    closeAttach,
    pickImage,
    pickPdf,
    onAttachDismiss,
    removeAttachment,
  };
}

export type AiChatController = ReturnType<typeof useAiChat>;
