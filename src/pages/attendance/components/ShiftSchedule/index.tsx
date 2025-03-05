import { Stack } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../../_shift.store'
import Header from './Header'
import Item from './Item'

export default function ShiftSchedule() {
  const { updates, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack gap={0}>
      <Header />
      {Object.keys(updates).map((userId) => (
        <Item key={userId} user={userById[userId]} shifts={updates[userId]} />
      ))}
    </Stack>
  )
}
