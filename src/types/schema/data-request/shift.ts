import { z } from 'zod'
import {
  booleanSchema,
  getSchema,
  listResponse,
  nullishNumberSchema,
  numberSchema,
  stringSchema,
} from '../base'
import { RequestAction } from '../request'
import { _typeBuilder } from './type-builder'

export const checkInBySystemSchema = _typeBuilder({
  action: z.literal(RequestAction.CHECK_IN_BY_SYSTEM),
  payload: z.object({
    clientId: stringSchema,
    userId: stringSchema,
    venueId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const checkInByUserSchema = _typeBuilder({
  action: z.literal(RequestAction.CHECK_IN_BY_USER),
  payload: z.object({
    clientId: stringSchema,
    userId: stringSchema,
    venueId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const checkOutByUserSchema = _typeBuilder({
  action: z.literal(RequestAction.CHECK_OUT_BY_USER),
  payload: z.object({
    clientId: stringSchema,
    userId: stringSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})

export const getShiftsSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.GET_SHIFTS),
  payload: getSchema.extend({
    start: numberSchema,
    end: numberSchema,
  }),
  response: listResponse(
    z.object({
      id: stringSchema,
      userId: stringSchema,
      venueId: stringSchema,
      start: numberSchema,
      end: nullishNumberSchema,
    }),
  ),
})

export const updateShiftSchema = _typeBuilder({
  authOnly: true,
  action: z.literal(RequestAction.UPDATE_SHIFT),
  payload: z.object({
    id: stringSchema,
    start: numberSchema,
    end: nullishNumberSchema,
  }),
  response: z.object({
    success: booleanSchema,
  }),
})
