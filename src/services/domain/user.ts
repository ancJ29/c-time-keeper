import { addUserSchema, getUsersSchema, RequestAction, updateUserSchema } from '@/types'
import { z } from 'zod'
import callApi from '../api'
import { loadAll } from '../data-loader'

export type User = z.infer<typeof getUsersSchema.response>['data'][0]
export async function getAllUsers() {
  return await loadAll({
    action: RequestAction.GET_USERS,
    schema: getUsersSchema,
  })
}

export type UpdateUserRequest = z.infer<typeof updateUserSchema.request>['payload']
export async function updateUser(payload: UpdateUserRequest) {
  return await callApi({
    action: RequestAction.UPDATE_USER,
    payload,
    schema: updateUserSchema,
  })
}

export type AddUserRequest = z.infer<typeof addUserSchema.request>['payload']
export async function addUser(payload: AddUserRequest) {
  return await callApi({
    action: RequestAction.ADD_USER,
    payload,
    schema: addUserSchema,
  })
}
