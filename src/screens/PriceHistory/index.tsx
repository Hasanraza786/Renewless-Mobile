import PlatformLogo from '../../components/PlatformLogo';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import Mascot from '../../components/Mascot';
import RowView from '../../components/RowView';
import StateView from '../../components/StateView';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { goBack } from '../../navigation/service';
import { getSubscriptionDetail } from '../../redux/actions/detail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { dateLabel } from '../../utils/scan';
import { styles } from './styles';
import { money } from '../../utils/money';

type Props = Pick<NativeStackScreenProps<AppStackParamList, 'PriceHistory'>, 'route'>;

// Audit of tracked price changes for one subscription ID, newest first; past receipts never change.
export default function PriceHistoryScreen({ route }: Props) {
  const dispatch = useAppDispatch();
  const { id } = route.params;
  const detail = useAppSelector(state => state.detail.detail);
  const { loading, error } = useAppSelector(state => state.detail);
  const record = detail?.record.id === id ? detail.record : null;

  useEffect(() => {
    if (!record) dispatch(getSubscriptionDetail(id));
  }, [dispatch, id, record]);

  return (
    <Container style={styles.main_view}>
      <Header title="Price history" onBack={goBack} />
      {!record ? (
        <StateView status={error.detail && !loading.detail ? 'failed' : 'loading'} message={error.detail || 'Loop is finding your price history…'} onRetry={() => dispatch(getSubscriptionDetail(id))} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <RowView gap={SIZES.padding2} style={styles.panel}>
            <View style={styles.avatar}><PlatformLogo platform_id={record.platform_id} name={record.name} letter_size={SIZES.md} /></View>
            <View style={common_styles.flex_1}>
              <CustomText text={record.plan ? `${record.name} · ${record.plan}` : record.name} size={SIZES.lg} />
              <CustomText mt={SIZES.padding * 0.3} text="Current tracked price" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
              <CustomText mt={SIZES.padding / 4} text={`${money(record.currency, record.price)} · ${record.cycle}`} size={SIZES.sm} />
            </View>
          </RowView>
          {record.price_history.length ? (
            <>
              {record.price_history.map(change => (
                <View key={change.id} style={styles.panel}>
                  <RowView justify_content="space-between">
                    <CustomText text={change.reason === 'correction' ? 'Price corrected' : 'Price changed'} size={SIZES.lg} />
                    <View style={styles.badge}>
                      <CustomText text={change.source === 'gmail' ? 'Found in Gmail' : 'Updated by you'} weight={FONTS.regular} color={COLORS.primary} size={SIZES.sm} />
                    </View>
                  </RowView>
                  <CustomText
                    mt={SIZES.padding2}
                    weight={FONTS.regular}
                    size={SIZES.sm}
                    text={
                      <>
                        <CustomText text={`${money(change.currency, change.from_amount)} · ${change.from_cycle} → `} weight={FONTS.regular} size={SIZES.sm} line_height={null} />
                        <CustomText text={`${money(change.currency, change.to_amount)} · ${change.to_cycle}`} size={SIZES.sm} />
                      </>
                    }
                  />
                  <RowView justify_content="space-between" style={styles.field}>
                    <CustomText text="Effective from" weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
                    <CustomText text={dateLabel(change.effective_on)} weight={FONTS.regular} size={SIZES.sm} />
                  </RowView>
                </View>
              ))}
              <CustomText text="Price changes don’t alter your previous payment receipts." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} />
            </>
          ) : (
            <View style={styles.empty}>
              <Mascot expression="neutral" size={SIZES.padding * 5.4} label="Loop" />
              <CustomText mt={SIZES.padding * 0.9} text="No price changes yet" size={SIZES.lg} align="center" />
              <CustomText mt={SIZES.padding2} text="Changes appear here when you update a price or Gmail finds a verified change." weight={FONTS.regular} color={COLORS.text_secondary} size={SIZES.sm} align="center" />
            </View>
          )}
        </ScrollView>
      )}
    </Container>
  );
}
