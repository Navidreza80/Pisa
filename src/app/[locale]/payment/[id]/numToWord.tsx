const yekan = [
  '',
  'یک',
  'دو',
  'سه',
  'چهار',
  'پنج',
  'شش',
  'هفت',
  'هشت',
  'نه',
];
const dahgan = [
  '',
  'ده',
  'بیست',
  'سی',
  'چهل',
  'پنجاه',
  'شصت',
  'هفتاد',
  'هشتاد',
  'نود',
];
const dahToNuzdah = [
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هجده',
  'نوزده',
];
const sadgan = [
  '',
  'صد',
  'دویست',
  'سیصد',
  'چهارصد',
  'پانصد',
  'ششصد',
  'هفتصد',
  'هشتصد',
  'نهصد',
];
const powers = ['', 'هزار', 'میلیون', 'میلیارد'];

function threeDigitToWords(num: number): string {
  const s = Math.floor(num / 100);
  const d = Math.floor((num % 100) / 10);
  const y = num % 10;
  const parts: string[] = [];

  if (s) parts.push(sadgan[s]);
  if (d === 1) {
    parts.push(dahToNuzdah[y]);
  } else {
    if (d) parts.push(dahgan[d]);
    if (y) parts.push(yekan[y]);
  }

  return parts.join(' و ');
}

export function numberToPersianWords(num: number): string {
  if (num === 0) return 'صفر';

  const parts: string[] = [];
  const numStr = num.toString().padStart(Math.ceil(num.toString().length / 3) * 3, '0');
  const chunks = numStr.match(/.{1,3}/g) || [];

  chunks.forEach((chunk, i) => {
    const n = parseInt(chunk);
    if (n === 0) return;
    const p = powers[chunks.length - i - 1];
    parts.push(threeDigitToWords(n) + (p ? ' ' + p : ''));
  });

  return parts.join(' و ');
}
