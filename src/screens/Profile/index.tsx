import {
  Pressable,
  View,
} from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { logout } from '../../redux/actions/auth-action';
import { selectUser } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, Gender, TabParamList } from '../../types';
import { formatDate } from '../../utils/dates';
import { fullPhone } from '../../utils/phone';
import { styles } from './styles';

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
    <Container>
      <View style={styles.main_view}>
      <CustomText text="Profile" size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} mb={SIZES.padding3 * 2} />
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
        <CustomText text="Edit profile" color={COLORS.primary} size={SIZES.button}
        line_height={SIZES.button_line} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('ChangePassword')} style={styles.action}>
        <CustomText text="Change password" color={COLORS.primary} size={SIZES.button}
        line_height={SIZES.button_line} />
      </Pressable>
      <Pressable onPress={onLogout} style={styles.action}>
        <CustomText text="Log out" size={SIZES.button}
        line_height={SIZES.button_line} />
      </Pressable>
      </View>
    </Container>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <CustomText text={label} color={COLORS.text_secondary} weight={FONTS.regular} size={SIZES.supporting} line_height={SIZES.supporting_line} />
      <CustomText text={value} weight={FONTS.regular} size={SIZES.body} line_height={SIZES.body_line} mt={SIZES.padding3 / 2} />
    </View>
  );
}
