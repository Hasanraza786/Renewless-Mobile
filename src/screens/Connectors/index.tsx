import { useCallback } from 'react';
import {
  FlatList,
  Pressable,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RowView from '../../components/RowView';
import Container from '../../components/Container';
import StateView from '../../components/StateView';
import CustomText from '../../components/CustomText';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import { loadConnectors } from '../../redux/actions/connectors-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, TabParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { formatDate } from '../../utils/dates';
import { styles } from './styles';

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Connectors'>,
  NativeStackScreenProps<AppStackParamList>
>;

function syncLabel(value: string | null) {
  if (!value) return 'Not synced';
  return formatDate(value);
}

export default function ConnectorsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.connectors.connectors);
  const loading = useAppSelector(state => state.connectors.loading.list);
  const error = useAppSelector(state => state.connectors.error.list);
  const status = loading ? 'loading' : error ? 'failed' : 'ready';

  const load = useCallback(() => {
    dispatch(loadConnectors());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <Container>
      <View style={styles.main_view}>
      <RowView gap={0} style={{ marginBottom: SIZES.padding2 }}>
        <CustomText text="Connectors" size={SIZES.screen_heading} line_height={SIZES.screen_heading_line} style={common_styles.flex_1} />
        <Pressable onPress={() => navigation.navigate('AddConnector')}>
          <CustomText text="Add" color={COLORS.primary} size={SIZES.button} line_height={SIZES.button_line} />
        </Pressable>
      </RowView>
      {status === 'loading' ? <StateView status="loading" message="Loading accounts." /> : null}
      {status === 'failed' ? <StateView status="failed" message={error} onRetry={load} /> : null}
      {status === 'ready' ? (
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <StateView status="empty" message="No Gmail accounts connected." />
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Review', { connectorId: item.id, email: item.email })
              }
              style={styles.card}>
              <CustomText text={item.email} size={SIZES.subscription_name} line_height={SIZES.subscription_name_line} />
              <CustomText
                text={item.status}
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.supporting}
                line_height={SIZES.supporting_line}
                mt={SIZES.padding2 / 2}
                transform="capitalize"
              />
              <CustomText
                text={`Last sync ${syncLabel(item.lastSync)}`}
                weight={FONTS.regular}
                color={COLORS.text_secondary}
                size={SIZES.supporting}
                line_height={SIZES.supporting_line}
                mt={SIZES.padding2 / 2}
                transform="capitalize"
              />
            </Pressable>
          )}
        />
      ) : null}
      </View>
    </Container>
  );
}
