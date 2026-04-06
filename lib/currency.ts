// Approximate exchange rates from IDR to other currencies.
// In production, replace with a live API like exchangerate-api.com
const RATES_FROM_IDR: Record<string, number> = {
  IDR: 1,
  USD: 0.0000625,   // 1 IDR ≈ 0.0000625 USD (1 USD ≈ 16,000 IDR)
  EUR: 0.0000575,   // 1 IDR ≈ 0.0000575 EUR
  GBP: 0.0000495,   // 1 IDR ≈ 0.0000495 GBP
  JPY: 0.00938,     // 1 IDR ≈ 0.00938 JPY
  KRW: 0.0856,      // 1 IDR ≈ 0.0856 KRW
  SGD: 0.0000838,   // 1 IDR ≈ 0.0000838 SGD
  MYR: 0.000281,    // 1 IDR ≈ 0.000281 MYR
  THB: 0.00219,     // 1 IDR ≈ 0.00219 THB
  AUD: 0.0000969,   // 1 IDR ≈ 0.0000969 AUD
  CNY: 0.000456,    // 1 IDR ≈ 0.000456 CNY
  INR: 0.00528,     // 1 IDR ≈ 0.00528 INR
  PHP: 0.00356,     // 1 IDR ≈ 0.00356 PHP
  VND: 1.59,        // 1 IDR ≈ 1.59 VND
  CAD: 0.0000875,   // 1 IDR ≈ 0.0000875 CAD
  CHF: 0.0000556,   // 1 IDR ≈ 0.0000556 CHF
  HKD: 0.000488,    // 1 IDR ≈ 0.000488 HKD
  TWD: 0.00203,     // 1 IDR ≈ 0.00203 TWD
  AED: 0.000230,    // 1 IDR ≈ 0.000230 AED
  SAR: 0.000234,    // 1 IDR ≈ 0.000234 SAR
  BRL: 0.000356,    // 1 IDR ≈ 0.000356 BRL
  RUB: 0.00575,     // 1 IDR ≈ 0.00575 RUB
  NZD: 0.000106,    // 1 IDR ≈ 0.000106 NZD
};

// Maps browser locale to currency code
const LOCALE_CURRENCY_MAP: Record<string, string> = {
  en_US: "USD", en_GB: "GBP", en_AU: "AUD", en_CA: "CAD", en_NZ: "NZD",
  en_SG: "SGD", en_HK: "HKD", en_PH: "PHP", en_IN: "INR",
  id: "IDR", id_ID: "IDR",
  ja: "JPY", ja_JP: "JPY",
  ko: "KRW", ko_KR: "KRW",
  zh: "CNY", zh_CN: "CNY", zh_TW: "TWD", zh_HK: "HKD",
  ms: "MYR", ms_MY: "MYR",
  th: "THB", th_TH: "THB",
  vi: "VND", vi_VN: "VND",
  de: "EUR", de_DE: "EUR", de_AT: "EUR", de_CH: "CHF",
  fr: "EUR", fr_FR: "EUR", fr_CA: "CAD", fr_CH: "CHF",
  es: "EUR", es_ES: "EUR",
  it: "EUR", it_IT: "EUR",
  nl: "EUR", nl_NL: "EUR",
  pt: "EUR", pt_PT: "EUR", pt_BR: "BRL",
  ru: "RUB", ru_RU: "RUB",
  ar: "SAR", ar_SA: "SAR", ar_AE: "AED",
  hi: "INR", hi_IN: "INR",
  fil: "PHP", fil_PH: "PHP",
};

export function getCurrencyFromLocale(locale: string): string {
  // Normalize: "en-US" → "en_US"
  const normalized = locale.replace("-", "_");
  if (LOCALE_CURRENCY_MAP[normalized]) return LOCALE_CURRENCY_MAP[normalized];
  // Try language-only fallback: "en_US" → "en"
  const lang = normalized.split("_")[0];
  if (LOCALE_CURRENCY_MAP[lang]) return LOCALE_CURRENCY_MAP[lang];
  return "USD"; // default fallback
}

export function convertFromIDR(amountIDR: number, targetCurrency: string): number {
  const rate = RATES_FROM_IDR[targetCurrency];
  if (!rate) return amountIDR; // Unknown currency, return as-is
  return amountIDR * rate;
}

export function formatPrice(amount: number, currency: string): string {
  // For currencies with large values (IDR, VND, KRW, JPY), show no decimals
  const noDecimalCurrencies = ["IDR", "VND", "KRW", "JPY", "CLP", "HUF"];
  const decimals = noDecimalCurrencies.includes(currency) ? 0 : 2;
  return amount.toFixed(decimals);
}

export function getSupportedCurrencies(): string[] {
  return Object.keys(RATES_FROM_IDR);
}
