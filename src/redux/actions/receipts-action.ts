import { toReceipt } from '../../api_services/adapters';
import type { ReceiptDto } from '../../api_services/dto';
import apiServices from '../../api_services/request-handler';
import type { ReceiptFile, ReceiptItem } from '../../types';
import { trackEvent } from '../../utils/analytics';
import { viewReceiptPdf } from '../../utils/receipt-file';
import { requestHandler, type AppThunk } from '../request-handler';

const PAGE = 50;

// Every receipt of one subscription, page by page, newest first.
async function getAllReceipts({ id }: { id: string }) {
  const items: ReceiptDto[] = [];
  let cursor: string | undefined;
  do {
    const page = await apiServices.getSubscriptionReceipts({ id, cursor, limit: PAGE });
    items.push(...page.items);
    cursor = page.nextCursor ?? undefined;
  } while (cursor);
  return items;
}

export function getReceipts(id: string, onLoaded: (items: ReceiptItem[]) => void, onFailed: (message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: getAllReceipts,
        param_data: { id },
        onDone: items => onLoaded(items.map(toReceipt)),
        onError: error => onFailed(error.message),
      }),
    );
  };
}

// A kept file opens from a fresh 5-minute link: a PDF in the system viewer, an image in the screen's preview.
async function openFile({ receipt_id, file, onImage }: { receipt_id: string; file: ReceiptFile; onImage: (url: string) => void }) {
  const { url } = await apiServices.getReceiptFile({ id: receipt_id, attachment_id: file.id });
  if (file.kind === 'image') return onImage(url);
  await viewReceiptPdf(url, file.name, receipt_id);
}

export function openReceiptFile(receipt_id: string, file: ReceiptFile, onImage: (url: string) => void, onDone: () => void, onFailed: (message: string) => void): AppThunk {
  return async dispatch => {
    await dispatch(
      requestHandler({
        apiService: openFile,
        param_data: { receipt_id, file, onImage },
        onDone: () => {
          trackEvent('receipt_file_opened', { type: file.kind });
          onDone();
        },
        onError: error => {
          onDone();
          onFailed(error.status ? error.message : 'Unable to open this file. Please try again.');
        },
      }),
    );
  };
}
