import { getShiftsSchema, RequestAction } from '@/types/schema'
import { z } from 'zod'
import { loadAll } from '../data-loader'

type GetShiftRequest = z.infer<typeof getShiftsSchema.request>['payload']
export type Shift = z.infer<typeof getShiftsSchema.response>['data'][0]
export async function getAllShifts(payload: GetShiftRequest) {
  return await loadAll({
    action: RequestAction.GET_SHIFTS,
    payload,
    schema: getShiftsSchema,
  })
}
