import { ActionIcon } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

type LogoutProps = {
  onClick: () => void
}

export default function Logout({ onClick }: LogoutProps) {
  return (
    <ActionIcon variant="subtle" onClick={onClick}>
      <IconLogout size={24} stroke={1.5} color="black" />
    </ActionIcon>
  )
}
