/**
 * Intersperses ads into a list of items at a given frequency.
 * @param items - The list of main content items.
 * @param ads - The list of ads to insert.
 * @param frequency - How often to insert an ad (e.g., 4 means after every 4 items).
 * @returns A new list with ads interspersed.
 */
export function intersperseAds(items: any[], ads: any[], frequency: number): any[] {
  if (!ads || ads.length === 0) {
    return items.map(item => ({ type: 'item', data: item }));
  }

  const newItems: any[] = [];
  let adIndex = 0;

  items.forEach((item, index) => {
    newItems.push({ type: 'item', data: item });
    if ((index + 1) % frequency === 0) {
      if (adIndex < ads.length) {
        newItems.push({ type: 'ad', data: ads[adIndex] });
        adIndex++;
      }
    }
  });

  return newItems;
}
