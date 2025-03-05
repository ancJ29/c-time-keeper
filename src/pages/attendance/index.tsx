import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import { useMemo } from 'react'
import store from './_shift.store'
import TimeKeepingView from './components/TimeKeepingView'

export default function TimeKeeping() {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { venues } = useVenueStore()

  useMount(store.initData)

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const venueOptions = useMemo(
    () =>
      Array.from(venues.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [venues, t],
  )

  return <TimeKeepingView roleOptions={roleOptions} venueOptions={venueOptions} />
}
