import { z } from 'zod'
import { _typeBuilder } from './type-builder'
import { RequestAction } from '../request'
import { optionalStringSchema } from '../base'

export const getVersionSchema = _typeBuilder({
  action: z.literal(RequestAction.GET_VERSION),
  payload: z.object({}),
  response: z.object({
    version: optionalStringSchema,
  }),
})
