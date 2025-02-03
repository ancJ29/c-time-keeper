import { z } from 'zod'
import { changePasswordSchema, getMeSchema, loginSchema, resetPasswordSchema } from './auth'
import { getClientsSchema } from './client'
import { getVersionSchema } from './metadata'
import { getSalarySchema } from './report'
import { getRolesSchema } from './role'
import { getSalaryRulesSchema } from './salary-rule'
import {
  checkInBySystemSchema,
  checkInByUserSchema,
  checkOutByUserSchema,
  getShiftsSchema,
} from './shift'
import { addUserSchema, getUsersSchema, updateUserSchema } from './user'
import { getVenuesSchema } from './venue'

export * from './auth'
export * from './client'
export * from './metadata'
export * from './report'
export * from './role'
export * from './salary-rule'
export * from './shift'
export * from './user'
export * from './venue'

export const requestSchema = z.union([
  loginSchema.request,
  getMeSchema.request,
  changePasswordSchema.request,
  resetPasswordSchema.request,
  getUsersSchema.request,
  updateUserSchema.request,
  addUserSchema.request,
  getClientsSchema.request,
  getRolesSchema.request,
  checkInBySystemSchema.request,
  checkInByUserSchema.request,
  checkOutByUserSchema.request,
  getShiftsSchema.request,
  getVenuesSchema.request,
  getSalarySchema.request,
  getSalaryRulesSchema.request,
  getVersionSchema.request,
])

export const responseSchema = z.union([
  loginSchema.response,
  getMeSchema.response,
  changePasswordSchema.response,
  resetPasswordSchema.response,
  getUsersSchema.response,
  updateUserSchema.response,
  addUserSchema.response,
  getClientsSchema.response,
  getRolesSchema.response,
  checkInBySystemSchema.response,
  checkInByUserSchema.response,
  checkOutByUserSchema.response,
  getShiftsSchema.response,
  getVenuesSchema.response,
  getSalarySchema.response,
  getSalaryRulesSchema.response,
  getVersionSchema.response,
])
