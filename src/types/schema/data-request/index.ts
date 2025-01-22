import { z } from 'zod'
import { changePasswordSchema, getMeSchema, loginSchema, resetPasswordSchema } from './auth'
import { addUserSchema, getUsersSchema, updateUserSchema } from './user'
import { getClientsSchema } from './client'
import { getRolesSchema } from './role'
import {
  checkInBySystemSchema,
  checkInByUserSchema,
  checkOutByUserSchema,
  getShiftsSchema,
} from './shift'
import { getVenuesSchema } from './venue'
import { getSalarySchema } from './report'
import { getSalaryRulesSchema } from './salary-rule'
import { getVersionSchema } from './metadata'

export * from './auth'
export * from './user'
export * from './client'
export * from './role'
export * from './shift'
export * from './venue'
export * from './report'
export * from './salary-rule'
export * from './metadata'

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
