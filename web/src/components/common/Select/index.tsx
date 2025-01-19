import { OptionProps } from '@/types'
import { Select as MantineSelect, SelectProps as MantineSelectProps } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useMemo } from 'react'

interface SelectProps extends MantineSelectProps {
  options: OptionProps[]
}

export default function Select({ options, ...props }: SelectProps) {
  const data = useMemo(() => {
    return options?.map(({ value, label }, idx) => ({
      value: value.toString(),
      label,
      isLastOption: idx === options?.length - 1,
    }))
  }, [options])

  return (
    <MantineSelect
      data={data}
      disabled={props.disabled ?? (data?.length || 0) < 1}
      checkIconPosition="right"
      rightSection={<IconChevronDown size={16} />}
      {...props}
    />
  )
}
