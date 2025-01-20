import { ActionIcon, Affix, AffixProps } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

type AddButtonProps = {
  onClick: () => void
} & AffixProps

export default function AddButton({ onClick, ...props }: AddButtonProps) {
  return (
    <Affix position={{ bottom: 16, right: 16 }} {...props}>
      <ActionIcon variant="filled" radius="xl" size={40} onClick={() => onClick()}>
        <IconPlus size={26} color="white" />
      </ActionIcon>
    </Affix>
  )
}
