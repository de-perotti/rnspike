export function polyfillIntl() {
  if (typeof Intl === 'undefined' || !Intl.NumberFormat) {
    const IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    require('intl/locale-data/jsonp/pt');
    require('intl/locale-data/jsonp/en');
  }

  if (!Intl.DateTimeFormat) {
    require('date-time-format-timezone');
  }

  if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-pluralrules/dist/locale-data/pt');
    require('@formatjs/intl-pluralrules/dist/locale-data/en');
  }

  // @ts-ignore
  if (!Intl.RelativeTimeFormat) {
    console.log('polyfilling Intl.RelativeTimeFormat');
    require('@formatjs/intl-relativetimeformat/polyfill');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/pt');
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en');
  }

  // @ts-ignore
  if (!Intl.DisplayNames) {
    console.log('polyfilling Intl.DisplayNames');
    require('@formatjs/intl-displaynames/polyfill');
    require('@formatjs/intl-displaynames/dist/locale-data/pt');
    require('@formatjs/intl-displaynames/dist/locale-data/en');
  }
}
