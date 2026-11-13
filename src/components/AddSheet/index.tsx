import AddOptions from '../AddOptions';
import AppSheet from '../AppSheet';

type Props = {
  visible: boolean;
  onClose: () => void;
};

// Header + on Home, List and Calendar (and an empty Calendar date): exactly three ways to add. Close keeps the screen as it was.
export default function AddSheet({ visible, onClose }: Props) {
  return (
    <AppSheet visible={visible} title="Add a subscription" subtitle="Choose what works for you." onClose={onClose}>
      <AddOptions onPick={onClose} />
    </AppSheet>
  );
}
