export function polyfillIntl() {
  if (typeof Intl === 'undefined' || !Intl.NumberFormat) {
    console.log('polyfilling Intl');
    const IntlPolyfill = require('intl');
    global.Intl.NumberFormat = IntlPolyfill.NumberFormat;
    require('intl/locale-data/jsonp/pt');
    require('intl/locale-data/jsonp/en');
  }

  if (!Intl.DateTimeFormat) {
    console.log('polyfilling Intl.DateTimeFormat');
    require('date-time-format-timezone');
  }

  if (!Intl.PluralRules) {
    console.log('polyfilling Intl.PluralRules');
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
