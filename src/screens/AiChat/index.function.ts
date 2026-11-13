import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { pick, types } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import { launchImageLibrary } from 'react-native-image-picker';
import { createSound } from 'react-native-nitro-sound';
import { focusedTab, goBack, navigate } from '../../navigation/service';
import { PRIVACY_URL, openLegal } from '../../config/legal';
import { addAiDraft, changeAiConsent, sendAiMessage, startAiChat } from '../../redux/actions/ai-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AiInput, AiReply, AiUsage, ChatDraft } from '../../types';
import { missingQuestion } from '../../utils/ai-draft';
import { tapHaptic } from '../../utils/haptics';
import { afterModalClose } from '../../utils/modal';
import { trackEvent } from '../../utils/analytics';

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

// "1 Dec" from the local YYYY-MM-DD reset date.
const usageDate = (iso: string) => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

// Loop: one free chat for text, voice and one image/PDF. Nothing is saved until Add subscription.
export default function useAiChat() {
  const dispatch = useAppDispatch();
  // Nothing is sent to Google Gemini until the user agrees (App Store 5.1.2(i)); Settings can withdraw it.
  const ai_consent = useAppSelector(state => state.constant.ai_consent);
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: messageId(), role: 'loop', input: null, text: OPENING, failed: false }]);
  const [conversation_id, setConversationId] = useState('');
  const [draft, setDraft] = useState<ChatDraft | null>(null);
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
  const [usage, setUsage] = useState<AiUsage | null>(null);
  // Add found a service the user already tracks: the saved record's ID (null when the server sent none).
  const [duplicate, setDuplicate] = useState<{ existing_id: string | null } | null>(null);
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

  // A conversation per visit; its usage (free messages left, shown under the header) is refreshed from every reply.
  // It starts only after consent, so nothing reaches the AI service before the user agrees.
  useEffect(() => {
    if (!ai_consent) return;
    dispatch(
      startAiChat((id, value) => {
        if (!mounted.current) return;
        setConversationId(id);
        setUsage(value);
      }),
    );
  }, [ai_consent, dispatch]);

  const has_failed = messages.some(message => message.failed);
  const busy = thinking || saving;
  // No free messages left: new text, voice and files are blocked; Retry, the draft and Add keep working.
  const limit_reached = usage?.remaining === 0;
  const resets_label = usage ? usageDate(usage.resetsOn) : '';
  const usage_state = !usage ? null : limit_reached ? 'out' : usage.remaining <= 10 ? 'low' : 'ok';
  const can_send = !!conversation_id && !busy && !has_failed && !limit_reached && (text.trim().length > 0 || !!attachment);
  // The server decides when every required field is known; the question names the first gap it can see.
  const missing = draft && !draft.ready ? missingQuestion(draft) : null;
  const draft_status = added_id ? 'Added to your subscriptions' : saving ? 'Adding…' : thinking ? 'Updating details…' : !draft?.ready ? 'A few details to finish' : 'Ready to add';
  const can_add = !!draft?.ready && !busy && !has_failed && !added_id;
  const show_draft = !!draft?.name;
  const added = !!added_id;

  const markFailed = (id: string) => setMessages(current => current.map(item => (item.id === id ? { ...item, failed: true } : item)));

  const run = (message: ChatMessage) => {
    if (!message.input || !conversation_id) return;
    setThinking(true);
    const onReply = (result: AiReply) => {
      if (!mounted.current) return;
      setThinking(false);
      setUsage(result.usage);
      setMessages(current => [...current.map(item => (item.id === message.id ? { ...item, failed: false } : item)), { id: messageId(), role: 'loop', input: null, text: result.reply, failed: false }]);
      if (result.draft) {
        // A new service after an added one starts a separate draft.
        if (added_id && result.draft.id !== draft?.id) setAddedId(null);
        setDraft(result.draft);
      }
    };
    // At the monthly limit the composer closes; the failed message keeps its Retry.
    const onFailed = (code: string) => {
      if (!mounted.current) return;
      setThinking(false);
      markFailed(message.id);
      if (code === 'AI_MONTHLY_LIMIT') setUsage(current => current && { ...current, used: current.limit, remaining: 0 });
    };
    dispatch(sendAiMessage(conversation_id, message.id, message.input, onReply, onFailed));
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

  const onAdded = (id: string) => {
    if (!mounted.current) return;
    setAddedId(id);
    navigate('SubscriptionDetail', { id });
  };

  const onAddDone = () => mounted.current && setSaving(false);
  const onDuplicate = (existing_id: string | null) => mounted.current && setDuplicate({ existing_id });
  const add = () => {
    if (!draft || !can_add) return;
    setSaving(true);
    dispatch(addAiDraft(draft, onAdded, onAddDone, onDuplicate));
  };
  const closeDuplicate = () => setDuplicate(null);
  const viewExisting = () => {
    const id = duplicate?.existing_id;
    setDuplicate(null);
    if (id) navigate('SubscriptionDetail', { id });
  };
  const addSeparate = () => {
    if (!draft) return;
    setDuplicate(null);
    setSaving(true);
    dispatch(addAiDraft(draft, onAdded, onAddDone, onDuplicate, true));
  };

  const viewAdded = () => added_id && navigate('SubscriptionDetail', { id: added_id });

  // Voice (WhatsApp-style): hold to record, release to send, slide left to discard, slide up to lock
  // hands-free with Delete / Pause / Send. Gesture callbacks can run before React re-renders, so the
  // active recording lives in a ref; every stop waits for the start.
  const record_start = useRef<{ at: number; started: boolean; elapsed_ms: number; ready: Promise<boolean> } | null>(null);
  const startRecording = () => {
    if (busy || has_failed || limit_reached || record_start.current) return;
    recorder.setSubscriptionDuration(0.1);
    recorder.addRecordBackListener(meta => {
      if (!mounted.current) return;
      const level = meterLevel(meta.currentMetering);
      setRecording(current => {
        if (!current || current.paused) return current;
        if (record_start.current) record_start.current.elapsed_ms = meta.currentPosition;
        return { ...current, elapsed_ms: meta.currentPosition, levels: [...current.levels, level].slice(-LIVE_BARS) };
      });
    });
    tapHaptic();
    setRecording({ elapsed_ms: 0, locked: false, paused: false, levels: [] });
    const start = { at: Date.now(), started: false, elapsed_ms: 0, ready: Promise.resolve(false) };
    start.ready = recorder.startRecorder(undefined, undefined, true).then(
      () => {
        start.started = true;
        return true;
      },
      () => {
        if (record_start.current === start) record_start.current = null;
        setRecording(null);
        setAttachError('Unable to record. Allow microphone access in Settings and try again.');
        return false;
      },
    );
    record_start.current = start;
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
    const start = record_start.current;
    if (!start) return;
    // Released before the recorder started (e.g. the microphone prompt took the gesture): discard, a fresh hold records.
    if (!start.started) {
      stopRecording().catch(() => undefined);
      return;
    }
    try {
      const clip = await stopRecording();
      const duration_ms = start.elapsed_ms || (clip ? Date.now() - clip.at : 0);
      if (!clip || duration_ms < 500) return;
      tapHaptic();
      submit({ kind: 'voice', uri: clip.uri, duration_ms }, '');
    } catch {
      setAttachError('Unable to send this voice message. Please try again.');
    }
  };

  const cancelRecording = () => {
    if (!record_start.current) return;
    tapHaptic();
    stopRecording().catch(() => undefined);
    setDiscarded(count => count + 1);
  };

  const lockRecording = () => {
    if (!record_start.current || recording?.locked) return;
    tapHaptic();
    setRecording(current => (current && !current.locked ? { ...current, locked: true } : current));
  };

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
    if (limit_reached) return;
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
      // The server accepts PDFs up to 14 MB.
      if (file.size > 14 * MB) return setAttachError('Choose a PDF of 14 MB or smaller.');
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
  // Read-only: iOS Quick Look without Markup; Android opens another app with read permission only.
  const openDocument = (uri: string, name: string) =>
    viewDocument({ uri, mimeType: 'application/pdf', headerTitle: name, grantPermissions: 'read' }).catch(() => setAttachError('Unable to open this PDF. Please try again.'));

  const agreeConsent = () => {
    trackEvent('ai_consent_changed', { enabled: 'true' });
    dispatch(changeAiConsent(true));
  };
  // Not now: back to the Add sheet on the tab that opened AI chat.
  // The dialog closes first; leaving waits for its fade, so the tab's Add sheet can open on iOS.
  const [consent_declined, setConsentDeclined] = useState(false);
  const show_consent = !ai_consent && !consent_declined;
  const declineConsent = () => {
    trackEvent('ai_consent_changed', { enabled: 'false' });
    setConsentDeclined(true);
    const tab = focusedTab();
    afterModalClose(() => (tab === 'Home' || tab === 'List' || tab === 'Calendar' ? navigate(tab, { add_sheet: Date.now() }) : goBack()));
  };
  const openPrivacy = () => openLegal(PRIVACY_URL);

  return {
    ai_consent,
    show_consent,
    usage,
    usage_state,
    resets_label,
    limit_reached,
    agreeConsent,
    declineConsent,
    openPrivacy,
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
    duplicate,
    closeDuplicate,
    viewExisting,
    addSeparate,
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
    openDocument,
  };
}

export type AiChatController = ReturnType<typeof useAiChat>;
