// The riyal (U+E900) and dirham (U+E901) signs are not in Raleway: CustomText draws them with FONTS.symbol.
const SIGNS: Record<string, string> = { SAR: '\uE900', AED: '\uE901' };
export const SIGN_PATTERN = /([\uE900\uE901])/;

// UI symbols only: the backend and DTOs keep ISO codes. Currencies without a symbol keep their code.
const SYMBOLS: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', INR: '₹', PKR: 'Rs ', SAR: `${SIGNS.SAR} `, AED: `${SIGNS.AED} ` };

// "$17.99", "Rs 1500.00", "<riyal> 49.00", "<dirham> 49.00". The amount is shown as given.
export function money(currency: string, amount: string | number) {
  return `${SYMBOLS[currency] ?? `${currency} `}${amount}`;
}

// Screen readers and native widgets cannot read the signs; they get the code instead.
export const spokenMoney = (text: string) => text.replace(/\uE900/g, 'SAR').replace(/\uE901/g, 'AED');

// Currency picker: the common seven first, then by code. Two-decimal currencies only, because amounts show two decimals.
export const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US dollar', EUR: 'Euro', GBP: 'British pound', PKR: 'Pakistani rupee', AED: 'UAE dirham', INR: 'Indian rupee', SAR: 'Saudi riyal',
  AUD: 'Australian dollar', BDT: 'Bangladeshi taka', BRL: 'Brazilian real', CAD: 'Canadian dollar', CHF: 'Swiss franc', CNY: 'Chinese yuan',
  DKK: 'Danish krone', EGP: 'Egyptian pound', HKD: 'Hong Kong dollar', IDR: 'Indonesian rupiah', KES: 'Kenyan shilling', LKR: 'Sri Lankan rupee',
  MXN: 'Mexican peso', MYR: 'Malaysian ringgit', NGN: 'Nigerian naira', NOK: 'Norwegian krone', NPR: 'Nepalese rupee', NZD: 'New Zealand dollar',
  PHP: 'Philippine peso', PLN: 'Polish złoty', QAR: 'Qatari riyal', SEK: 'Swedish krona', SGD: 'Singapore dollar', THB: 'Thai baht',
  TRY: 'Turkish lira', ZAR: 'South African rand',
};
export const CURRENCIES = Object.keys(CURRENCY_NAMES);
export const CURRENCY_SEARCH = { placeholder: 'Search currency', empty: 'No currency found' };
