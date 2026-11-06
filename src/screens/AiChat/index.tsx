import { FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { logo_mark } from '../../assets/icons';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import Composer, { AttachSheet } from './components/Composer';
import { DraftCard, MessageItem, ThinkingDots } from './components/ChatParts';
import useAiChat from './index.function';
import { styles } from './styles';

// Loop: free AI chat that turns text, a voice note, an image or a PDF into a reviewed subscription draft.
export default function AiChatScreen() {
  const chat = useAiChat();
  const insets = useSafeAreaInsets();
  const newest_first = [...chat.messages].reverse();

  return (
    <Container is_auth style={styles.main_view}>
      <View style={styles.header}>
        <Header title="Loop" subtitle="Your subscription assistant" onBack={goBack} mark={logo_mark} />
      </View>
      <KeyboardAvoidingView style={common_styles.flex_1} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={insets.top}>
        {/* KAV measures itself relative to its parent, which starts below the top safe area. */}
        {/* Inverted so the newest turn sits above the composer and the list follows new messages. */}
        <FlatList
          inverted
          data={newest_first}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageItem chat={chat} message={item} />}
          ListHeaderComponent={
            <>
              {chat.show_draft && chat.draft ? <DraftCard chat={chat} draft={chat.draft} /> : null}
              {chat.thinking ? <ThinkingDots label="Loop is thinking" /> : null}
            </>
          }
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
        <Composer chat={chat} />
      </KeyboardAvoidingView>
      <AttachSheet chat={chat} />
    </Container>
  );
}
