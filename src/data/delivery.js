// Free-delivery zones. An address counts as free delivery if it mentions one
// of these areas (English or Sinhala, case-insensitive).
export const FREE_DELIVERY_AREAS = [
  { name: 'Malabe', match: ['malabe', 'මාලබේ'] },
  { name: 'Athurugiriya', match: ['athurugiriya', 'athurugiri', 'අතුරුගිරිය'] },
  { name: 'Homagama', match: ['homagama', 'හෝමාගම'] },
  { name: 'Kaduwela', match: ['kaduwela', 'කඩුවෙල'] },
];

/**
 * Decide delivery status from a free-text address.
 * - known:false  → no address entered yet
 * - free:true    → address is in a free-delivery area (area = which one)
 * - free:false   → address entered but outside the free zones
 */
export function checkFreeDelivery(address) {
  const a = (address || '').toLowerCase().trim();
  if (!a) return { known: false, free: false, area: null };
  for (const area of FREE_DELIVERY_AREAS) {
    if (area.match.some((m) => a.includes(m.toLowerCase()))) {
      return { known: true, free: true, area: area.name };
    }
  }
  return { known: true, free: false, area: null };
}
