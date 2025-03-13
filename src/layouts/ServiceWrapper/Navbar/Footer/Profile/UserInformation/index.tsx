import Avatar from '@/components/common/Avatar'
import useAuthStore from '@/stores/auth.store'
import { Box, Stack, Text } from '@mantine/core'
import { IconChevronUp } from '@tabler/icons-react'
import classes from './UserInformation.module.scss'

type UserInformationProps = {
  navbarOpened: boolean
}

export default function UserInformation({ navbarOpened }: UserInformationProps) {
  const { user } = useAuthStore()

  return (
    <Box className={`${classes.container} ${!navbarOpened ? classes.shifted : ''}`}>
      <div className={classes.item}>
        <Avatar size={40} src={user?.avatar} />
        {navbarOpened && (
          <Stack gap={0}>
            <Text fw={400}>{user?.name || ''}</Text>
            <Text c="dimmed" fz={10}>
              {user?.email || ''}
            </Text>
          </Stack>
        )}
      </div>
      {navbarOpened && <IconChevronUp size={20} strokeWidth={1.5} />}
    </Box>
  )
}
