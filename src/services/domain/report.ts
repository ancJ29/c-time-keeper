import { getSalarySchema, RequestAction } from '@/types'
import { z } from 'zod'
import callApi from '../api'

type GetSalaryRequest = z.infer<typeof getSalarySchema.request>['payload']
export type Salary = z.infer<typeof getSalarySchema.response>[0]
export async function getSalaries(payload: GetSalaryRequest) {
  return await callApi({
    action: RequestAction.GET_SALARY,
    payload,
    schema: getSalarySchema,
  })
}
