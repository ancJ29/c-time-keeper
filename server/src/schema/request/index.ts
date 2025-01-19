import { z } from 'zod'

export enum RequestAction {
  LOGIN = 'LOGIN',
  GET_ME = 'GET_ME',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  RESET_PASSWORD = 'RESET_PASSWORD',
  GET_USERS = 'GET_USERS',
  UPDATE_USER = 'UPDATE_USER',
  ADD_USER = 'ADD_USER',
  GET_CLIENTS = 'GET_CLIENTS',
  GET_ROLES = 'GET_ROLES',
  CHECK_IN_BY_SYSTEM = 'CHECK_IN_BY_SYSTEM',
  CHECK_IN_BY_USER = 'CHECK_IN_BY_USER',
  CHECK_OUT_BY_USER = 'CHECK_OUT_BY_USER',
  GET_SHIFTS = 'GET_SHIFTS',
  GET_VENUES = 'GET_VENUES',
  GET_SALARY = 'GET_SALARY',
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
}
