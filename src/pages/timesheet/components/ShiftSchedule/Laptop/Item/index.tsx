import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import { Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { formatDuration, formatTime, ONE_HOUR, unique } from '@/utils'
import { Accordion, Flex, Grid, Stack, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import store from '../../../../_shift.store'
import TimeSelect from '../TimeSelect'
import classes from './Item.module.scss'

type ItemProps = {
  user?: User
  shifts: Shift[]
}

export default function Item({ user, shifts }: ItemProps) {
  const [opened, setOpened] = useState(true)

  const total = useMemo(() => {
    const totalMilliseconds = shifts.some((shift) => shift.end != null)
      ? shifts.reduce((acc, shift) => {
          if (shift.end == null) {
            return acc
          }

          let duration = shift.end - shift.start
          if (shift.end < shift.start) {
            duration += 24 * ONE_HOUR
          }

          return acc + duration
        }, 0)
      : null

    return formatDuration(totalMilliseconds)
  }, [shifts])

  if (!user) {
    return <></>
  }

  return (
    <Accordion
      key={user.id}
      variant="contained"
      radius={0}
      chevronPosition="left"
      transitionDuration={300}
      classNames={classes}
      defaultValue={user.id}
    >
      <Accordion.Item value={user.id}>
        <Accordion.Control onClick={() => setOpened(!opened)}>
          <UserInformation user={user} total={total} opened={opened} shifts={shifts} />
        </Accordion.Control>
        <Accordion.Panel>
          {shifts.map((shift) => (
            <ShiftInformation key={shift.id} shift={shift} />
          ))}
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}

function UserInformation({
  user,
  total,
  opened,
  shifts,
}: {
  user: User
  total?: string
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
      <Grid.Col span={1.4} className={classes.infoItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.infoItem}>
        {total}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.infoItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.infoItem}>
        <Text className={classes.venueText}>{_venues}</Text>
      </Grid.Col>
    </Grid>
  )
}

function ShiftInformation({ shift }: { shift: Shift }) {
  const { venues } = useVenueStore()

  const total = useMemo(() => {
    if (!shift.end) {
      return
    }

    let totalMilliseconds = shift.end - shift.start
    if (shift.end < shift.start) {
      totalMilliseconds += 24 * ONE_HOUR
    }

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
      <Grid.Col span={1.4} className={classes.shiftItem}>
        {total ?? '-'}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftItem}>
        {total ?? '-'}
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.timeItem}>
        <TimeSelect
          value={shift.start}
          onChangeValue={(value) => store.changeCheckInTime(shift.userId, shift.id, value)}
        />
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.timeItem}>
        <TimeSelect
          value={shift.end}
          onChangeValue={(value) => store.changeCheckOutTime(shift.userId, shift.id, value)}
        />
      </Grid.Col>
      <Grid.Col span={1.4} className={classes.shiftItem}>
        -
      </Grid.Col>
      <Grid.Col span={2.5} className={classes.shiftItem}>
        <Text className={classes.venueText}>{venues.get(shift.venueId)?.name || '-'}</Text>
      </Grid.Col>
    </Grid>
  )
}
