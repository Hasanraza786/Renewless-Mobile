import { FlatList, Image, KeyboardAvoidingView, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { close_icon, logo_mark } from '../../assets/icons';
import Icons from '../../components/Icons';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import Composer, { AttachSheet } from './components/Composer';
import ConsentDialog from './components/ConsentDialog';
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
      <KeyboardAvoidingView style={common_styles.flex_1} behavior="padding" keyboardVerticalOffset={insets.top}>
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
      <ConsentDialog chat={chat} />
      <Modal visible={!!chat.preview_uri} animationType="fade" onRequestClose={chat.closePreview}>
        <View style={styles.preview}>
          {chat.preview_uri ? <Image source={{ uri: chat.preview_uri }} resizeMode="contain" style={styles.preview_image} accessibilityLabel="Sent image" /> : null}
          <Pressable accessibilityRole="button" accessibilityLabel="Close preview" hitSlop={SIZES.padding3} onPress={chat.closePreview} style={styles.preview_close}>
            <Icons name={close_icon} />
          </Pressable>
        </View>
      </Modal>
    </Container>
  );
}
