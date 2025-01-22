import { getVersionSchema, RequestAction } from '@/types'
import callApi from '../api'

export async function getVersion() {
  return await callApi({
    action: RequestAction.GET_VERSION,
    schema: getVersionSchema,
  })
}
