import reducer, { removeListRecord, setListRecords, upsertListRecords } from '../src/redux/slices/list-slice';
import type { SubscriptionRecord } from '../src/types';

const record = (id: string, price: string) => ({ id, price }) as unknown as SubscriptionRecord;
const loaded = reducer(undefined, setListRecords({ records: [record('a', '10'), record('b', '20')], today: '2026-11-16' }));

test('a saved change replaces its row or adds a new one, and a removal drops it', () => {
  const edited = reducer(loaded, upsertListRecords([record('b', '25'), record('c', '30')]));
  expect(edited.records?.map(item => [item.id, item.price])).toEqual([['a', '10'], ['b', '25'], ['c', '30']]);
  expect(reducer(edited, removeListRecord('a')).records?.map(item => item.id)).toEqual(['b', 'c']);
});

test('a list never loaded stays unloaded, so its first visit reads every record', () => {
  const empty = reducer(undefined, upsertListRecords([record('a', '10')]));
  expect(empty.records).toBeNull();
});
