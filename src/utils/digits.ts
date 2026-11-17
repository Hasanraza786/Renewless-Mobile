// Arabic-Indic (٠-٩) and Persian (۰-۹) keypads type their own digits; amounts, codes and days read only 0-9.
// Both ranges end in 0-9 in their last hex digit, and the Arabic decimal ٫ is a ".".
export const latinDigits = (text: string) => text.replace(/[٠-٩۰-۹]/g, digit => String(digit.charCodeAt(0) % 16)).replace(/٫/g, '.');
