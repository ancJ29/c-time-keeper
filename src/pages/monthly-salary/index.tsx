import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { getSalaries, Salary } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import useUserStore from '@/stores/user.store'
import { formatTime } from '@/utils'
import { useMemo, useState } from 'react'
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

  const getData = async () => {
    const salaries = await getSalaries({ key: `${formatTime(date, 'MM-YYYY')}-${user?.clientId}` })
    salaries && setSalaries(salaries)
  }
  useMount(getData)

  return <MonthlySalaryView key={users.size} data={salaries} dataGridConfigs={dataGridConfigs} />
}
