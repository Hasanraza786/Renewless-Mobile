import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS, SIZES, COLORS } from '../../constants/theme';
import { restoreSubscription } from '../../redux/actions/detail-action';
import { setRemoved } from '../../redux/slices/detail-slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CustomText from '../CustomText';
import RowView from '../RowView';
import { styles } from './styles';

const UNDO_MS = 8000;

// App-level Undo after removing tracking; restores the same subscription ID.
export default function UndoToast() {
  const dispatch = useAppDispatch();
  const removed = useAppSelector(state => state.detail.removed);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!removed) return;
    const timer = setTimeout(() => dispatch(setRemoved(null)), UNDO_MS);
    return () => clearTimeout(timer);
  }, [dispatch, removed]);

  if (!removed) return null;
  return (
    <View pointerEvents="box-none" style={[styles.main_view, { bottom: insets.bottom + SIZES.padding * 4.5 }]}>
      <RowView accessibilityRole="alert" justify_content="space-between" gap={SIZES.padding2} style={styles.toast}>
        <CustomText text={`Removed ${removed.name} from Renewless.`} weight={FONTS.regular} size={SIZES.sm} style={styles.text} />
        <Pressable accessibilityRole="button" accessibilityLabel={`Undo removing ${removed.name}`} hitSlop={SIZES.padding2} onPress={() => dispatch(restoreSubscription(removed.id))}>
          <CustomText text="Undo" color={COLORS.primary} size={SIZES.sm} />
        </Pressable>
      </RowView>
    </View>
  );
}
