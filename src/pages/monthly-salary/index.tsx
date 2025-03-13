import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { getSalaries, Salary } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import useUserStore from '@/stores/user.store'
import { DateValue } from '@/types'
import { formatTime } from '@/utils'
import { useCallback, useMemo, useState } from 'react'
import { configs } from './_configs'
import MonthlySalaryView from './components/MonthlySalaryView'

export default function MonthlySalary() {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { users } = useUserStore()
  const { user } = useAuthStore()
  const [salaries, setSalaries] = useState<Salary[]>([])
  const [date, setDate] = useState<Date>(() => {
    const now = new Date()
    now.setUTCMonth(now.getUTCMonth() - 1)
    return now
  })

  const dataGridConfigs = useMemo(() => configs(t, users, roles), [roles, t, users])

  const getData = useCallback(
    async (_date?: Date) => {
      const formattedDate = formatTime(_date || date, 'MM-YYYY')
      const salaries = await getSalaries({ key: `${formattedDate}-${user?.clientId}` })
      salaries && setSalaries(salaries)
    },
    [date, user?.clientId],
  )
  useMount(getData)

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

  return (
    <MonthlySalaryView
      key={users.size}
      data={salaries}
      dataGridConfigs={dataGridConfigs}
      date={date}
      onChangeDate={handleChangeDate}
    />
  )
}
