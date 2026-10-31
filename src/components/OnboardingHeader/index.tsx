import { colors } from '../../constants/theme';
import { Pressable, View } from 'react-native';
import { back_icon, logo_mark } from '../../assets/icons';
import Icons from '../Icons';
import CustomText from '../CustomText';
import { styles } from './styles';

const STEP_COUNT = 5;

type Props = {
  step: number;
  on_back?: () => void;
};

export default function OnboardingHeader({ step, on_back }: Props) {
  return (
    <View>
      <View style={styles.bar}>
        {on_back ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={on_back} style={styles.back}>
            <Icons name={back_icon} icon_height={21} stroke={colors.text} />
          </Pressable>
        ) : (
          <View style={styles.spacer} />
        )}
        <CustomText text="RENEWLESS" weight="Raleway-Regular" color={colors.text_secondary} size={9} line_height={12} style={styles.word} />
        <View style={styles.mark}>
          <Icons name={logo_mark} icon_height={24} />
        </View>
      </View>
      <View style={styles.steps}>
        {Array.from({ length: STEP_COUNT }, (_, index) => (
          <View key={index} style={[styles.step, index < step && styles.step_done]} />
        ))}
      </View>
    </View>
  );
}
