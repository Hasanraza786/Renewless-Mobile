import { ScrollView } from 'react-native';
import { mail_icon } from '../../assets/icons';
import Container from '../../components/Container';
import Header from '../../components/Header';
import MenuGroup from '../../components/MenuGroup';
import { goBack } from '../../navigation/service';
import MessageRow from './components/MessageRow';
import Question from './components/Question';
import { SUPPORT_QUESTIONS } from './faqs';
import useHelpSupport from './index.function';
import { styles } from './styles';

// Contact us, the user's messages (only once they have sent one) and the website's questions.
export default function HelpSupportScreen() {
  const help = useHelpSupport();

  return (
    <Container readable style={styles.main_view}>
      <Header title="Help & support" onBack={goBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <MenuGroup title="Contact us" style={styles.first} items={[{ label: 'Send us a message', icon: mail_icon, subtitle: 'We’ll reply here in the app.', onPress: help.openContact }]} />
        {help.recent.length ? (
          <MenuGroup title="Your messages" action={help.has_more ? { label: 'View all', onPress: help.openAll } : undefined}>
            {help.recent.map((message, index) => (
              <MessageRow key={message.id} message={message} divider={index < help.recent.length - 1} onPress={help.openMessage} />
            ))}
          </MenuGroup>
        ) : null}
        {SUPPORT_QUESTIONS.map(section => (
          <MenuGroup key={section.title} title={section.title}>
            {section.items.map((item, index) => (
              <Question
                key={item.question}
                question={item.question}
                answer={item.answer}
                open={help.open_questions.includes(item.question)}
                divider={index < section.items.length - 1}
                onToggle={help.toggleQuestion}
              />
            ))}
          </MenuGroup>
        ))}
      </ScrollView>
    </Container>
  );
}
