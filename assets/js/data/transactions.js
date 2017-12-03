export const centsToDollars = (cents) => {
  if (!cents) return 0;
  return parseFloat(cents / 100).toFixed(2);
}

export const dollarsToCents = (dollars) => {
  dollars = parseFloat(dollars).toFixed(2);

  const result = parseFloat(dollars * 100);

  // TODO: Throw an error instead of 0.
  if (result > 999999999 || result < -999999999) {
    return 0;
  }

  return result;
}

export const stringIsNumber = (number) => {
  number = parseFloat(number);
  return typeof(number) === 'number' && !Number.isNaN(number);
}
