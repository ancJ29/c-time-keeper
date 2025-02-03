import { z } from 'zod'
import { booleanSchema, getSchema, listResponse, nullishStringSchema, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getUsersSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_USERS),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      email: stringSchema,
      roleId: stringSchema,
      bankName: nullishStringSchema,
      bankAccount: nullishStringSchema,
      salaryRuleId: stringSchema,
    }),
  ),
})

export const updateUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.UPDATE_USER),
  payload: z.object({
    id: stringSchema,
    name: stringSchema,
    email: stringSchema,
    roleId: stringSchema,
    bankName: nullishStringSchema,
    bankAccount: nullishStringSchema,
    salaryRuleId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const addUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.ADD_USER),
  payload: z.object({
    name: stringSchema,
    email: stringSchema,
    password: stringSchema,
    roleId: stringSchema,
    bankName: nullishStringSchema,
    bankAccount: nullishStringSchema,
    salaryRuleId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
