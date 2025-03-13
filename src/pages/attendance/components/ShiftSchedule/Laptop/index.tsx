import useUserStore from '@/stores/user.store'
import { Accordion, Stack } from '@mantine/core'
import { useState, useSyncExternalStore } from 'react'
import store from '../../../_shift.store'
import Header from './Header'
import Item from './Item'
import classes from './Laptop.module.scss'

export default function Laptop() {
  const { users } = useUserStore()
  const { updates } = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const [value, setValue] = useState<string[]>(Array.from(users.keys()))

  return (
    <Stack gap={0} visibleFrom="sm">
      <Header />
      <Accordion
        variant="contained"
        radius={0}
        chevronPosition="left"
        transitionDuration={300}
        classNames={classes}
        value={value}
        onChange={setValue}
        multiple
      >
        {Object.keys(updates).map((userId) => (
          <Item
            key={userId}
            user={users.get(userId)}
            shifts={updates[userId]}
            selectedValue={value}
          />
        ))}
      </Accordion>
    </Stack>
  )
}
