import { getAllVenues, Venue } from '@/services/domain'
import { create } from 'zustand'

type VenueStore = {
  venues: Map<string, Venue>
  set: (venues: Venue[]) => void
  load: () => Promise<void>
}

export default create<VenueStore>((set, get) => ({
  venues: new Map(),
  set: (venues: Venue[]) =>
    set(() => ({
      venues: new Map(venues.map((e) => [e.id, e])),
    })),
  load: async () => {
    if (localStorage.__VENUES__) {
      const venues = JSON.parse(localStorage.__VENUES__)
      if (venues.length > 0) {
        get().set(venues)
        return
      }
    }
    const data = await getAllVenues()
    localStorage.__VENUES__ = JSON.stringify(data)
    get().set(data)
  },
}))
