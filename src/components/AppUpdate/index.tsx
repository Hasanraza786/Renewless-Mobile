import { View } from 'react-native';
import { benefit_check_icon } from '../../assets/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { common_styles } from '../../utils/common_styles';
import ConfirmDialog from '../ConfirmDialog';
import CustomButton from '../CustomButton';
import CustomText from '../CustomText';
import Icons from '../Icons';
import Mascot from '../Mascot';
import RowView from '../RowView';
import useAppUpdate from './index.function';
import { styles } from './styles';

// App update prompt (locked 17 November 2026) over every screen: optional (Not now) or required (cannot be closed).
export default function AppUpdate() {
  const { update, installed_version, dismiss, openStore } = useAppUpdate();
  if (!update) return null;
  const { required, latest_version, notes } = update;
  return (
    <ConfirmDialog
      title={required ? 'Update Renewless to continue' : 'A new version is ready'}
      close_label="Not now"
      onClose={dismiss}
      locked={required}
      art={<Mascot expression={required ? 'neutral' : 'happy'} size={SIZES.padding * 3.6} label="Loop" />}>
      <CustomText
        mt={SIZES.padding * 0.4}
        mb={SIZES.padding * 0.8}
        text={required ? `This version is no longer supported. Update to version ${latest_version} to keep using Renewless.` : `Version ${latest_version} is ready. You have version ${installed_version}.`}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        align="center"
      />
      {notes.length ? (
        <View style={styles.notes}>
          <CustomText text="What’s new" weight={FONTS.medium} color={COLORS.text_secondary} size={SIZES.sm} />
          {notes.map(note => (
            <RowView key={note} align_items="flex-start" gap={SIZES.padding * 0.4}>
              <Icons name={benefit_check_icon} />
              <CustomText text={note} weight={FONTS.regular} color={COLORS.sage_text} size={SIZES.sm} style={common_styles.flex_1} />
            </RowView>
          ))}
        </View>
      ) : null}
      <RowView gap={SIZES.padding * 0.45}>
        {required ? null : <CustomButton variant="secondary" text="Not now" onPress={dismiss} style={common_styles.flex_1} />}
        <CustomButton variant="primary" text="Update now" onPress={openStore} style={common_styles.flex_1} />
      </RowView>
    </ConfirmDialog>
  );
}
