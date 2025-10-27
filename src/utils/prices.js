export const cents = (dollars) => Math.round(dollars * 100);
export const formatCents = (centsValue) =>
  (centsValue / 100).toLocaleString(undefined, { style: 'currency', currency: 'USD' });
