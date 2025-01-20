import { z } from 'zod'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'
import { numberSchema, stringSchema } from '../base'

export const getSalarySchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_SALARY),
  payload: z.object({
    key: stringSchema,
  }),
  response: z
    .object({
      userId: stringSchema,
      standardHours: numberSchema,
      overtimeHours: numberSchema,
      totalSalary: numberSchema,
    })
    .array(),
})
