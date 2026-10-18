export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Request failed';
}

export function isUnauthorized(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    (error as { status?: number }).status === 401
  );
}
