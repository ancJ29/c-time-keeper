import { z } from 'zod'

export enum RequestAction {
  LOGIN = 'LOGIN',
  GET_ME = 'GET_ME',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  GET_USERS = 'GET_USERS',
  GET_USERS_BY_ADMIN = 'GET_USERS_BY_ADMIN',
  UPDATE_USER = 'UPDATE_USER',
  ADD_USER = 'ADD_USER',
  GET_CLIENTS = 'GET_CLIENTS',
  GET_ROLES = 'GET_ROLES',
  CHECK_IN_BY_SYSTEM = 'CHECK_IN_BY_SYSTEM',
  CHECK_IN_BY_USER = 'CHECK_IN_BY_USER',
  CHECK_OUT_BY_USER = 'CHECK_OUT_BY_USER',
  GET_SHIFTS = 'GET_SHIFTS',
  UPDATE_SHIFT = 'UPDATE_SHIFT',
  GET_VENUES = 'GET_VENUES',
  GET_VENUES_BY_ADMIN = 'GET_VENUES_BY_ADMIN',
  GET_SALARY = 'GET_SALARY',
  GET_SALARY_RULES = 'GET_SALARY_RULES',
  GET_VERSION = 'GET_VERSION',
}

export type DataRequest<A extends RequestAction, P, R> = {
  authOnly?: boolean
  guestOnly?: boolean
  request: z.ZodObject<{
    action: z.ZodLiteral<A>
    payload: z.ZodType<P>
  }>
  response: z.ZodType<R>
}

export type HandlerContext = {
  id: string
  clientId: string
}

export enum ClientRoles {
  OWNER = 'Owner',
  STAFF = 'Staff',
  CASHIER = 'Cashier',
}
