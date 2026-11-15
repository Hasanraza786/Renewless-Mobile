import type { InboxProvider } from '../../types';
import { afterModalClose } from '../../utils/modal';
import AppSheet from '../AppSheet';
import InboxProviders from '../InboxProviders';

type Props = {
  visible: boolean;
  onClose: () => void;
  // Runs once the sheet has closed, so the provider's sign-in sheet can present.
  onPick: (provider: InboxProvider) => void;
};

// Adding a second inbox (Profile + Connect, Home's Connect another inbox, Choose an inbox › Connect another inbox).
export default function ChooseInboxSheet({ visible, onClose, onPick }: Props) {
  const pick = (provider: InboxProvider) => {
    onClose();
    afterModalClose(() => onPick(provider));
  };
  return (
    <AppSheet visible={visible} title="Connect an inbox" subtitle="Read-only. You can connect up to 2." onClose={onClose}>
      <InboxProviders variant="rows" onPick={pick} />
    </AppSheet>
  );
}
