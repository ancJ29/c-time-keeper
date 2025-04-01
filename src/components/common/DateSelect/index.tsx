import useTranslation from '@/hooks/useTranslation'
import { DatesRangeValue, DateValue } from '@/types'
import {
  formatTime,
  isSameDate,
  lastMonth,
  lastWeek,
  thisMonth,
  thisWeek,
  today,
  yesterday,
} from '@/utils'
import {
  Box,
  BoxProps,
  Card,
  CheckIcon,
  Combobox,
  Flex,
  Input,
  InputBase,
  useCombobox,
} from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { IconChevronDown } from '@tabler/icons-react'
import { useCallback, useMemo, useState } from 'react'
import classes from './DateSelect.module.scss'

interface DateSelectProps extends BoxProps {
  label?: string
  dateValue: [DateValue, DateValue]
  onChangeDateValue?: (value: DatesRangeValue) => void
}

export default function DateSelect({
  label,
  dateValue,
  onChangeDateValue,
  ...props
}: DateSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  })
  const t = useTranslation()
  const [opened, setOpened] = useState(true)

  const definedRanges: Record<DateRangeOption, [DateValue, DateValue]> = useMemo(() => {
    const now = new Date()
    return {
      [DateRangeOption.Today]: today(now),
      [DateRangeOption.Yesterday]: yesterday(now),
      [DateRangeOption.ThisWeek]: thisWeek(now),
      [DateRangeOption.LastWeek]: lastWeek(now),
      [DateRangeOption.ThisMonth]: thisMonth(now),
      [DateRangeOption.LastMonth]: lastMonth(now),
      [DateRangeOption.Custom]: [null, null],
    }
  }, [])

  const value = useMemo(() => {
    for (const key of Object.keys(definedRanges)) {
      const [start, end] = definedRanges[key as DateRangeOption]
      if (isSameDate(dateValue[0], start) && isSameDate(dateValue[1], end)) {
        setOpened(key === DateRangeOption.Custom)
        return key
      }
    }
    return DateRangeOption.Custom
  }, [dateValue, definedRanges])

  const onChange = useCallback(
    (value: string | null) => {
      if (value === DateRangeOption.Custom) {
        setOpened(true)
        return
      }
      if (value && value in definedRanges) {
        const [startDate, endDate] = definedRanges[value as DateRangeOption]
        if (startDate && endDate && onChangeDateValue) {
          onChangeDateValue([startDate, endDate])
        }
      }
    },
    [definedRanges, onChangeDateValue],
  )

  const onChangeDate = useCallback(
    (value: DatesRangeValue) => {
      const startDate = value[0]
      const endDate = value[1]
      if (!startDate || !endDate) {
        return
      }
      onChangeDateValue?.([startDate, endDate])
      setOpened(false)
    },
    [onChangeDateValue],
  )

  const options = Object.values(DateRangeOption).map((item) => (
    <Combobox.Option value={item} key={item} active={item === value}>
      <Flex gap="xs" justify="space-between" align="center">
        <span>{t(item)}</span>
        {item === value && <CheckIcon size={12} color="#999999" />}
      </Flex>
    </Combobox.Option>
  ))

  return (
    <Box className={classes.container} {...props}>
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(value) => {
          onChange(value)
          combobox.closeDropdown()
        }}
      >
        <Combobox.Target>
          <InputBase
            label={label}
            component="button"
            type="button"
            pointer
            rightSection={<IconChevronDown size={16} />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
          >
            <Input.Placeholder c="black">
              {value === DateRangeOption.Custom
                ? `${formatTime(dateValue[0], 'DD/MM/YYYY')} - ${formatTime(dateValue[1], 'DD/MM/YYYY')}`
                : t(value)}
            </Input.Placeholder>
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>{options}</Combobox.Dropdown>
      </Combobox>

      {opened && (
        <Card shadow="md" withBorder radius="md" className={classes.card}>
          <DatePicker
            type="range"
            defaultValue={dateValue}
            onChange={onChangeDate}
            allowSingleDateInRange
          />
        </Card>
      )}
    </Box>
  )
}

enum DateRangeOption {
  Today = 'Today',
  Yesterday = 'Yesterday',
  ThisWeek = 'This week',
  LastWeek = 'Last week',
  ThisMonth = 'This month',
  LastMonth = 'Last month',
  Custom = 'Custom',
}
