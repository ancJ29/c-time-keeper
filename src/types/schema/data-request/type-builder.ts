import { z } from 'zod'
import { DataRequest, RequestAction } from '../request'

export function _typeBuilder<A extends RequestAction, P, R>({
  action,
  payload,
  response,
  authOnly,
  guestOnly,
}: {
  action: z.ZodLiteral<A>
  payload: z.ZodType<P>
  response: z.ZodType<R>
  authOnly?: boolean
  guestOnly?: boolean
}): DataRequest<A, P, R> {
  return {
    authOnly,
    guestOnly,
    request: z.object({
      action,
      payload,
    }),
    response,
  } as DataRequest<A, P, R>
}
