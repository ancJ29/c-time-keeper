import useFilterData from '@/hooks/useFilterData'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { getSalaries, Salary } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useUserStore from '@/stores/user.store'
import { DateValue } from '@/types'
import { exportToMonthlySalaryExcel, formatTime } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import { configs } from './_configs'
import MonthlySalaryView from './components/MonthlySalaryView'

export default function MonthlySalary() {
  const t = useTranslation()
  const { users } = useUserStore()
  const { user } = useAuthStore()
  const [salaries, setSalaries] = useState<Salary[]>([])
  const [date, setDate] = useState<Date>(() => {
    const now = new Date()
    now.setMonth(now.getMonth() - 1)
    return now
  })

  const dataGridConfigs = useMemo(() => configs(t, users), [t, users])

  const getData = useCallback(
    async (_date?: Date) => {
      const formattedDate = formatTime(_date || date, 'MM-YYYY')
      const salaries = await getSalaries({ key: `${formattedDate}-${user?.clientId}` })
      salaries && setSalaries(salaries)
    },
    [date, user?.clientId],
  )
  useMount(getData)

  const dataLoader = useCallback(() => {
    return salaries
  }, [salaries])

  const { data, page, setPage } = useFilterData<Salary>({
    dataLoader,
  })

  const handleChangeDate = useCallback(
    async (date: DateValue) => {
      if (!date) {
        return
      }
      setDate(date)
      await getData(date)
    },
    [getData],
  )

  const handleExportExcel = useCallback(() => {
    exportToMonthlySalaryExcel(salaries, date, users)
  }, [date, salaries, users])

  return (
    <MonthlySalaryView
      key={users.size}
      data={data}
      dataGridConfigs={dataGridConfigs}
      date={date}
      onChangeDate={handleChangeDate}
      page={page}
      setPage={setPage}
      onExportExcel={handleExportExcel}
    />
  )
}
