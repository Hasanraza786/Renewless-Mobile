import { Pressable, View } from 'react-native';
import { arrow_right_icon, close_icon } from '../../../assets/icons';
import LinkText from '../../../components/LinkText';
import CustomText from '../../../components/CustomText';
import Icons from '../../../components/Icons';
import Mascot from '../../../components/Mascot';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { RiderBar, useTrickle } from '../../Onboarding/components/Discovering';
import { deepLine } from '../../../utils/scan-progress';
import type { HomeController } from '../index.function';
import { styles } from '../styles';

// Home · still checking / Home · more found (Needs-attention states, locked 23 Nov 2026): the rest of a first scan's year
// is read in the background, then Home offers what it found. Nothing found later is ever added on its own.
export default function ScanCard({ home }: { home: HomeController }) {
  const scan = home.background_scan;
  const checking = scan?.status === 'running';
  const deep = home.background_deep;
  // Between reads the bar, Loop and numbers trickle on, so the card never looks stuck.
  const trickle = useTrickle(deep?.percent ?? 0, home.reduce_motion);
  const live_line = deepLine(Math.max(deep?.checked ?? 0, Math.round(((deep?.total ?? 0) * trickle.percent) / 100)), deep?.total ?? 0, deep?.found ?? 0);

  if (!scan) return null;
  const copy = checking
    ? `Loop is reading the rest of your year in ${home.scan_inbox}. We’ll let you know what we find.`
    : `Loop found ${scan.new_count} more ${scan.new_count === 1 ? 'subscription' : 'subscriptions'} in ${home.scan_inbox}.`;

  return (
    <RowView gap={SIZES.padding * 0.6} style={styles.scan_card} accessibilityLiveRegion="polite">
      <Mascot expression={checking ? 'neutral' : 'happy'} size={SIZES.padding * 2.8} label="Loop" draw={!home.reduce_motion} />
      <View style={[common_styles.flex_1, styles.scan_copy]}>
        <CustomText text={checking ? 'STILL CHECKING' : 'MORE FOUND'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.xs} letter_spacing={0.5} />
        <CustomText mt={SIZES.padding / 8} text={copy} weight={FONTS.regular} size={SIZES.sm} />
        {checking ? (
          <>
            <CustomText mt={SIZES.padding / 4} text={`Checking · ${trickle.percent}%`} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.sm} />
            <RiderBar value={trickle.value} percent={trickle.percent} label="Checking the rest of your year" running reduce_motion={home.reduce_motion} />
            {/* Always one line, its space kept from the start, so the card's height never changes while numbers move. */}
            <CustomText mt={SIZES.padding / 5} text={live_line || ' '} weight={FONTS.regular} color={COLORS.text_dim} size={SIZES.xs} number_of_lines={1} fit_width />
          </>
        ) : (
          <Pressable accessibilityRole="button" accessibilityLabel={`Review ${scan.new_count} more subscriptions`} hitSlop={SIZES.padding / 2} onPress={home.reviewMoreFound} style={styles.scan_review}>
            <LinkText text="Review" color={COLORS.primary} icon={arrow_right_icon} />
          </Pressable>
        )}
      </View>
      {checking ? null : (
        <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={home.dismissMoreFound} style={styles.scan_dismiss}>
          <Icons name={close_icon} />
        </Pressable>
      )}
    </RowView>
  );
}
