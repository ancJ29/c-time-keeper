import { Language } from '@/configs/i18n'
import LanguageSelectorView from './LanguageSelectorView'
import { useState } from 'react'

export default function LanguageSelector() {
  const [language] = useState(localStorage.__LANGUAGE__ || Language.EN)
  const [opened, setOpened] = useState(false)

  const handleLanguageChange = (value: string) => {
    setOpened(false)
    if (value === language) {
      return
    }
    localStorage.__LANGUAGE__ = value || Language.EN
    window.location.reload()
  }

  return (
    <LanguageSelectorView
      opened={opened}
      setOpened={setOpened}
      language={language}
      onClick={handleLanguageChange}
    />
  )
}
