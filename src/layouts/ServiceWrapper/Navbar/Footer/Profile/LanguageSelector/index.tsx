import { languageOptions } from '@/configs/i18n'
import useTranslation from '@/hooks/useTranslation'
import { Image, Menu, UnstyledButton } from '@mantine/core'
import { IconCheck, IconChevronRight, IconLanguage } from '@tabler/icons-react'
import MenuItem from '../MenuItem'

type LanguageSelectorProps = {
  language: string
  onChangeLanguage: (language: string) => void
  onCloseMenu: () => void
}

export default function LanguageSelector({
  language,
  onChangeLanguage,
  onCloseMenu,
}: LanguageSelectorProps) {
  const t = useTranslation()

  return (
    <Menu
      width={180}
      trigger="click-hover"
      openDelay={100}
      closeDelay={150}
      position="right"
      radius={10}
      shadow="md"
      offset={10}
      zIndex={1500}
    >
      <Menu.Target>
        <UnstyledButton w="100%">
          <MenuItem
            leftIcon={<IconLanguage size={20} strokeWidth={1.5} />}
            label={t('Language')}
            rightIcon={<IconChevronRight size={20} strokeWidth={1.5} />}
          />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        {Object.entries(languageOptions).map(([id, name]) => (
          <MenuItem
            key={id}
            leftIcon={
              <Image radius="lg" h={20} w={20} src={`/imgs/flags/${id.toLowerCase()}.svg`} />
            }
            label={name}
            rightIcon={language === id ? <IconCheck size={20} strokeWidth={1.5} /> : undefined}
            onClick={() => onChangeLanguage(id)}
            onCloseMenu={onCloseMenu}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  )
}
