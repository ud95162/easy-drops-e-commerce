// Shared display helpers for the storefront.

export const formatPrice = (n) =>
  'Rs ' +
  Number(n || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// Quantity label. Loose items sold by weight can be fractional; render a
// tidy value (e.g. 0.5 kg -> "500 g", 1.5 -> "1.5 kg").
export function formatQty(quantity, unit = '', type = 'PACKET') {
  const q = Number(quantity || 0);
  if (type === 'LOOSE' && (unit === 'kg' || unit === 'l') && q > 0 && q < 1) {
    const sub = unit === 'kg' ? 'g' : 'ml';
    return `${Math.round(q * 1000)} ${sub}`;
  }
  const val = Number.isInteger(q) ? q : q.toString();
  return unit ? `${val} ${unit}` : `${val}`;
}

// Step + minimum for a quantity stepper based on product type.
export function qtyRules(type) {
  return type === 'LOOSE' ? { step: 0.5, min: 0.5 } : { step: 1, min: 1 };
}
