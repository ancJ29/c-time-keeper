import { z } from 'zod'
import { getSchema, listResponse, stringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getRolesSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_ROLES),
  payload: getSchema,
  response: listResponse(
    z.object({
      id: stringSchema,
      name: stringSchema,
    }),
  ),
})
