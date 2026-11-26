import { Fragment } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { back_icon, logo_mark } from '../../assets/icons';
import ChooseInboxSheet from '../../components/ChooseInboxSheet';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import RowView from '../../components/RowView';
import SizedBox from '../../components/SizedBox';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { styles as onboarding_styles } from '../Onboarding/styles';
import GmailSheets from './components/GmailSheets';
import { GmailRecoveryArt, RecoveryFooter, RecoveryView, ReviewFooter, ReviewView, ScanningArt, ScanningFooter, ScanningView } from './components/GmailViews';
import TabletSplit from '../Onboarding/components/TabletSplit';
import { styles } from './styles';
import useGmailScan, { type GmailScanRoute } from './index.function';

// Signed-in Gmail scan → review → save in onboarding's frame and components (locked 13 Nov 2026): the same header
// (Back, RENEWLESS, mark; no step bars), scrolling content and pinned footer. Every Gmail and Outlook entry opens this screen.
export default function GmailScanScreen({ route }: { route: GmailScanRoute }) {
  const gmail = useGmailScan(route);
  const fitted = gmail.phase === 'nothing' || gmail.phase === 'interrupted';
  // Tablets: the scan radar and the recovery art sit beside the text; the review footer keeps the 680pt readable width.
  const split = gmail.is_tablet && (fitted || gmail.phase === 'scanning');
  const panel = (
    <Fragment>
      {/* Keyed by phase so each state (e.g. the review after scanning) opens at the top. */}
      <ScrollView key={gmail.phase} showsVerticalScrollIndicator={false} style={split && onboarding_styles.split_scroll} contentContainerStyle={[onboarding_styles.scroll, fitted && onboarding_styles.scroll_fitted]}>
        {gmail.phase === 'scanning' ? <ScanningView gmail={gmail} /> : gmail.phase === 'review' ? <ReviewView gmail={gmail} /> : <RecoveryView gmail={gmail} />}
      </ScrollView>
      <View style={!fitted && !split && onboarding_styles.footer_divider}>
        <View style={gmail.is_tablet && !fitted && styles.footer_readable}>
          {gmail.phase === 'scanning' ? <ScanningFooter gmail={gmail} /> : gmail.phase === 'review' ? <ReviewFooter gmail={gmail} /> : <RecoveryFooter gmail={gmail} />}
        </View>
        <SizedBox />
      </View>
    </Fragment>
  );

  return (
    <Container is_auth>
      <View style={onboarding_styles.main_view}>
        <RowView justify_content="space-between">
          <Pressable accessibilityRole="button" accessibilityLabel="Back" hitSlop={SIZES.padding3 / 4} onPress={goBack} style={onboarding_styles.back}>
            <Icons name={back_icon} />
          </Pressable>
          <CustomText text="RENEWLESS" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} letter_spacing={2} />
          <Icons name={logo_mark} />
        </RowView>

        <SizedBox />

        {gmail.phase === 'loading' ? (
          <StateView status="loading" message="Getting your inbox ready." />
        ) : (
          split ? (
            <TabletSplit art={gmail.phase === 'scanning' ? <ScanningArt gmail={gmail} /> : <GmailRecoveryArt gmail={gmail} />}>{panel}</TabletSplit>
          ) : (
            panel
          )
        )}
      </View>
      <GmailSheets gmail={gmail} />
      <ChooseInboxSheet visible={gmail.choose_open} onClose={gmail.closeChoose} onPick={gmail.pickProvider} />
    </Container>
  );
}
