import { languageOptions } from '@/configs/i18n'
import { ActionIcon, Flex, Popover, Text } from '@mantine/core'
import FlagIcon from '../FlagIcon'
import classes from './LanguageSelectorView.module.scss'

type LanguageSelectorViewProps = {
  opened: boolean
  setOpened: (opened: boolean) => void
  language: string
  onClick: (id: string) => void
}

export default function LanguageSelectorView({
  opened,
  setOpened,
  language,
  onClick,
}: LanguageSelectorViewProps) {
  return (
    <Flex justify="end" align="center">
      <Popover
        opened={opened}
        trapFocus
        position="bottom"
        withArrow
        shadow="md"
        onChange={setOpened}
      >
        <Popover.Target>
          <ActionIcon
            variant="transparent"
            radius="xl"
            className={classes.btnIcon}
            onClick={() => setOpened(!opened)}
          >
            <FlagIcon language={language} size={28} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown p={0} w="auto">
          {Object.entries(languageOptions).map(([id, name]) => (
            <Flex key={id} onClick={() => onClick(id)} className={classes.item}>
              <FlagIcon language={id} />
              <Text>{name}</Text>
            </Flex>
          ))}
        </Popover.Dropdown>
      </Popover>
    </Flex>
  )
}
