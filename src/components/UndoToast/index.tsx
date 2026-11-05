import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS, SIZES, COLORS } from '../../constants/theme';
import { restoreSubscription } from '../../redux/actions/detail-action';
import { setRemoved } from '../../redux/slices/detail-slice';
import { setNotice } from '../../redux/slices/profile-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { styles } from './styles';

const UNDO_MS = 8000;
const NOTICE_MS = 3000;

// App-level toast: Undo after removing tracking (restores the same subscription ID), otherwise a one-line notice.
export default function UndoToast() {
  const dispatch = useAppDispatch();
  const removed = useAppSelector(state => state.detail.removed);
  const notice = useAppSelector(state => state.profile.notice);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!removed) return;
    const timer = setTimeout(() => dispatch(setRemoved(null)), UNDO_MS);
    return () => clearTimeout(timer);
  }, [dispatch, removed]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => dispatch(setNotice(null)), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [dispatch, notice]);

  if (!removed && !notice) return null;
  return (
    <View pointerEvents="box-none" style={[styles.main_view, { bottom: insets.bottom + SIZES.padding * 4.5 }]}>
      <RowView accessibilityRole="alert" justify_content="space-between" gap={SIZES.padding2} style={styles.toast}>
        <CustomText text={removed ? `Removed ${removed.name} from Renewless.` : notice!} weight={FONTS.regular} size={SIZES.sm} style={styles.text} />
        {removed ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Undo removing ${removed.name}`} hitSlop={SIZES.padding2} onPress={() => dispatch(restoreSubscription(removed.id))}>
            <CustomText text="Undo" color={COLORS.primary} size={SIZES.sm} />
          </Pressable>
        ) : null}
      </RowView>
    </View>
  );
}
