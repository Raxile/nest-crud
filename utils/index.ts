export function buildResponse<T, E>({
  code = 200,
  message = 'Success',
  data = null as T | null,
  error = null as E | null,
}: {
  code?: number;
  message?: string;
  data?: T | null;
  error?: E | null;
}) {
  return {
    code,
    message,
    data,
    error,
    timestamp: new Date().toISOString(),
  };
}
