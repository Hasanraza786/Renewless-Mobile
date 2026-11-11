import { Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { filter_icon, sort_icon } from '../../assets/icons';
import AddSheet from '../../components/AddSheet';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Icons from '../../components/Icons';
import InputField from '../../components/InputField';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import SubscriptionCard from '../../components/SubscriptionCard';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { recordCardProps } from '../../utils/events';
import { dateLabel } from '../../utils/scan';
import ListDialogs from './components/ListDialogs';
import useList, { type ListController, type ListRoute } from './index.function';
import { styles } from './styles';
import SizedBox from '../../components/SizedBox';

// Account empty and zero-match states share the sad Loop and one compact Add manually action.
function Empty({ list, account }: { list: ListController; account: boolean }) {
  return (
    <View style={styles.empty}>
      <View style={styles.mascot_ring} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Mascot expression="sad" size={SIZES.padding * 6.5} label="Loop" />
      </View>
      <CustomText mt={SIZES.padding * 0.9} text={account ? 'No subscriptions yet' : 'No subscriptions found'} size={SIZES.lg} align="center" />
      <CustomText
        mt={SIZES.padding2}
        text={account ? 'Add your first subscription to keep track of your renewals.' : 'Try another service name or choose a different filter.'}
        weight={FONTS.regular}
        color={COLORS.text_secondary}
        size={SIZES.sm}
        align="center"
        style={styles.empty_copy}
      />
      <RowView accessibilityRole="button" accessibilityLabel="Add subscription manually" gap={SIZES.padding3} onPress={list.openAddManual} style={styles.add_manual}>
        <CustomText text="+" weight={FONTS.regular} color={COLORS.primary} size={SIZES.h3} line_height={null} />
        <CustomText text="Add manually" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
      </RowView>
    </View>
  );
}

export default function ListScreen({ route }: { route: ListRoute }) {
  const list = useList(route);

  return (
    <Container tab_bar style={styles.main_view}>
      <Header title="Subscriptions" onAdd={list.openAdd} />
      {list.status !== 'ready' ? (
        <StateView status={list.status === 'failed' ? 'failed' : 'loading'} message={list.status === 'failed' ? list.error : 'Loop is finding your subscriptions…'} onRetry={list.retry} />
      ) : !list.has_records ? (
        <Empty list={list} account />
      ) : (
        // scrollableAxes: the floating tab bar inset at the bottom, no second top inset under the fixed header.
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentInsetAdjustmentBehavior="scrollableAxes" contentContainerStyle={styles.content}>
          <InputField
            variant="sheet"
            label="Search"
            value={list.query}
            onChangeText={list.setQuery}
            placeholder="Search subscriptions"
            returnKeyType="search"
          />

          <SizedBox height={SIZES.padding2} />

          <RowView justify_content="space-between">
            <RowView accessibilityRole="button" accessibilityLabel={`Sort by, ${list.sort_label}`} gap={SIZES.padding * 0.35} onPress={() => list.setDialog('sort')} style={styles.tool}>
              <Icons name={sort_icon} />
              <View>
                <CustomText text="Sort by" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                <CustomText text={list.sort_label} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
              </View>
            </RowView>
            <RowView
              accessibilityRole="button"
              accessibilityLabel={`Status filters${list.groups.length ? `, ${list.groups.length} selected` : ''}`}
              gap={SIZES.padding * 0.35}
              onPress={() => list.setDialog('filters')}
              style={styles.tool}>
              <Icons name={filter_icon} />
              <CustomText text="Status filters" weight={FONTS.regular} size={SIZES.sm} />
              {list.groups.length ? (
                <View style={styles.badge}>
                  <CustomText text={String(list.groups.length)} color={COLORS.background} size={SIZES.xs} line_height={null} />
                </View>
              ) : null}
            </RowView>
          </RowView>
          <RowView justify_content="space-between" style={styles.count}>
            <CustomText text={`${list.matching_count} ${list.query.trim() ? 'result' : 'subscription'}${list.matching_count === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            <CustomText text={dateLabel(list.today)} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </RowView>
          {list.matching_count ? (
            list.sections.map(section => (
              <Fragment key={section.title ?? 'all'}>
                {section.title ? <CustomText mt={SIZES.padding2} mb={SIZES.padding3} text={section.title} size={SIZES.lg} accessibility_role="header" /> : null}
                <View style={styles.rows}>
                  {section.records.map((record, index) => (
                    <View key={record.id} style={index < section.records.length - 1 && styles.divider}>
                      <SubscriptionCard {...recordCardProps(record, list.today)} onPress={() => list.open(record)} />
                    </View>
                  ))}
                </View>
              </Fragment>
            ))
          ) : (
            <Empty list={list} account={false} />
          )}
        </ScrollView>
      )}
      <ListDialogs list={list} />
      <AddSheet visible={list.add_open} onClose={list.closeAdd} />
    </Container>
  );
}
