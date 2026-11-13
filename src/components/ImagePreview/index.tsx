import { Image, Modal, Pressable, View } from 'react-native';
import { close_icon } from '../../assets/icons';
import { SIZES } from '../../constants/theme';
import Icons from '../Icons';
import { styles } from './styles';

type Props = {
  uri: string | null;
  label: string;
  onClose: () => void;
};

// A full-screen image (a sent chat image or a receipt image) with a close button.
export default function ImagePreview({ uri, label, onClose }: Props) {
  return (
    <Modal visible={!!uri} animationType="fade" onRequestClose={onClose}>
      <View style={styles.preview}>
        {uri ? <Image source={{ uri }} resizeMode="contain" style={styles.preview_image} accessibilityLabel={label} /> : null}
        <Pressable accessibilityRole="button" accessibilityLabel="Close preview" hitSlop={SIZES.padding3} onPress={onClose} style={styles.preview_close}>
          <Icons name={close_icon} />
        </Pressable>
      </View>
    </Modal>
  );
}
