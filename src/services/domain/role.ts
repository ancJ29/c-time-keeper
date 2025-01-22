import { RequestAction, getRolesSchema } from '@/types'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type Role = z.infer<typeof getRolesSchema.response>['data'][0]
export async function getAllRoles() {
  return await loadAll({
    action: RequestAction.GET_ROLES,
    schema: getRolesSchema,
  })
}
