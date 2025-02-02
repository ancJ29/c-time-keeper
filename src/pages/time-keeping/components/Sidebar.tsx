import { Checkbox, Stack } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../_shift.store'
import SelectAllCheckbox from './SelectAllCheckbox'

export default function Sidebar() {
  const { selectedUserIds, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack w={220} gap={4} mt={4} mb={10}>
      <SelectAllCheckbox />
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
