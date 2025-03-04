import AutocompleteForFilterData from '@/components/c-time-keeper/AutocompleteForFilterData'
import FilterWrapper from '@/components/c-time-keeper/FilterWrapper'
import DateRangePicker from '@/components/common/DateRangePicker'
import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { DatesRangeValue, MantineWidth, OptionProps } from '@/types'
import { useCallback, useSyncExternalStore } from 'react'
import store from '../../_shift.store'

const w: MantineWidth = { base: '100%', sm: '15vw' }

export type FilterProps = {
  roleOptions: OptionProps[]
  venueOptions: OptionProps[]
}

export default function Filter({ roleOptions, venueOptions }: FilterProps) {
  const t = useTranslation()
  const { startDate, endDate, roleId, venueId, userById, name } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  )

  const onChangeDate = useCallback((value: DatesRangeValue) => {
    store.changeDate(value)
  }, [])

  return (
    <FilterWrapper>
      <AutocompleteForFilterData
        key={name}
        label={t('Name')}
        w={w}
        data={Object.values(userById).map((user) => user.name)}
        defaultValue={name}
        onReload={store.changeName}
      />
      <Select
        value={roleId}
        label={t('Role')}
        w={w}
        options={roleOptions}
        onChange={store.changeRoleId}
      />
      <Select
        value={venueId}
        label={t('Venue')}
        w={w}
        options={venueOptions}
        onChange={store.changeVenueId}
      />
      <DateRangePicker
        label={t('Date')}
        w={w}
        defaultValue={[startDate, endDate]}
        onChange={onChangeDate}
      />
    </FilterWrapper>
  )
}
