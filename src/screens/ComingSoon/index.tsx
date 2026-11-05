import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Container from '../../components/Container';
import Header from '../../components/Header';
import StateView from '../../components/StateView';
import type { AppStackParamList, TabParamList } from '../../types';
import { styles } from './styles';
import { goBack } from '../../navigation/service';

type Props = Pick<NativeStackScreenProps<AppStackParamList, 'ComingSoon'> | BottomTabScreenProps<TabParamList>, 'route'>;

// shortcut: dev-only stand-in for screens whose sections are not built yet; never ship it.
export default function ComingSoonScreen({ route }: Props) {
  const title = route.name === 'ComingSoon' ? (route.params as { title: string }).title : route.name;
  return (
    <Container style={styles.main_view}>
      <Header title={title} onBack={route.name === 'ComingSoon' ? goBack : undefined} />
      <StateView status="empty" message={`${title} is built in its own section.`} />
    </Container>
  );
}
