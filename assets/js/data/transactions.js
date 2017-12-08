export const formatCurrency = amount => {
  const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  });
  return formatter.format(amount);
};

export const centsToDollars = cents => {
  if (!cents) return 0;
  return formatCurrency(parseFloat(cents / 100).toFixed(2));
};

export const dollarsToCents = dollars => {
  dollars = dollars.replace(',', '').replace('$', '');
  dollars = parseFloat(dollars).toFixed(2);

  const result = parseFloat(dollars * 100);

  // TODO: Throw an error instead of 0.
  if (result > 999999999 || result < -999999999) {
    return 0;
  }

  return result;
};

export const stringIsNumber = number => {
  number = number.replace(',', '').replace('$', '');
  number = parseFloat(number);
  return typeof number === 'number' && !Number.isNaN(number);
};
