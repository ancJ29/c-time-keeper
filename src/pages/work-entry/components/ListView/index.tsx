import AutocompleteForFilterData from '@/components/c-time-keeper/AutocompleteForFilterData'
import { OptionProps } from '@/types'
import { unique } from '@/utils'
import { Box, Card, Flex, Stack, Text } from '@mantine/core'
import { useCallback, useState } from 'react'
import classes from './ListView.module.scss'

type ListViewProps = {
  value: string
  onChangeValue: (value: string) => void
  options: OptionProps[]
}

export default function ListView({ value, onChangeValue, options }: ListViewProps) {
  const [keyword, setKeyword] = useState<string | undefined>('')
  const [data, setData] = useState(options)

  const reload = useCallback(
    (keyword?: string) => {
      setKeyword(keyword)
      setData(
        options.filter((el) => el.label.toLowerCase().includes((keyword || '').toLowerCase())),
      )
    },
    [options],
  )

  return (
    <Stack gap={10} w={{ base: '90vw', sm: '40vw', md: '30vw' }}>
      <AutocompleteForFilterData
        key={keyword}
        defaultValue={keyword}
        data={unique(options.map((el) => el.label))}
        onReload={reload}
        size="lg"
      />
      <Card shadow="md" withBorder className={classes.card}>
        <Box className={classes.box}>
          {data.map((option, idx) => (
            <Flex
              key={idx}
              className={`${classes.item} ${value === option.value ? classes.selected : ''}`}
              onClick={() => onChangeValue(option.value.toString())}
            >
              <Text fz={20}>{option.label}</Text>
            </Flex>
          ))}
        </Box>
      </Card>
    </Stack>
  )
}
