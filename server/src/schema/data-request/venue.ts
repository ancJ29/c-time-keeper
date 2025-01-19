import { z } from 'zod'
import { _typeBuilder } from './type-builder'
import { RequestAction } from '../request'
import { getSchema, listResponse, stringSchema } from '../base'

export const getVenuesSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_VENUES),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      address: stringSchema,
    }),
  ),
})
