import { RequestAction } from '@/types'
import { getSalaryRulesSchema } from '@/types/schema/data-request/salary-rule'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type SalaryRule = z.infer<typeof getSalaryRulesSchema.response>['data'][0]
export async function getAllSalaryRules() {
  return await loadAll({
    action: RequestAction.GET_SALARY_RULES,
    schema: getSalaryRulesSchema,
  })
}
