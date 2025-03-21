import Avatar from '@/components/common/Avatar'
import { User } from '@/services/domain'
import { Card, Grid, Text } from '@mantine/core'
import classes from './WorkEntryForm.module.scss'

type WorkEntryFormProps = {
  onClick: (userId: string) => void
  users: Record<string, User>
}

export default function WorkEntryForm({ onClick, users }: WorkEntryFormProps) {
  return (
    <Grid gutter="sm">
      {Object.values(users).map((user) => (
        <Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }} className={classes.item}>
          <Card shadow="md" withBorder className={classes.card} onClick={() => onClick(user.id)}>
            <Avatar size={70} src={user.avatar} />
            <Text fz={50} fw={400}>
              {user.name}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}
