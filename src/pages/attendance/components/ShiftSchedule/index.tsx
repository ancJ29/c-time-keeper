import { Accordion, Stack } from '@mantine/core'
import { useState, useSyncExternalStore } from 'react'
import store from '../../_shift.store'
import Header from './Header'
import Item from './Item'
import classes from './ShiftSchedule.module.scss'

export default function ShiftSchedule() {
  const { updates, userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const [value, setValue] = useState<string | null>(null)

  return (
    <Stack gap={0}>
      <Header />
      <Accordion
        variant="contained"
        radius={0}
        chevronPosition="left"
        transitionDuration={300}
        classNames={classes}
        value={value}
        onChange={setValue}
      >
        {Object.keys(updates).map((userId) => (
          <Item key={userId} user={userById[userId]} shifts={updates[userId]} selectValue={value} />
        ))}
      </Accordion>
    </Stack>
  )
}
