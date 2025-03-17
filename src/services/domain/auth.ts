import {
  changePasswordSchema,
  getMeSchema,
  loginSchema,
  RequestAction,
  resetPasswordSchema,
} from '@/types'
import { z } from 'zod'
import callApi from '../api'

type LoginRequest = z.infer<typeof loginSchema.request>['payload']
export async function login(payload: LoginRequest) {
  return await callApi({
    action: RequestAction.LOGIN,
    payload,
    schema: loginSchema,
  })
}

export async function getMe() {
  return await callApi({
    action: RequestAction.GET_ME,
    schema: getMeSchema,
    log: true,
  })
}

type ChangePasswordRequest = z.infer<typeof changePasswordSchema.request>['payload']
export async function changePassword(payload: ChangePasswordRequest) {
  return await callApi({
    action: RequestAction.CHANGE_PASSWORD,
    payload,
    schema: changePasswordSchema,
  })
}

type ResetPasswordRequest = z.infer<typeof resetPasswordSchema.request>['payload']
export async function resetPassword(payload: ResetPasswordRequest) {
  return await callApi({
    action: RequestAction.RESET_PASSWORD,
    payload,
    schema: resetPasswordSchema,
  })
}
