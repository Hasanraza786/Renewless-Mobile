// The riyal (U+E900) and dirham (U+E901) signs are not in Raleway: CustomText draws them with FONTS.symbol.
const SIGNS: Record<string, string> = { SAR: '\uE900', AED: '\uE901' };
export const SIGN_PATTERN = /([\uE900\uE901])/;

// UI symbols only: the backend and DTOs keep ISO codes. Currencies without a symbol keep their code.
const SYMBOLS: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', INR: '₹', PKR: 'Rs ', SAR: `${SIGNS.SAR} `, AED: `${SIGNS.AED} ` };

// Decimal places each currency uses, as the backend counts them (Node's Intl): most 2, these 0 or 3. Hermes' Intl
// isn't relied on, so the list is fixed here.
const NO_DECIMALS = new Set('AFN ALL BIF CLP COP DJF GNF HUF IDR IQD IRR ISK JPY KMF KPW KRW LAK LBP MGA MMK PKR PYG RWF SLL SOS SYP UGX VND VUV XAF XOF XPF YER'.split(' '));
const THREE_DECIMALS = new Set(['BHD', 'JOD', 'KWD', 'LYD', 'OMR', 'TND']);
export const minorDigits = (currency: string) => (NO_DECIMALS.has(currency) ? 0 : THREE_DECIMALS.has(currency) ? 3 : 2);

// An amount with the currency's decimals: "11.99" USD, "1500" PKR, "4.500" KWD. Used for display and for what is sent.
export const formatAmount = (currency: string, amount: string | number) => Number(amount).toFixed(minorDigits(currency));

// Amount fields: whole-number currencies (PKR, IDR…) get a keyboard without a decimal point and a "0" placeholder.
export const amountKeyboard = (currency: string) => (minorDigits(currency) === 0 ? 'number-pad' : 'decimal-pad');
export const amountPlaceholder = (currency: string) => formatAmount(currency, 0);

// "$17.99", "Rs 1500", "<riyal> 49.00", "<dirham> 49.00": the amount in the currency's decimals. Text that isn't a
// number is shown as given.
export function money(currency: string, amount: string | number) {
  const value = amount === '' || !Number.isFinite(Number(amount)) ? amount : formatAmount(currency, amount);
  return `${SYMBOLS[currency] ?? `${currency} `}${value}`;
}

// Screen readers and native widgets cannot read the signs; they get the code instead.
export const spokenMoney = (text: string) => text.replace(/\uE900/g, 'SAR').replace(/\uE901/g, 'AED');

// Currency picker: the common seven first, then by code. PKR and IDR use no decimals (minorDigits).
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
