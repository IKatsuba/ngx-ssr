export function extractIdsFromUrl(url: string): number[] {
  if (!url) {
    return [];
  }

  const { pathname } = new URL(url);

  const maybeIds = pathname.split('/').pop().split(',');

  if (maybeIds.every((maybeId) => /\d+/.test(maybeId))) {
    return maybeIds.map((maybeId) => parseInt(maybeId, 10));
  }

  return [];
}
