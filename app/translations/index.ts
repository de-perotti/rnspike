import { IntlConfig } from 'react-intl';

export enum Languages {
  PORTUGUESE = 'pt',
  ENGLISH = 'en',
}

export const translationGetters: Record<
  string,
  () => IntlConfig['messages']
> = {
  [Languages.PORTUGUESE]: () => require('./pt.json'),
  [Languages.ENGLISH]: () => require('./en.json'),
};

export const fallbackLang = { languageTag: Languages.ENGLISH, isRTL: false };
