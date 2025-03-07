import { getAllUsers, User } from '@/services/domain'
import { create } from 'zustand'

type UserStore = {
  users: Map<string, User>
  set: (users: User[]) => void
  load: () => Promise<void>
}

export default create<UserStore>((set, get) => ({
  users: new Map(),
  set: (users: User[]) =>
    set(() => ({
      users: new Map(users.map((e) => [e.id, e])),
    })),
  load: async () => {
    if (localStorage.__USERS__) {
      const users = JSON.parse(localStorage.__USERS__)
      if (users.length > 0) {
        get().set(users)
        return
      }
    }
    const data = await getAllUsers()
    localStorage.__USERS__ = JSON.stringify(data)
    get().set(data)
  },
}))
