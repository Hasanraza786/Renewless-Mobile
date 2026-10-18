import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../components/Screen';
import { colors } from '../../constants/colors';
import { logout } from '../../redux/actions/auth';
import { selectUser } from '../../redux/slices/profileSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, Gender, TabParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { fullPhone } from '../../utils/phone';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  NativeStackScreenProps<AppStackParamList>
>;

function genderLabel(gender: Gender) {
  if (gender === 'male') return 'Male';
  if (gender === 'female') return 'Female';
  return 'Other';
}

export default function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  function onLogout() {
    dispatch(logout());
  }

  return (
    <Screen>
      <Text style={styles.title}>Profile</Text>
      {user ? (
        <View style={styles.card}>
          <Row label="Name" value={user.name} />
          <Row label="Email" value={user.email} />
          <Row label="Phone" value={fullPhone(user)} />
          {user.dateOfBirth ? (
            <Row label="Date of birth" value={formatDate(user.dateOfBirth)} />
          ) : null}
          {user.gender ? <Row label="Gender" value={genderLabel(user.gender)} /> : null}
        </View>
      ) : null}
      <Pressable onPress={() => navigation.navigate('EditProfile')} style={styles.action}>
        <Text style={styles.actionText}>Edit profile</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ChangePassword')} style={styles.action}>
        <Text style={styles.actionText}>Change password</Text>
      </Pressable>
      <Pressable onPress={onLogout} style={styles.action}>
        <Text style={styles.logout}>Log out</Text>
      </Pressable>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.navy,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
    padding: 16,
  },
  row: {
    marginBottom: 14,
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
  value: {
    color: colors.navy,
    fontSize: 16,
    marginTop: 4,
  },
  action: {
    marginTop: 16,
  },
  actionText: {
    color: colors.mint,
    fontSize: 16,
    fontWeight: '700',
  },
  logout: {
    color: colors.navy,
    fontSize: 16,
    fontWeight: '700',
  },
});
