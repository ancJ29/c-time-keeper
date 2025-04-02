import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { DataGridColumnProps, DataGridProps, GenericObject } from '@/types'
import { Box, Flex, Pagination, Stack, Text, UnstyledButton } from '@mantine/core'
import { IconArrowDown, IconArrowUp, IconSelector } from '@tabler/icons-react'
import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { limitOptions } from '../_configs'
import EmptyBox from '../EmptyBox'
import classes from './Laptop.module.scss'

export default function Laptop<T extends GenericObject>({
  limit: _limit = 10,
  page: _page = 1,
  className,
  noResultText,
  columns,
  data,
  onChangePage,
  onSort,
  onRowClick,
  isPaginated = false,
  hasOrderColumn = false,
}: DataGridProps<T>) {
  const [configs, setConfig] = useState(columns)
  const [rows, setRows] = useState<T[]>(data || [])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(_limit)
  const lastPage = useMemo(
    () => (isPaginated ? Math.ceil(rows.length / limit) : 0),
    [limit, rows.length, isPaginated],
  )

  const sort = useCallback(() => {
    const column = configs.find((el) => el.sorting)
    if (!column) {
      return
    }
    setRows(
      rows.sort((a, b) => {
        let _a = '',
          _b = ''
        if (column.sortValue) {
          _a = column.sortValue(a)
          _b = column.sortValue(b)
        } else {
          if (column.key in a) {
            _a = a[column.key]?.toString() || ''
          }
          if (column.key in b) {
            _b = b[column.key]?.toString() || ''
          }
        }
        return column.sorting === 'asc' ? _a.localeCompare(_b) : _b.localeCompare(_a)
      }),
    )
  }, [configs, rows])

  const sortHandler = useCallback(
    (column: DataGridColumnProps) => {
      if (column.sortable) {
        if (onSort) {
          onSort(column)
        } else {
          setConfig(
            configs.map((el) => {
              if (el.key !== column.key) {
                el.sorting = undefined
              } else {
                if (el.sorting === 'asc') {
                  el.sorting = 'desc'
                } else {
                  el.sorting = 'asc'
                }
              }
              return el
            }),
          )
          sort()
        }
      }
    },
    [configs, onSort, sort],
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
      configs.filter((el) => !el.hidden),
      {
        noResultText,
        orderFrom: from,
        hasOrderColumn,
        onSort: sortHandler,
        onRowClick,
      },
    )
  }, [
    onRowClick,
    configs,
    noResultText,
    hasOrderColumn,
    isPaginated,
    limit,
    page,
    rows,
    sortHandler,
  ])

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
    <Stack visibleFrom="sm" w="100%" p={0} gap={10}>
      {Boolean(rows.length) && isPaginated && (
        <Flex justify="end" align="center" mx={5} gap={5}>
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
      <Stack gap={0} w="100%" className={className}>
        {Content}
      </Stack>
    </Stack>
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
  const t = useTranslation()
  return (
    <Flex justify="space-between" w="100%" align="center" mx={5} gap={5}>
      <Flex align="center" gap={5}>
        <Text c="primary" fw="600" mr={5}>
          {t('Item per page')}:
        </Text>
        <Select
          w={76}
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
      {lastPage > 1 && <Pagination value={page} total={lastPage} onChange={setPage} />}
    </Flex>
  )
}

function _contentBuilder<T extends GenericObject>(
  rows: T[],
  columns: DataGridColumnProps[],
  {
    orderFrom = 0,
    noResultText,
    hasOrderColumn = false,
    onSort,
    onRowClick,
  }: {
    orderFrom?: number
    noResultText?: string
    hasOrderColumn?: boolean
    onSort?: (column: DataGridColumnProps) => void
    onRowClick?: (row: T) => void
  } = {},
) {
  return (
    <>
      <Headers onSort={onSort} hasOrderColumn={hasOrderColumn} columns={columns} />
      {rows.length > 0 && (
        <div className={classes.body}>
          {rows.map((row, idx) => (
            <Flex key={idx} onClick={onRowClick?.bind(null, row)} className={classes.row}>
              <OrderCell hasOrderColumn={hasOrderColumn} index={orderFrom + idx} />
              {columns?.map((column) => <Cell key={column.key} row={row} column={column} />)}
            </Flex>
          ))}
        </div>
      )}
      {rows.length === 0 && <EmptyBox noResultText={noResultText} />}
    </>
  )
}

function Headers({
  columns,
  hasOrderColumn,
  onSort = () => {},
}: {
  hasOrderColumn: boolean
  columns: DataGridColumnProps[]
  onSort?: (column: DataGridColumnProps) => void
}) {
  return (
    <div className={classes.header}>
      {hasOrderColumn && <OrderHeader />}
      {columns?.map((column, idx) => {
        return <HeaderItem key={idx} column={column} onSort={onSort} />
      })}
    </div>
  )
}

function OrderHeader() {
  return (
    <Box ta="left" w={50}>
      #
    </Box>
  )
}

function sortIcon(sorting: false | 'asc' | 'desc') {
  if (sorting === 'asc') {
    return IconArrowUp
  }
  if (sorting === 'desc') {
    return IconArrowDown
  }
  return IconSelector
}

function HeaderItem({
  column,
  onSort,
}: {
  column: DataGridColumnProps
  onSort: (column: DataGridColumnProps) => void
}) {
  const Icon = column.sortable ? sortIcon(column.sorting || false) : 'div'
  return (
    <Box
      className={clsx(classes.headerCell, column.headerClassName || column.className)}
      w={column.width}
      style={column.headerStyle || column.style}
      hidden={column.hidden}
      ta={typeof column.textAlign === 'object' ? column.textAlign.header : column.textAlign}
    >
      {column.sortable ? (
        <Flex gap={4} justify="start" align="center" w="100%">
          {column.header || ''}
          {column.sortable && (
            <UnstyledButton onClick={() => onSort(column)} mt={4}>
              <Icon width={15} height={15} />
            </UnstyledButton>
          )}
        </Flex>
      ) : (
        column.header || ''
      )}
    </Box>
  )
}

function OrderCell({ hasOrderColumn, index }: { hasOrderColumn: boolean; index: number }) {
  return hasOrderColumn ? (
    <Box key={`no.${index}`} ta="left" w={50} className={classes.cell} p={0}>
      {index + 1}
    </Box>
  ) : (
    <></>
  )
}

function Cell<T extends GenericObject>({ column, row }: { row: T; column: DataGridColumnProps }) {
  return (
    <Box
      w={column.width}
      className={clsx(classes.cell, column.cellClassName || column.className)}
      style={column.cellStyle || column.style}
      hidden={column.hidden}
      ta={typeof column.textAlign === 'object' ? column.textAlign.cell : column.textAlign}
    >
      {_render(row, column)}
    </Box>
  )
}

function _render(row: GenericObject, column: DataGridColumnProps) {
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
