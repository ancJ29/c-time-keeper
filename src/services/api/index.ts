import { DataRequest, RequestAction } from '@/types'
import request from '../request'

type CallApiProps<T extends RequestAction, U, R> = {
  action: T
  payload?: U
  schema: DataRequest<T, U, R>
}

export default async function callApi<T extends RequestAction, U, R>({
  action,
  payload = {} as U,
  schema,
}: CallApiProps<T, U, R>): Promise<R | undefined> {
  const token = sessionStorage.__TOKEN__ || localStorage.__TOKEN__
  const res = await request({ action, payload }, token)
  const parsed = schema.response.safeParse(res?.data)
  if (parsed.success) {
    return parsed.data
  }
  return undefined
}
