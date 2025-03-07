import { Stack } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../../../_shift.store'
import Item from './Item'

export default function Mobile() {
  const { updates, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack gap={10} hiddenFrom="sm">
      {Object.keys(updates).map((userId) => (
        <Item key={userId} user={userById[userId]} shifts={updates[userId]} />
      ))}
    </Stack>
  )
}
