import Avatar from '@/components/common/Avatar'
import { Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import { formatTime, ONE_HOUR, ONE_MINUTE } from '@/utils'
import { Box, Collapse, Flex, Grid, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronRight } from '@tabler/icons-react'
import { useMemo } from 'react'
import classes from './Item.module.scss'

type ItemProps = {
  user: User
  shifts: Shift[]
}

export default function Item({ user, shifts }: ItemProps) {
  const [opened, { toggle }] = useDisclosure(false)

  const total = useMemo(() => {
    const totalMilliseconds = shifts.reduce((acc, shift) => acc + (shift.end - shift.start), 0)
    const hours = Math.floor(totalMilliseconds / ONE_HOUR)
    const minutes = Math.floor((totalMilliseconds % ONE_HOUR) / ONE_MINUTE)

    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }, [shifts])

  return (
    <Box c="#4b5563">
      <UserInformation user={user} total={total} opened={opened} onClick={toggle} />
      <Collapse in={opened} transitionDuration={200} transitionTimingFunction="linear" mb={10}>
        {shifts.map((shift) => (
          <ShiftInformation key={shift.id} shift={shift} />
        ))}
      </Collapse>
    </Box>
  )
}

function UserInformation({
  user,
  total,
  opened,
  onClick,
}: {
  user: User
  total: string
  opened: boolean
  onClick: () => void
}) {
  const { roles } = useRoleStore()

  return (
    <Grid className={classes.userContainer} onClick={onClick}>
      <Grid.Col span={4} className={classes.nameItem}>
        <Flex gap={5} w="fit-content" align="center">
          <IconChevronRight
            size={18}
            stroke={2}
            style={{
              transform: opened ? 'rotate(90deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
          <Avatar size={44} />
          <Stack gap={0}>
            <Text fw={600}>{user?.name || ''}</Text>
            <Text c="dimmed" fz={10}>
              {roles.get(user?.roleId || '')?.name}
            </Text>
          </Stack>
        </Flex>
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.centerItem} />
      <Grid.Col span={1.6} className={classes.centerItem} />
      <Grid.Col span={1.6} className={classes.centerItem} />
      <Grid.Col span={1.6} className={classes.centerItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.centerItem}>
        {total}
      </Grid.Col>
    </Grid>
  )
}

function ShiftInformation({ shift }: { shift: Shift }) {
  const total = useMemo(() => {
    const totalMilliseconds = shift.end - shift.start
    const hours = Math.floor(totalMilliseconds / ONE_HOUR)
    const minutes = Math.floor((totalMilliseconds % ONE_HOUR) / ONE_MINUTE)

    return `${hours}:${minutes.toString().padStart(2, '0')}`
  }, [shift])

  return (
    <Grid className={classes.shiftContainer}>
      <Grid.Col span={4} className={classes.dateItem}>
        {formatTime(shift.start, 'ddd DD/MM')}
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.shiftCenterItem}>
        {formatTime(shift.start, 'HH:mm')}
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.shiftCenterItem}>
        {formatTime(shift.end, 'HH:mm')}
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.shiftCenterItem} />
      <Grid.Col span={1.6} className={classes.shiftCenterItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.6} className={classes.centerItem}>
        {total}
      </Grid.Col>
    </Grid>
  )
}
