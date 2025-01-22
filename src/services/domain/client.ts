import { getClientsSchema, RequestAction } from '@/types'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type Client = z.infer<typeof getClientsSchema.response>['data'][0]
export async function getAllClients() {
  return await loadAll({
    action: RequestAction.GET_CLIENTS,
    schema: getClientsSchema,
  })
}
