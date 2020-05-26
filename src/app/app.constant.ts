/*
*
* Check https://github.com/lipis/flag-icon-css library for flag colors in constant AVAILABLE_LANGUAGES
*
*/
export const APP_CONSTANTS = {
  AVAILABLE_LANGUAGES: [ {
    COUNTRY_CODE: 'en',
    COUNTRY_NAME: 'EN',
    COUNTRY_FLAG_ICON_CLASSNAME: 'flag-icon-gb',
    default: false
  }, {
    COUNTRY_CODE: 'de',
    COUNTRY_NAME: 'DE',
    COUNTRY_FLAG_ICON_CLASSNAME: 'flag-icon-de',
    default: true
  } ],
  STAXTER_CURRENT_LANGUAGE: 'staxterCurrentLanguage',
  SHOW_SCROLL_TO_TOP_BUTTON_POSITION: 150,
  SIDEBAR_ITEMS: {
    LATEST_RATES: { NAME: 'Latest rates', URL: 'latest_rates', icon: 'dashboard' },
    LAST_30_DAYS: { NAME: 'Last 30 days', URL: 'last_30_days', icon: 'replay_30' },
    TOP_5: { NAME: 'Top 5', URL: 'top_5', icon: 'looks_5' }
  },
  REST_API_SERVER: 'https://api.exchangeratesapi.io/',
  LATEST: 'latest',
  BASE: 'base',
  LATEST_RATES_TABLE_COLUMNS: ['currencyName', 'currencyValue', 'change', 'chart'],
  BASE_CURRENCIES: [{
    value: 'EUR',
    viewValue: 'EUR(€)',
    default: true
  }, {
    value: 'USD',
    viewValue: 'USD($)',
    default: false
  }, {
    value: 'GBP',
    viewValue: 'GBP(£)',
    default: false
  }],
  INCREASED: "Increased",
  DECREASED: "Decreased",
  EQUAL: "Equal",
  TOP_FIVE_TABLE_COLUMNS: ['currencyName', 'difference', 'differencePercentage'],
  TOP_CURRENCIES_LIMIT: 5,
  HISTORY: 'history',
  START_AT: 'start_at',
  END_AT: 'end_at',
  SYMBOLS: 'symbols',
  LAST_30_DAYS_COMPARISON_CURRENCIES: [{
    value: 'EUR',
    viewValue: 'EUR(€)',
    default: false
  }, {
    value: 'USD',
    viewValue: 'USD($)',
    default: false
  }, {
    value: 'GBP',
    viewValue: 'GBP(£)',
    default: false
  }, {
    value: 'AUD',
    viewValue: 'AUD($)',
    default: false
  }, {
    value: 'CAD',
    viewValue: 'CAD($)',
    default: true
  }],
};
