import Select from '@/components/common/Select'
import { DataGridColumnProps, DataGridProps, GenericObject } from '@/types'
import { Card, Flex, MantineStyleProp, Pagination, Text } from '@mantine/core'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { limitOptions } from '../_configs'
import EmptyBox from '../EmptyBox'

export default function Mobile<T extends GenericObject>({
  limit: _limit = 5,
  page: _page = 1,
  isPaginated = false,
  columns,
  data,
  noResultText,
  onChangePage,
  onRowClick,
}: DataGridProps<T>) {
  const [rows, setRows] = useState<T[]>(data || [])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(_limit)
  const lastPage = useMemo(
    () => (isPaginated ? Math.ceil(rows.length / limit) : 0),
    [limit, rows.length, isPaginated],
  )

  const Content = useMemo(() => {
    let data = rows
    let from = 0
    if (isPaginated) {
      from = limit * (page - 1)
      data = rows.slice(from, from + limit)
    }
    return _contentBuilder(
      data,
      columns.filter((el) => !el.hidden),
      {
        noResultText,
        onRowClick,
      },
    )
  }, [rows, isPaginated, columns, noResultText, onRowClick, limit, page])

  useEffect(() => {
    setRows(data || [])
  }, [data])

  useEffect(() => {
    if (_limit !== limit) {
      setLimit(limit)
    }
  }, [_limit, limit])

  useEffect(() => {
    if (_page !== page) {
      setPage(_page)
    }
  }, [page, _page])

  return (
    <Flex direction="column" hiddenFrom="sm" gap={10} w="100%">
      {Boolean(rows.length) && isPaginated && (
        <Flex justify="end" align="center">
          <PaginationBar
            page={page}
            key={limit}
            limit={limit}
            setLimit={(limit) => {
              setLimit(limit)
              setPage(1)
            }}
            lastPage={lastPage}
            setPage={(page) => {
              onChangePage?.(page)
              setPage(page)
            }}
          />
        </Flex>
      )}
      {Content}
    </Flex>
  )
}

function PaginationBar({
  limit,
  page,
  lastPage,
  setPage,
  setLimit,
}: {
  page: number
  limit: number
  lastPage: number
  setLimit: (limit: number) => void
  setPage: (page: number) => void
}) {
  return (
    <Flex justify="space-between" w="100%" align="center" gap={5}>
      <Flex align="center" gap={5}>
        <Select
          w={70}
          value={limit.toString()}
          options={limitOptions}
          onChange={(value: string | null) => {
            if (!value || isNaN(parseInt(value))) {
              return
            }
            setLimit(parseInt(value))
          }}
        />
      </Flex>
      {lastPage > 1 && (
        <Pagination
          value={page}
          total={lastPage}
          onChange={setPage}
          withControls={false}
          siblings={1}
        />
      )}
    </Flex>
  )
}

function _contentBuilder<T extends GenericObject>(
  rows: T[],
  columns: DataGridColumnProps[],
  {
    noResultText,
    onRowClick,
  }: {
    noResultText?: string
    onRowClick?: (row: T) => void
  } = {},
) {
  if (!rows.length) {
    return <EmptyBox noResultText={noResultText} />
  }

  return (
    <Flex gap={10} direction="column" mb={10}>
      {rows.map((row, idx) => (
        <Card
          key={idx}
          shadow="md"
          withBorder
          onClick={onRowClick?.bind(null, row)}
          px={0}
          py={5}
          radius={8}
        >
          <Flex direction="column" gap={0}>
            {columns.map((column, idx) => (
              <RowContent key={idx} column={column} row={row} />
            ))}
          </Flex>
        </Card>
      ))}
    </Flex>
  )
}

function RowContent<T extends GenericObject>({
  column,
  row,
}: {
  column: DataGridColumnProps
  row: T
}) {
  return <DataRow key={column.key} title={column.header} content={_renderRowContent(row, column)} />
}

function _renderRowContent(row: GenericObject, column: DataGridColumnProps) {
  if (column.renderCell) {
    return column.renderCell(row[column.key], row)
  }
  if (column.key in row) {
    const value = row[column.key]
    if (typeof value === 'string') {
      return value
    }
    return '-'
  }
  return '-'
}

function DataRow({
  title,
  content,
  columnStyle,
}: {
  title: string | ReactNode
  content: string | ReactNode
  columnStyle?: MantineStyleProp
}) {
  return (
    <Flex w="100%" justify="space-between" align="start" gap={5} py={4} px={12}>
      <Text fw="bold" miw="40%" maw="50%">
        {title}
      </Text>
      <Flex ta="end" style={columnStyle}>
        {content}
      </Flex>
    </Flex>
  )
}
