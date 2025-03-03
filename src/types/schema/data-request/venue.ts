import { z } from 'zod'
import { getSchema, listResponse, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

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

export const getVenuesByAdminSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_VENUES_BY_ADMIN),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      address: stringSchema,
      clientId: stringSchema,
    }),
  ),
})
