import { z } from 'zod'
import { booleanSchema, getSchema, listResponse, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getClientsSchema = _typeBuilder({
  guestOnly: true,
  action: z.literal(RequestAction.GET_CLIENTS),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
      enabled: booleanSchema,
      domain: stringSchema,
    }),
  ),
})
