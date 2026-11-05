import { ScrollView, View } from 'react-native';
import { check_dark_icon, filter_icon } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import DialogCard from '../../components/DialogCard';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InputField from '../../components/InputField';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { common_styles } from '../../utils/common_styles';
import { HISTORY_FILTERS, historyCardProps } from '../../utils/history';
import useHistory, { type HistoryController } from './index.function';
import { styles } from './styles';

function Empty({ history, filtered }: { history: HistoryController; filtered: boolean }) {
  return (
    <View style={styles.empty}>
      <View style={styles.mascot_ring} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Mascot expression={filtered ? 'sad' : 'neutral'} size={SIZES.padding * 5.65} label="Loop" />
      </View>
      <CustomText mt={SIZES.padding} text={filtered ? 'No matches found' : 'Nothing here yet'} size={SIZES.lg} align="center" accessibility_role="header" />
      <CustomText mt={SIZES.padding / 2} text={filtered ? 'Try another name or clear your filters.' : 'Your cancelled and expired subscriptions will appear here.'} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" style={styles.empty_copy} />
      <RowView accessibilityRole="button" onPress={filtered ? history.clearAll : history.openList} style={styles.empty_action}>
        <CustomText text={`${filtered ? 'Clear search & filters' : 'View subscriptions'} ›`} weight={FONTS.regular} size={SIZES.sm} />
      </RowView>
    </View>
  );
}

// Same centered dialog as List: selections apply immediately; Done or outside only closes.
function FilterDialog({ history }: { history: HistoryController }) {
  return (
    <DialogCard
      title="Filter by status"
      subtitle="Choose one or more"
      close_label="Close history filters"
      onClose={history.closeFilters}
      footer={
        <RowView justify_content="space-between">
          <CustomText text={`${history.matching.length} matching subscription${history.matching.length === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} style={common_styles.flex_1} />
          <RowView accessibilityRole="button" onPress={history.closeFilters} style={styles.done}>
            <CustomText text="Done" color={COLORS.background} size={SIZES.sm} />
          </RowView>
        </RowView>
      }>
      {HISTORY_FILTERS.map((filter, index) => {
        const checked = filter.key === 'all' ? !history.statuses.length : history.statuses.includes(filter.key);
        return (
          <RowView
            key={filter.key}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={`${filter.label}, ${history.counts[filter.key]}`}
            gap={SIZES.padding2}
            onPress={() => history.toggleStatus(filter.key)}
            style={[styles.option, index < HISTORY_FILTERS.length - 1 && styles.option_divider]}>
            <View style={[styles.box, checked && styles.box_checked]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>
            <CustomText text={filter.label} weight={FONTS.regular} color={filter.color} size={SIZES.sm} style={common_styles.flex_1} />
            <CustomText text={String(history.counts[filter.key])} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </RowView>
        );
      })}
    </DialogCard>
  );
}

// Cancelled and expired subscriptions; last tracked prices are never payments.
export default function HistoryScreen() {
  const history = useHistory();

  return (
    <Container is_auth style={styles.main_view}>
      <Header title="History" onBack={goBack} />
      {history.status !== 'ready' ? (
        <StateView status={history.status === 'failed' ? 'failed' : 'loading'} message={history.status === 'failed' ? history.error : 'Loading history.'} onRetry={history.retry} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <CustomText text="Your cancelled and expired subscriptions." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          <View style={styles.search}>
            <InputField variant="sheet" label="Search" value={history.query} onChangeText={history.setQuery} placeholder="Search history" returnKeyType="search" />
          </View>
          <RowView justify_content="flex-end" style={styles.tools}>
            <RowView
              accessibilityRole="button"
              accessibilityLabel={`Status filters${history.statuses.length ? `, ${history.statuses.length} selected` : ''}`}
              gap={SIZES.padding * 0.35}
              onPress={history.openFilters}
              style={styles.filter}>
              <Icons name={filter_icon} />
              <CustomText text="Status filters" weight={FONTS.regular} size={SIZES.sm} />
              {history.statuses.length ? (
                <View style={styles.badge}>
                  <CustomText text={String(history.statuses.length)} color={COLORS.background} size={SIZES.xs} line_height={null} />
                </View>
              ) : null}
            </RowView>
          </RowView>
          <RowView justify_content="space-between" style={styles.count}>
            <CustomText text={`${history.matching.length} subscription${history.matching.length === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText text="Most recent first" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </RowView>
          {history.matching.length ? (
            <>
              <View style={styles.rows}>
                {history.matching.map((record, index) => (
                  <View key={record.id} style={index < history.matching.length - 1 && styles.divider}>
                    <SubscriptionCard {...historyCardProps(record)} onPress={() => history.openDetail(record.id)} />
                  </View>
                ))}
              </View>
              <CustomText mt={SIZES.padding * 0.8} text="Last tracked prices, not confirmed payments." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </>
          ) : (
            <Empty history={history} filtered={history.has_history} />
          )}
        </ScrollView>
      )}
      {history.filters_open ? <FilterDialog history={history} /> : null}
    </Container>
  );
}
