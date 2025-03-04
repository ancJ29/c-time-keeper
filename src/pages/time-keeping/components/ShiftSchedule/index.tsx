import { Stack } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../../_shift.store'
import Header from './Header'
import Item from './Item'

export default function ShiftSchedule() {
  const { shiftsByUserId, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack gap={0}>
      <Header />
      {Object.keys(shiftsByUserId).map((userId) => (
        <Item key={userId} user={userById[userId]} shifts={shiftsByUserId[userId]} />
      ))}
    </Stack>
  )
}
