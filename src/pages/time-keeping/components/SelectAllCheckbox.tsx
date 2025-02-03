import useTranslation from '@/hooks/useTranslation'
import { Checkbox } from '@mantine/core'
import { useCallback, useSyncExternalStore } from 'react'
import store from '../_shift.store'

export default function SelectAllCheckbox() {
  const { isSelectedAllUsers } = useSyncExternalStore(store.subscribe, store.getSnapshot)
  const t = useTranslation()

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    store.setIsSelectedAllUsers(event.currentTarget.checked)
  }, [])

  return (
    <Checkbox
      label={t('Select all')}
      checked={isSelectedAllUsers}
      onChange={onChange}
      fw="bold"
      pb={8}
    />
  )
}
