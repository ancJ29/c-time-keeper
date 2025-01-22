import { getVenuesSchema, RequestAction } from '@/types'
import { z } from 'zod'
import { loadAll } from '../data-loader'

export type Venue = z.infer<typeof getVenuesSchema.response>['data'][0]
export async function getAllVenues() {
  return await loadAll({
    action: RequestAction.GET_VENUES,
    schema: getVenuesSchema,
  })
}
