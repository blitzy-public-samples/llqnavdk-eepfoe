import { format } from 'date-fns';
import { CURRENCY_SYMBOLS } from 'frontend/src/utils/constants';

export function formatDate(date: Date, formatString: string): string {
  return format(date, formatString);
}

export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = CURRENCY_SYMBOLS[currencyCode] || '$';
  const formattedAmount = amount.toFixed(2);
  return `${symbol}${formattedAmount}`;
}

export function capitalizeFirstLetter(text: string): string {
  if (text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}