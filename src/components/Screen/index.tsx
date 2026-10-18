import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import Container from '../Container';

type Props = {
  children: ReactNode;
  isAuth?: boolean;
  edges?: readonly Edge[];
};

export default function Screen({ children, isAuth = false, edges }: Props) {
  return (
    <Container isAuth={isAuth} edges={edges} style={styles.screen}>
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
