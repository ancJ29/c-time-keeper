import { Language, languages } from '@/configs/i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { useCallback, useEffect } from 'react'

const current = (localStorage.__LANGUAGE__ || Language.VI) as Language
const dictionary = languages[current] || {}

export default function useTranslation(): (key?: string, ...args: (string | number)[]) => string {
  useEffect(() => {
    dayjs.locale(current)
  }, [])

  const t = useCallback((key?: string, ...args: (string | number)[]) => {
    return key ? _t(dictionary, key, ...args) : ''
  }, [])
  return t
}

function _t(
  dictionary: Record<string, string>,
  key?: string,
  ...args: (string | number)[]
): string {
  if (localStorage.__CHECK_LANGUAGE__ === 'true') {
    return 'xxx'
  }
  if (!key) {
    return ''
  }
  if (dictionary[key]) {
    return _convert(dictionary[key], ...args)
  } else {
    return key
  }
}

function _convert(template: string, ...args: (string | number)[]): string {
  let result = template
  args.forEach((arg) => {
    result = arg ? result.replace('%s', (arg || '').toString()) : result
  })
  return result
}
