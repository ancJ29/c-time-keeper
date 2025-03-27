import { z } from 'zod'
import {
  booleanSchema,
  getSchema,
  listResponse,
  nullishBooleanSchema,
  nullishNumberSchema,
  nullishStringSchema,
  optionalStringSchema,
  stringSchema,
} from '../base'
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
      username: stringSchema,
      email: stringSchema,
      avatar: nullishStringSchema,
      roleId: stringSchema,
      salaryRuleId: nullishStringSchema,
      clientId: stringSchema,
      baseSalary: nullishNumberSchema,
      enabled: nullishBooleanSchema,
    }),
  ),
})

export const getUsersByAdminSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_USERS_BY_ADMIN),
  payload: getSchema.extend({
    clientId: optionalStringSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      username: stringSchema,
      email: stringSchema,
      avatar: nullishStringSchema,
      salaryRuleId: nullishStringSchema,
      clientId: stringSchema,
      role: z.object({
        id: stringSchema,
        name: stringSchema,
      }),
    }),
  ),
})

export const updateUserSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.UPDATE_USER),
  payload: z.object({
    id: stringSchema,
    name: stringSchema,
    username: stringSchema,
    email: stringSchema,
    avatar: nullishStringSchema,
    roleId: stringSchema,
    salaryRuleId: nullishStringSchema,
    clientId: stringSchema,
    baseSalary: nullishNumberSchema,
    enabled: booleanSchema,
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
    username: stringSchema,
    email: stringSchema,
    password: stringSchema,
    avatar: nullishStringSchema,
    roleId: stringSchema,
    salaryRuleId: nullishStringSchema,
    baseSalary: nullishNumberSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
