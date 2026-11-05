import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { check_dark_icon } from '../../../assets/icons';
import CustomText from '../../../components/CustomText';
import DialogCard from '../../../components/DialogCard';
import Icons from '../../../components/Icons';
import RowView from '../../../components/RowView';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { common_styles } from '../../../utils/common_styles';
import { LIST_GROUPS, LIST_SORTS, type ListSort } from '../../../utils/list';
import type { ListController } from '../index.function';
import { styles } from '../styles';

function Box({ checked }: { checked: boolean }) {
  return <View style={[styles.box, checked && styles.box_checked]}>{checked ? <Icons name={check_dark_icon} /> : null}</View>;
}

// Status filters apply immediately (OR); Done only closes, Clear all keeps the search.
function StatusDialog({ list }: { list: ListController }) {
  return (
    <DialogCard
      title="Filter by status"
      subtitle="Choose one or more"
      close_label="Close status filters"
      onClose={() => list.setDialog(null)}
      footer={
        <RowView justify_content="space-between">
          <View style={common_styles.flex_1}>
            <CustomText text={`${list.matching_count} matching subscription${list.matching_count === 1 ? '' : 's'}`} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            {list.groups.length ? (
              <Pressable accessibilityRole="button" hitSlop={SIZES.padding2} onPress={list.clearGroups}>
                <CustomText mt={SIZES.padding3} text="Clear all" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
              </Pressable>
            ) : null}
          </View>
          <Pressable accessibilityRole="button" onPress={() => list.setDialog(null)} style={styles.done}>
            <CustomText text="Done" color={COLORS.background} size={SIZES.sm} />
          </Pressable>
        </RowView>
      }>
      {LIST_GROUPS.map((group, index) => {
        const checked = list.groups.includes(group.key);
        return (
          <RowView
            key={group.key}
            accessibilityRole="checkbox"
            accessibilityState={{ checked }}
            accessibilityLabel={`${group.label}, ${list.counts[group.key]}`}
            gap={SIZES.padding2}
            onPress={() => list.toggleGroup(group.key)}
            style={[styles.option, index < LIST_GROUPS.length - 1 && styles.option_divider]}>
            <Box checked={checked} />
            <CustomText text={group.label} weight={FONTS.regular} color={group.color} size={SIZES.sm} style={common_styles.flex_1} />
            <CustomText text={String(list.counts[group.key])} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
          </RowView>
        );
      })}
    </DialogCard>
  );
}

// Sort by keeps a draft: Reset returns the draft to Next event, Apply commits, closing discards.
function SortDialog({ list }: { list: ListController }) {
  const [draft, setDraft] = useState<ListSort>(list.sort);
  return (
    <DialogCard
      title="Sort by"
      subtitle="Choose how your subscriptions are ordered."
      close_label="Close sorting"
      onClose={() => list.setDialog(null)}
      footer={
        <RowView justify_content="space-between">
          <Pressable accessibilityRole="button" hitSlop={SIZES.padding2} onPress={() => setDraft('next')}>
            <CustomText text="Reset" weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => list.applySort(draft)} style={styles.done}>
            <CustomText text="Apply" color={COLORS.background} size={SIZES.sm} />
          </Pressable>
        </RowView>
      }>
      {LIST_SORTS.map((item, index) => {
        const selected = draft === item.key;
        return (
          <RowView
            key={item.key}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            gap={SIZES.padding2}
            onPress={() => setDraft(item.key)}
            style={[styles.option, index < LIST_SORTS.length - 1 && styles.option_divider]}>
            <Box checked={selected} />
            <CustomText text={item.label} weight={FONTS.regular} size={SIZES.sm} />
          </RowView>
        );
      })}
      <CustomText mt={SIZES.padding2} mb={SIZES.padding2} text={LIST_SORTS.find(item => item.key === draft)!.help} weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
    </DialogCard>
  );
}

export default function ListDialogs({ list }: { list: ListController }) {
  if (list.dialog === 'filters') return <StatusDialog list={list} />;
  if (list.dialog === 'sort') return <SortDialog list={list} />;
  return null;
}
