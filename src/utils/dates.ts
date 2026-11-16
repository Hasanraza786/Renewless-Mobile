// Today's local YYYY-MM-DD, or another moment's local date.
export function localToday(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function isIsoDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function formatDate(iso: string) {
  if (!isIsoDate(iso)) return iso;
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// "26 Oct · 9:00 AM" from the last successful sync, or Not synced yet (an inbox that never synced has no date).
export const syncLabel = (iso: string | null) => {
  if (!iso) return 'Not synced yet';
  const date = new Date(iso);
  return `${date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} · ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
};
