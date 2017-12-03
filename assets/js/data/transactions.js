export const centsToDollars = (cents) => {
  if (!cents) return 0;
  return parseFloat(cents / 100).toFixed(2);
}

export const dollarsToCents = (dollars) => {
  dollars = parseFloat(dollars).toFixed(2);
  return parseFloat(dollars * 100);
}

export const stringIsNumber = (number) => {
  number = parseFloat(number);
  return typeof(number) === 'number' && !Number.isNaN(number);
}
