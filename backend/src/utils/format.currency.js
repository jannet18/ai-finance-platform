export function convertToCurrency(value, currencySymbol = "$") {
  if (typeof value !== "number") {
    throw new TypeError("Value must be a number");
  }
  return `${currencySymbol}${value.toFixed(2)}`;
}
export function formatCurrency(value, options = {}) {
  const { currencySymbol = "$", locale = "en-US" } = options;
  if (typeof value !== "number") {
    throw new TypeError("Value must be a number");
  }
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencySymbol,
  }).format(value);
}
export function parseCurrencyString(currencyString) {
  const numberString = currencyString.replace(/[^0-9.-]+/g, "");
  const parsedValue = parseFloat(numberString);
  if (isNaN(parsedValue)) {
    throw new Error("Invalid currency string");
  }
  return parsedValue;
}
export function isValidCurrencyString(currencyString) {
  const regex = /^[$€£¥]?\d+(\.\d{2})?$/;
  return regex.test(currencyString);
}
