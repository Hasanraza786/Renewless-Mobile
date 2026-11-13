import { useCallback, useEffect, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getReceipts, openReceiptFile } from '../../redux/actions/receipts-action';
import { getSubscriptionDetail } from '../../redux/actions/detail-action';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import type { AppStackParamList, ReceiptFile, ReceiptItem } from '../../types';
import { clearReceiptFiles } from '../../utils/receipt-file';

export type ReceiptsRoute = NativeStackScreenProps<AppStackParamList, 'Receipts'>['route'];

// One subscription's billing emails with their kept files; a downloaded PDF is removed when the screen closes.
export default function useReceipts(route: ReceiptsRoute) {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const detail = useAppSelector(state => state.detail.detail);
  const record = detail?.record.id === id ? detail.record : null;
  const [receipts, setReceipts] = useState<ReceiptItem[] | null>(null);
  const [load_error, setLoadError] = useState('');
  const [opening_id, setOpeningId] = useState('');
  const [file_error, setFileError] = useState('');
  const [image_url, setImageUrl] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoadError('');
    dispatch(getReceipts(id, setReceipts, setLoadError));
  }, [dispatch, id]);

  useEffect(() => {
    if (!record) dispatch(getSubscriptionDetail(id));
    load();
    return clearReceiptFiles;
    // The record only names the header; loading once per subscription is enough.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, load]);

  const status = receipts ? 'ready' : load_error ? 'failed' : 'loading';
  const onOpened = () => setOpeningId('');
  const openFile = (receipt: ReceiptItem, file: ReceiptFile) => {
    if (opening_id) return;
    setFileError('');
    setOpeningId(file.id);
    dispatch(openReceiptFile(receipt.id, file, setImageUrl, onOpened, setFileError));
  };
  const closeImage = () => setImageUrl(null);

  return { record, receipts, status, load_error, load, opening_id, file_error, image_url, openFile, closeImage };
}

export type ReceiptsController = ReturnType<typeof useReceipts>;
