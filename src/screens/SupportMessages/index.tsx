import { ScrollView, View } from 'react-native';
import Container from '../../components/Container';
import Header from '../../components/Header';
import { goBack, navigate } from '../../navigation/service';
import { useAppSelector } from '../../redux/store';
import MessageRow from '../HelpSupport/components/MessageRow';
import { styles } from './styles';

const openMessage = (id: string) => navigate('SupportMessage', { id });

// Every message the user has sent, newest first; Help & support loaded them.
export default function SupportMessagesScreen() {
  const messages = useAppSelector(state => state.support.messages) ?? [];

  return (
    <Container readable style={styles.main_view}>
      <Header title="Your messages" onBack={goBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.group}>
          {messages.map((message, index) => (
            <MessageRow key={message.id} message={message} divider={index < messages.length - 1} onPress={openMessage} />
          ))}
        </View>
      </ScrollView>
    </Container>
  );
}
