import { ScrollView, View } from 'react-native';
import { delete_tile_icon, privacy_icon, refresh_icon, security_icon, switch_off_icon, switch_on_icon, terms_icon, widget_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import MenuGroup from '../../components/MenuGroup';
import RowView from '../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import ProfileDialogs from '../Profile/components/ProfileDialogs';
import { PROVIDER_LABEL } from '../Profile/index.function';
import useSettings from './index.function';
import { styles } from './styles';

export default function SettingsScreen() {
  const settings = useSettings();
  const { profile } = settings;
  const user = profile.user;

  return (
    <Container style={styles.main_view}>
      <Header title="Settings" onBack={goBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <MenuGroup title="Notifications" style={styles.first} items={[{ label: 'Reminder settings', icon: refresh_icon, subtitle: 'When and how you’re reminded', onPress: profile.openReminders }]} />

        <MenuGroup title="AI assistant">
          <RowView
            justify_content="space-between"
            gap={SIZES.padding2}
            accessibilityRole="switch"
            accessibilityLabel="Use Google Gemini"
            accessibilityState={{ checked: settings.ai_consent }}
            onPress={settings.toggleAi}
            style={styles.toggle}>
            <View style={common_styles.flex_1}>
              <CustomText text="Use Google Gemini" size={SIZES.sm} />
              <CustomText mt={SIZES.padding / 4} text="AI chat sends your messages, voice notes, images and PDFs to Google Gemini to suggest subscription details." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </View>
            <Icons name={settings.ai_consent ? switch_on_icon : switch_off_icon} />
          </RowView>
        </MenuGroup>
        <CustomText
          mt={SIZES.padding3}
          style={styles.note}
          weight={FONTS.regular}
          color={COLORS.text_secondary}
          size={SIZES.sm}
          text={
            <>
              {`${settings.ai_note} `}
              <CustomText text="How we use your data ›" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} accessibility_role="link" onPress={profile.openPrivacy} />
            </>
          }
        />

        <MenuGroup title="Home Screen widget" items={[{ label: 'Add the widget', icon: widget_icon, subtitle: 'See your next renewal without opening the app', onPress: settings.openWidget }]} />
        <MenuGroup
          title="Account"
          items={[
            user?.hasPassword === false
              ? { label: 'Sign-in method', icon: security_icon, subtitle: `${PROVIDER_LABEL[user.provider]} account`, onPress: profile.showProvider }
              : { label: 'Change password', icon: security_icon, onPress: profile.openChangePassword },
            { label: 'Delete account', icon: delete_tile_icon, tone: 'danger', onPress: settings.openDelete },
          ]}
        />
        <MenuGroup
          title="Legal"
          items={[
            { label: 'Privacy Policy', icon: privacy_icon, onPress: profile.openPrivacy },
            { label: 'Terms of Service', icon: terms_icon, onPress: profile.openTerms },
          ]}
        />
      </ScrollView>
      <ProfileDialogs profile={profile} />
    </Container>
  );
}
