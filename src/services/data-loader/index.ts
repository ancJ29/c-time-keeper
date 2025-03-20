import { DataRequest, RequestAction } from '@/types'
import request from '../request'

export type ListResponse<R> = {
  data: R[]
  cursor?: string
  hasMore?: boolean
}

type LoadAllProps<T extends RequestAction, U, R> = {
  action: T
  payload?: U
  schema: DataRequest<T, U, ListResponse<R>>
  take?: number
  adminKey?: string
}

export async function loadAll<T extends RequestAction, U, R>({
  action,
  payload = {} as U,
  take = 100,
  adminKey,
}: LoadAllProps<T, U, R>): Promise<R[]> {
  const token = sessionStorage.__TOKEN__ || localStorage.__TOKEN__
  let hasMore = true
  const data: R[] = []

  while (hasMore) {
    const res = await request(
      {
        action,
        payload: {
          ...payload,
          take,
        },
      },
      token,
      adminKey,
    )
    const parsedData = res?.data as ListResponse<R>
    data.push(...parsedData.data)

    hasMore = parsedData.hasMore ?? false
    if (parsedData.cursor) {
      payload = { ...payload, cursor: parsedData.cursor }
    }
  }
  return data
}
