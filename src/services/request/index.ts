import { GenericObject } from '@/types'
import axios from 'axios'
import loadingStore from './store/loading'

export default async function request(data: GenericObject, token: string | null) {
  loadingStore.startLoading()

  const baseUrl = import.meta.env.VITE_BASE_URL
  const isDev = import.meta.env.VITE_ENV === 'development'

  const res = await axios
    .request({
      method: 'POST',
      url: `${baseUrl}${isDev ? `?action=${data.action}` : ''}`,
      data,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    })
    .finally(() => {
      loadingStore.stopLoading()
    })

  return res
}
