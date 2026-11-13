import ReactNativeBlobUtil from 'react-native-blob-util';
import { viewDocument } from '@react-native-documents/viewer';

// Receipt PDFs: the private link is downloaded to the app cache, opened read-only (iOS Quick Look, Android's PDF app),
// and removed when the Receipts screen closes. Images need no file: the screen shows them from the link.
const cached: string[] = [];

export async function viewReceiptPdf(url: string, name: string, receipt_id: string) {
  const path = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/receipt-${receipt_id}.pdf`;
  const response = await ReactNativeBlobUtil.config({ path }).fetch('GET', url);
  cached.push(path);
  // An expired or refused link answers with an error page, not a PDF: don't open it.
  if (response.info().status >= 400) throw new Error('Unable to open this file. Please try again.');
  await viewDocument({ uri: `file://${path}`, mimeType: 'application/pdf', headerTitle: name, grantPermissions: 'read' });
}

export function clearReceiptFiles() {
  for (const path of cached.splice(0)) ReactNativeBlobUtil.fs.unlink(path).catch(() => undefined);
}
