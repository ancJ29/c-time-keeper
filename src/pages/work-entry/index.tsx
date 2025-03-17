import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { checkInByUser, checkOutByUser } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useUserStore from '@/stores/user.store'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import WorkEntryForm from './components/WorkEntryForm'
import WorkEntryView from './components/WorkEntryView'

export default function WorkEntry() {
  const t = useTranslation()
  const [searchParams] = useSearchParams()
  const venueId = searchParams.get('venueId')
  const { user } = useAuthStore()
  const { users } = useUserStore()
  const [isCheckIn, setIsCheckIn] = useState(true)

  const onClick = useCallback(
    (userId: string) => {
      modals.closeAll()
      if (isCheckIn) {
        checkInByUser({
          clientId: user?.clientId || '',
          userId,
          venueId: venueId || '',
        }).then((res) => {
          const success = res?.success
          showNotification({
            t,
            success,
            message: success ? t('Checked in successfully') : t('Failed to check in'),
          })
        })
      } else {
        checkOutByUser({
          clientId: user?.clientId || '',
          userId,
        }).then((res) => {
          const success = res?.success
          showNotification({
            t,
            success,
            message: success ? t('Checked out successfully') : t('Failed to check out'),
          })
        })
      }
    },
    [isCheckIn, t, user?.clientId, venueId],
  )

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      setIsCheckIn(isCheckIn)
      modals.open({
        title: isCheckIn ? t('Check in') : t('Check out'),
        centered: true,
        fullScreen: true,
        children: <WorkEntryForm onClick={onClick} users={Array.from(users.values())} />,
      })
    },
    [onClick, t, users],
  )

  return (
    <WorkEntryView
      onCheckIn={handleCheckInCheckOut}
      onCheckOut={() => handleCheckInCheckOut(false)}
    />
  )
}
