export function extractSearchParamsFromUrl<T>(
  url: string
): T & { ids?: number[] } {
  if (!url) {
    return null;
  }

  const { searchParams } = new URL(url);

  const params: Record<string, any> = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params as T;
}
