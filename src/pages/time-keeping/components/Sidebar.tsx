import { Checkbox, Stack } from '@mantine/core'
import store from '../_shift.store'
import { useSyncExternalStore } from 'react'
import useTranslation from '@/hooks/useTranslation'

export default function Sidebar() {
  const t = useTranslation()
  const { selectedUserIds, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Stack w={220} p={5}>
      <Checkbox.Group
        label={t('Users')}
        value={selectedUserIds}
        onChange={store.setSelectedUserIds}
      >
        <Stack gap={8} mt={10}>
          {Array.from(Object.keys(userById)).map((userId) => (
            <Checkbox key={userId} value={userId} label={userById[userId]?.name} />
          ))}
        </Stack>
      </Checkbox.Group>
    </Stack>
  )
}
