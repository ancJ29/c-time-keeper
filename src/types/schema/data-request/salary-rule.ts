import { z } from 'zod'
import { getSchema, listResponse, nullishNumberSchema, numberSchema, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getSalaryRulesSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_SALARY_RULES),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      standardHours: nullishNumberSchema,
      hourlyPay: numberSchema,
      overtimePay: nullishNumberSchema,
      clientId: stringSchema,
    }),
  ),
})
