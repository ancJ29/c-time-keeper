import { getVersion } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { create } from 'zustand'

type MetaDataStore = {
  checkVersion: () => Promise<void>
}

export default create<MetaDataStore>(() => ({
  checkVersion: async () => {
    const { removeToken } = useAuthStore.getState()
    const currentVersion = localStorage.__VERSION__
    const data = await getVersion()
    localStorage.__VERSION__ = data?.version

    if (currentVersion !== data?.version) {
      removeToken()
    }
  },
}))
