// Persian digits conversion mapping
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(value: string | number): string {
  if (value === null || value === undefined) return '';
  const str = value.toString();
  return str.replace(/\d/g, (d) => PERSIAN_DIGITS[parseInt(d, 10)]);
}

export function formatNumberWithCommas(value: number): string {
  if (isNaN(value)) return '۰';
  return value.toLocaleString('en-US');
}

export function formatPrice(price: number, includeCurrency = true): string {
  if (price === undefined || price === null) return '';
  const formatted = formatNumberWithCommas(price);
  const persianFormatted = toPersianDigits(formatted);
  return includeCurrency ? `${persianFormatted} تومان` : persianFormatted;
}

export function formatToman(price: number): string {
  return formatPrice(price, true);
}

export function formatPercent(percent: number): string {
  return `${toPersianDigits(percent)}٪`;
}

export function isValidIranPhone(phone: string): boolean {
  // Iranian mobile format: 09123456789 or +989123456789
  const clean = phone.replace(/\s+/g, '').replace(/^(\+98|0098)/, '0');
  return /^09\d{9}$/.test(clean);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
