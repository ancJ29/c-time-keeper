import { getAllRoles, Role } from '@/services/domain'
import { create } from 'zustand'

type RoleStore = {
  roles: Map<string, Role>
  set: (roles: Role[]) => void
  load: () => Promise<void>
}

export default create<RoleStore>((set, get) => ({
  roles: new Map(),
  set: (roles: Role[]) =>
    set(() => ({
      roles: new Map(roles.map((e) => [e.id, e])),
    })),
  load: async () => {
    if (localStorage.__ROLES__) {
      const roles = JSON.parse(localStorage.__ROLES__)
      if (roles.length > 0) {
        get().set(roles)
        return
      }
    }
    const data = await getAllRoles()
    localStorage.__ROLES__ = JSON.stringify(data)
    get().set(data)
  },
}))
