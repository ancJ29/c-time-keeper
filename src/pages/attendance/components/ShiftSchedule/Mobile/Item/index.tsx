import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import { Shift, User } from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { formatDuration, formatTime } from '@/utils'
import { Card, Collapse, Flex, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronDown } from '@tabler/icons-react'
import { ReactNode, useCallback, useMemo } from 'react'
import classes from './Item.module.scss'

type ItemProps = {
  user?: User
  shifts: Shift[]
}

export default function Item({ user, shifts }: ItemProps) {
  const [opened, { toggle }] = useDisclosure(false)

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      toggle()
    },
    [toggle],
  )

  const total = useMemo(() => {
    const totalMilliseconds = shifts.reduce((acc, shift) => acc + (shift.end - shift.start), 0)
    return formatDuration(totalMilliseconds)
  }, [shifts])

  if (!user) {
    return <></>
  }

  return (
    <Card shadow="md" withBorder p={12} radius={8} onClick={handleClick}>
      <UserInformation user={user} total={total} />
      <Wrapper isShown={shifts.length > 0} opened={opened}>
        {shifts.map((shift) => (
          <ShiftInformation key={shift.id} shift={shift} />
        ))}
      </Wrapper>
    </Card>
  )
}

function UserInformation({ user, total }: { user: User; total: string }) {
  const { roles } = useRoleStore()
  const t = useTranslation()

  return (
    <Stack gap={0}>
      <Flex gap={5} w="fit-content" align="center" mb={10}>
        <Avatar size={44} />
        <Stack gap={0}>
          <Text fw={600}>{user?.name || ''}</Text>
          <Text c="dimmed" fz={10}>
            {t(roles.get(user?.roleId || '')?.name || '')}
          </Text>
        </Stack>
      </Flex>
      <DataRow title={t('Worked')} content={total} />
      <DataRow title={t('Total')} content={total} />
    </Stack>
  )
}

function DataRow({ title, content }: { title: string | ReactNode; content: string | ReactNode }) {
  return (
    <Flex w="100%" justify="space-between" align="center" gap={5} px={0} py={2}>
      <Text fw="bold" miw="40%" maw="50%">
        {title}
      </Text>
      <Flex ta="end">{content}</Flex>
    </Flex>
  )
}

function Wrapper({
  children,
  isShown,
  opened,
}: {
  children: ReactNode
  isShown: boolean
  opened: boolean
}) {
  if (!isShown) {
    return <></>
  }

  return (
    <Flex w="100%" direction={opened ? 'column-reverse' : 'column'}>
      <Group justify="center" w="100%">
        <IconChevronDown
          size={18}
          stroke={2}
          style={{
            transform: opened ? 'rotate(180deg)' : 'none',
            transition: 'transform 300ms ease',
          }}
        />
      </Group>
      <Collapse transitionDuration={300} transitionTimingFunction="linear" in={opened}>
        {children}
      </Collapse>
    </Flex>
  )
}

function ShiftInformation({ shift }: { shift: Shift }) {
  const { venues } = useVenueStore()
  const t = useTranslation()

  const total = useMemo(() => {
    const totalMilliseconds = shift.end - shift.start
    return formatDuration(totalMilliseconds)
  }, [shift])

  return (
    <Stack className={classes.shiftContainer}>
      <DataRow title={t('Date')} content={formatTime(shift.start, 'ddd DD/MM/YYYY')} />
      <DataRow title={t('Clock in')} content={formatTime(shift.start, 'HH:mm')} />
      <DataRow title={t('Clock out')} content={formatTime(shift.end, 'HH:mm')} />
      <DataRow title={t('Break')} content={''} />
      <DataRow title={t('Worked')} content={total} />
      <DataRow title={t('Total')} content={total} />
      <DataRow title={t('Venue')} content={venues.get(shift.venueId)?.name} />
    </Stack>
  )
}
