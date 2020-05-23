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
};
