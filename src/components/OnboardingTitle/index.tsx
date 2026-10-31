import { colors } from '../../constants/theme';
import CustomText from '../CustomText';
import { styles } from './styles';

type Variant = 'welcome' | 'connect' | 'results' | 'save' | 'ready' | 'empty';

type Props = {
  eyebrow: string;
  title: string;
  emphasis?: string;
  copy: string;
  variant?: Variant;
};

const title_size: Record<Variant, { size: number; line: number; tracking: number }> = {
  welcome: { size: 30, line: 36, tracking: -1 },
  connect: { size: 30, line: 36, tracking: -1 },
  results: { size: 23, line: 28, tracking: -0.5 },
  save: { size: 26, line: 30, tracking: -0.6 },
  ready: { size: 28, line: 34, tracking: -0.6 },
  empty: { size: 27, line: 32, tracking: -0.6 },
};

export default function OnboardingTitle({ eyebrow, title, emphasis, copy, variant = 'welcome' }: Props) {
  const type = title_size[variant];
  const centered = variant === 'ready' || variant === 'empty';

  return (
    <>
      <CustomText
        text={eyebrow}
        weight="Raleway-Regular"
        color={colors.text_secondary}
        size={9}
        line_height={12}
        align={centered ? 'center' : 'left'}
        style={styles[variant === 'results' || variant === 'save' ? 'eyebrow_tight' : 'eyebrow']}
      />
      <CustomText
        text={title}
        size={type.size}
        line_height={type.line}
        align={centered ? 'center' : 'left'}
        style={{ letterSpacing: type.tracking }}
      />
      {emphasis ? (
        <CustomText
          text={emphasis}
          color={colors.accent}
          size={type.size}
          line_height={type.line}
          align={centered ? 'center' : 'left'}
          style={{ letterSpacing: type.tracking }}
        />
      ) : null}
      <CustomText
        text={copy}
        weight="Raleway-Regular"
        color={colors.text_secondary}
        size={variant === 'welcome' ? 13 : 12}
        line_height={variant === 'welcome' ? 22 : variant === 'connect' ? 19 : variant === 'save' ? 18 : 20}
        align={centered ? 'center' : 'left'}
        style={styles[variant]}
      />
    </>
  );
}
