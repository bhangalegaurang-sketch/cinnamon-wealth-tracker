export const formatGBP = (value: number, hideDecimals = false): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: hideDecimals ? 0 : 2,
    maximumFractionDigits: hideDecimals ? 0 : 2,
  }).format(value);
};

export const formatPercent = (value: number, includeSign = true): string => {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const formatShares = (value: number): string => {
  return new Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 3,
  }).format(value);
};
