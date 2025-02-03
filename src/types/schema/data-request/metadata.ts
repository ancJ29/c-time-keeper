import { z } from 'zod'
import { optionalStringSchema } from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const getVersionSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_VERSION),
  payload: z.object({}),
  response: z.object({
    version: optionalStringSchema,
  }),
})
