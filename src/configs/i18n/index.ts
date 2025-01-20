import EN from './en'
import VI from './vi'

export enum Language {
  EN = 'EN',
  VI = 'VI',
}

export const languages = {
  [Language.EN]: EN,
  [Language.VI]: VI,
}

export const languageOptions = {
  [Language.EN]: 'English',
  /* cspell:disable-next-line */
  [Language.VI]: 'Tiếng Việt',
}
