import AutocompleteForFilterData from '@/components/c-time-keeper/AutocompleteForFilterData'
import ClearButton from '@/components/c-time-keeper/ClearButton'
import FilterWrapper from '@/components/c-time-keeper/FilterWrapper'
import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import { FilterComponentProps } from '../_configs'

const w: MantineWidth = { base: '100%', sm: '15vw' }

export default function Filter({
  condition,
  keyword,
  names,
  filtered,
  reset,
  reload,
  updateCondition,
  roleOptions,
}: FilterComponentProps) {
  const t = useTranslation()

  return (
    <FilterWrapper>
      <AutocompleteForFilterData
        key={keyword}
        label={t('Name')}
        w={w}
        data={names}
        defaultValue={keyword}
        onReload={reload}
      />
      <Select
        value={condition?.roleId}
        label={t('Role')}
        w={w}
        options={roleOptions}
        onChange={(value) => updateCondition('roleId', value)}
      />
      <ClearButton onClick={reset} disabled={!filtered} />
    </FilterWrapper>
  )
}
