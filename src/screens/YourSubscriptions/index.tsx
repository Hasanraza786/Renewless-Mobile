import { colors } from '../../constants/theme';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { icloud_logo, netflix_logo, spotify_logo } from '../../assets/icons';
import Container from '../../components/Container';
import CustomText from '../../components/CustomText';
import Icons from '../../components/Icons';
import InfoTooltip from '../../components/InfoTooltip';
import { OnboardingLink, OnboardingPrimary } from '../../components/OnboardingButton';
import OnboardingHeader from '../../components/OnboardingHeader';
import OnboardingTitle from '../../components/OnboardingTitle';
import type { AuthStackParamList } from '../../types';
import { common_styles } from '../../utils/common_styles';
import { styles } from './styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'YourSubscriptions'>;

const ITEMS = [
  { name: 'Netflix', price: 15.99, when: '27 Oct', trial: false, logo: netflix_logo, detail: 'Renews 27 Oct · estimated' },
  { name: 'Spotify', price: 11.99, when: '31 Oct', trial: true, logo: spotify_logo, detail: 'Trial ends 31 Oct · then $11.99/month' },
  { name: 'iCloud+', price: 2.99, when: '30 Oct', trial: false, logo: icloud_logo, detail: 'Renews 30 Oct · estimated' },
];

export default function YourSubscriptionsScreen({ navigation }: Props) {
  const [selected, setSelected] = useState(() => ITEMS.map(() => true));
  const picked = ITEMS.filter((_, index) => selected[index]);
  const monthly = picked.reduce((sum, item) => sum + (item.trial ? 0 : item.price), 0);
  const saved_total = picked.reduce((sum, item) => sum + item.price, 0);

  function toggle(index: number) {
    setSelected(current => current.map((on, item_index) => (item_index === index ? !on : on)));
  }

  function onSave() {
    const next = picked.slice().sort((a, b) => a.when.localeCompare(b.when))[0];
    navigation.navigate('SaveYourFinds', {
      count: picked.length,
      monthly: monthly.toFixed(2),
      saved_total: saved_total.toFixed(2),
      next_name: next?.name,
      next_when: next?.when,
      next_amount: next ? next.price.toFixed(2) : undefined,
    });
  }

  return (
    <Container>
      <View style={styles.main_view}>
        <OnboardingHeader step={4} on_back={() => navigation.navigate('ConnectInbox')} />
        <ScrollView showsVerticalScrollIndicator={false} style={common_styles.flex_1}>
          <OnboardingTitle
            variant="results"
            eyebrow="YOUR FIRST LOOK"
            title="Small charges."
            emphasis="A clearer picture."
            copy={`We found ${ITEMS.length} possible subscriptions. Review what you want to keep.`}
          />
          <View style={styles.total}>
            <View>
              <CustomText text="Estimated monthly cost" weight="Raleway-Regular" size={10} line_height={14} />
              <CustomText text={`USD ${monthly.toFixed(2)}`} weight="Raleway-Regular" size={24} line_height={30} mt={7} mb={7} />
              <CustomText text={`${picked.length} selected · paid plans only in total`} weight="Raleway-Regular" color={colors.text_secondary} size={10} line_height={14} />
            </View>
            <View style={styles.donut}>
              <CustomText text={String(picked.length)} weight="Raleway-Regular" size={17} line_height={20} />
              <CustomText text="selected" weight="Raleway-Regular" color={colors.text_secondary} size={7} line_height={9} />
            </View>
          </View>
          <View style={styles.renewal}>
            <CustomText
              text={`${picked.length} ${picked.length === 1 ? 'upcoming event' : 'upcoming events'} in the next 7 days`}
              weight="Raleway-Regular"
              color={colors.text_secondary}
              size={11}
              line_height={18}
              style={common_styles.flex_1}
            />
            <CustomText text={picked.length ? `USD ${saved_total.toFixed(2)}` : '—'} weight="Raleway-Regular" color={colors.accent} size={11} line_height={18} />
          </View>
          <View style={styles.caption}>
            <CustomText text="SUBSCRIPTIONS FOUND" weight="Raleway-Regular" color={colors.text_secondary} size={9} line_height={12} style={{ letterSpacing: 0.5 }} />
            <CustomText text="Review before saving" weight="Raleway-Regular" color={colors.text_secondary} size={9} line_height={12} />
          </View>
          <View style={styles.list}>
            {ITEMS.map((item, index) => (
              <Pressable key={item.name} accessibilityRole="checkbox" accessibilityState={{ checked: selected[index] }} onPress={() => toggle(index)} style={[styles.row, index === ITEMS.length - 1 && styles.row_last]}>
                <View style={[styles.box, selected[index] && styles.box_on]}>
                  {selected[index] ? <CustomText text="✓" color={colors.on_accent} size={12} line_height={14} /> : null}
                </View>
                <View style={styles.logo}>
                  <Icons name={item.logo} icon_height={24} />
                </View>
                <View style={common_styles.flex_1}>
                  <CustomText text={item.name} size={12} line_height={16} />
                  <CustomText text={item.detail} weight="Raleway-Regular" color={colors.text_secondary} size={9} line_height={12} mt={5} />
                </View>
                <CustomText text={item.trial ? 'Free trial' : `$${item.price.toFixed(2)}`} weight="Raleway-Regular" size={13} line_height={16} />
              </Pressable>
            ))}
          </View>
          <InfoTooltip
            label="How these estimates work"
            paragraphs={[
              'Costs and renewal dates are estimated from your receipts. Older emails may refer to plans you’ve already cancelled. Review each subscription before saving.',
              'Monthly cost is an estimate based on billing frequency and excludes active free trials. Trial rows show the price after trial. Upcoming events show expected charges in the next 7 days. Different currencies are shown separately, without conversion.',
            ]}
          />
        </ScrollView>
        <View style={styles.footer}>
          <OnboardingPrimary text={`Save ${picked.length} subscriptions →`} disabled={picked.length === 0} onPress={onSave} />
          <OnboardingLink text="Nothing looks right? Add manually" onPress={() => navigation.navigate('Signup')} />
        </View>
      </View>
    </Container>
  );
}
