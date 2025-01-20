import { getAllSalaryRules, SalaryRule } from '@/services/domain'
import { create } from 'zustand'

type SalaryRuleStore = {
  salaryRules: Map<string, SalaryRule>
  set: (salaryRules: SalaryRule[]) => void
  load: () => Promise<void>
}

export default create<SalaryRuleStore>((set, get) => ({
  salaryRules: new Map(),
  set: (salaryRules: SalaryRule[]) =>
    set(() => ({
      salaryRules: new Map(salaryRules.map((e) => [e.id, e])),
    })),
  load: async () => {
    if (localStorage.__SALARY_RULES__) {
      const salaryRules = JSON.parse(localStorage.__SALARY_RULES__)
      if (salaryRules.length > 0) {
        get().set(salaryRules)
        return
      }
    }
    const data = await getAllSalaryRules()
    localStorage.__SALARY_RULES__ = JSON.stringify(data)
    get().set(data)
  },
}))
