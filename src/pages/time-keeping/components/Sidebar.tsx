import { Checkbox, Stack } from '@mantine/core'
import store from '../_shift.store'
import { useSyncExternalStore } from 'react'
import Label from './Label'

export default function Sidebar() {
  const { selectedUserIds, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack w={220} gap={4} mt={4}>
      <Label />
      <Checkbox.Group value={selectedUserIds} onChange={store.setSelectedUserIds}>
        <Stack gap={8} mt={4}>
          {Array.from(Object.keys(userById)).map((userId) => (
            <Checkbox key={userId} value={userId} label={userById[userId]?.name} />
          ))}
        </Stack>
      </Checkbox.Group>
    </Stack>
  )
}
