import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import { Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { formatDuration, formatTime, unique } from '@/utils'
import { Accordion, Flex, Grid, Stack, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useMemo } from 'react'
import classes from './Item.module.scss'

type ItemProps = {
  user?: User
  shifts: Shift[]
  selectedValue: string[]
}

export default function Item({ user, shifts, selectedValue }: ItemProps) {
  const total = useMemo(() => {
    const totalMilliseconds = shifts.reduce((acc, shift) => acc + (shift.end - shift.start), 0)
    return formatDuration(totalMilliseconds)
  }, [shifts])

  if (!user) {
    return <></>
  }

  return (
    <Accordion.Item value={user.id}>
      <Accordion.Control>
        <UserInformation
          user={user}
          total={total}
          opened={selectedValue.includes(user.id)}
          shifts={shifts}
        />
      </Accordion.Control>
      <Accordion.Panel>
        {shifts.map((shift) => (
          <ShiftInformation key={shift.id} shift={shift} />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

function UserInformation({
  user,
  total,
  opened,
  shifts,
}: {
  user: User
  total: string
  opened: boolean
  shifts: Shift[]
}) {
  const { roles } = useRoleStore()
  const t = useTranslation()
  const { venues } = useVenueStore()

  const _venues = useMemo(() => {
    return unique(shifts.map((e) => venues.get(e.venueId)?.name))
      .filter(Boolean)
      .join(', ')
  }, [shifts, venues])

  return (
    <Grid>
      <Grid.Col span={2.5} className={classes.nameItem}>
        <Flex gap={5} w="fit-content" align="center">
          <IconChevronRight
            size={18}
            stroke={2}
            style={{
              transform: opened ? 'rotate(90deg)' : 'none',
              transition: 'transform 200ms ease',
            }}
          />
          <Avatar size={44} src={user?.avatar} />
          <Stack gap={0}>
            <Text fw={600}>{user?.name || ''}</Text>
            <Text c="dimmed" fz={10}>
              {t(roles.get(user?.roleId || '')?.name || '')}
            </Text>
          </Stack>
        </Flex>
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.centerItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.centerItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.centerItem}>
        -
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.centerItem}>
        -
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.centerItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.centerItem}>
        <Text className={classes.venueText}>{_venues}</Text>
      </Grid.Col>
    </Grid>
  )
}

function ShiftInformation({ shift }: { shift: Shift }) {
  const { venues } = useVenueStore()

  const total = useMemo(() => {
    const totalMilliseconds = shift.end - shift.start
    return formatDuration(totalMilliseconds)
  }, [shift])

  return (
    <Grid className={classes.shiftContainer}>
      <Grid.Col span={2.5} className={classes.dateItem}>
        <Text w={32} c="#6b7280">
          {formatTime(shift.start, 'ddd')}
        </Text>
        {formatTime(shift.start, 'DD/MM')}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftCenterItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftCenterItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftCenterItem}>
        {formatTime(shift.start, 'HH:mm')}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftCenterItem}>
        {formatTime(shift.end, 'HH:mm')}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftCenterItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.centerItem}>
        {venues.get(shift.venueId)?.name || '-'}
      </Grid.Col>
    </Grid>
  )
}
