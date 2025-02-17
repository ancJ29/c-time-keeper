import Avatar from '@/components/common/Avatar'
import useAuthStore from '@/stores/auth.store'
import { Stack, Text } from '@mantine/core'
import MenuItem from '../MenuItem'

type UserInformationProps = {
  onClick: () => void
  onCloseMenu: () => void
}

export default function UserInformation({ onClick, onCloseMenu }: UserInformationProps) {
  const { user } = useAuthStore()

  return (
    <MenuItem
      leftIcon={<Avatar size={38} />}
      onClick={onClick}
      onCloseMenu={onCloseMenu}
      label={
        <Stack gap={0}>
          <Text fw={400}>{user?.name || ''}</Text>
          <Text c="dimmed" fz={11}>
            {user?.email || ''}
          </Text>
        </Stack>
      }
      style={{ padding: '8px 4px' }}
    />
  )
}
