import { IntlConfig } from 'react-intl';

export const translationGetters: Record<
  string,
  () => IntlConfig['messages']
> = {
  pt: () => require('./pt.json'),
  en: () => require('./en.json'),
};

export const fallbackLang = { languageTag: 'en', isRTL: false };
