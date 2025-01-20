import { z } from 'zod'
import { _typeBuilder } from './type-builder'
import { RequestAction } from '../request'
import { getSchema, listResponse, numberSchema, nullishNumberSchema, stringSchema } from '../base'

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
