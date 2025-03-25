import useAuthStore from '@/stores/auth.store'
import useVenueStore from '@/stores/venue.store'
import CheckInQrView from './components/CheckInQRView'

export default function CheckInQr() {
  const { user } = useAuthStore()
  const { venues } = useVenueStore()

  const baseUrl = window.location.origin
  const qrValue = `${baseUrl}/work-entry?clientId=${user?.clientId}&venueId=${Array.from(venues.keys())?.[0]}`

  return <CheckInQrView qrValue={qrValue} />
}
