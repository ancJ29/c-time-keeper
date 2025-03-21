import { showNotification } from '@/configs/notifications'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { checkInByUser, checkOutByUser, getAllUsersByAdmin, User } from '@/services/domain'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Camera from './components/Camera'
import Picture from './components/Picture'
import WorkEntryForm from './components/WorkEntryForm'
import WorkEntryView from './components/WorkEntryView'

export default function WorkEntry() {
  const t = useTranslation()
  const [searchParams] = useSearchParams()
  const venueId = searchParams.get('venueId') || ''
  const clientId = searchParams.get('clientId') || ''
  const [users, setUsers] = useState<Record<string, User>>({})

  const getData = useCallback(async () => {
    const users = await getAllUsersByAdmin({ clientId })
    setUsers(Object.fromEntries(users.map((user) => [user.id, user])))
  }, [clientId])
  useMount(getData)

  const handleConfirm = useCallback(
    (userId: string, isCheckIn: boolean) => {
      modals.closeAll()
      if (isCheckIn) {
        checkInByUser({ clientId, userId, venueId: venueId || '' }).then((res) => {
          const success = res?.success
          showNotification({
            t,
            success,
            message: success ? t('Checked in successfully') : t('Failed to check in'),
          })
        })
      } else {
        checkOutByUser({ clientId, userId }).then((res) => {
          const success = res?.success
          showNotification({
            t,
            success,
            message: success ? t('Checked out successfully') : t('Failed to check out'),
          })
        })
      }
    },
    [clientId, t, venueId],
  )

  const handleCapture = useCallback(
    (userId: string, isCheckIn: boolean, imageSrc: string | null) => {
      modals.closeAll()
      modals.open({
        title: isCheckIn ? t('Check in') : t('Check out'),
        centered: true,
        size: 'xl',
        children: (
          <Picture
            userId={userId}
            users={users}
            imageSrc={imageSrc}
            onConfirm={() => handleConfirm(userId, isCheckIn)}
            onRetry={() => modals.closeAll()}
          />
        ),
      })
    },
    [handleConfirm, t, users],
  )

  const handleChoseUser = useCallback(
    (userId: string, isCheckIn: boolean) => {
      modals.closeAll()
      modals.open({
        title: isCheckIn ? t('Check in') : t('Check out'),
        centered: true,
        size: 'xl',
        children: <Camera onCapture={(imageSrc) => handleCapture(userId, isCheckIn, imageSrc)} />,
      })
    },
    [handleCapture, t],
  )

  const handleCheckInCheckOut = useCallback(
    (isCheckIn = true) => {
      modals.open({
        title: isCheckIn ? t('Check in') : t('Check out'),
        centered: true,
        fullScreen: true,
        children: (
          <WorkEntryForm users={users} onClick={(userId) => handleChoseUser(userId, isCheckIn)} />
        ),
      })
    },
    [handleChoseUser, t, users],
  )

  return (
    <WorkEntryView
      onCheckIn={handleCheckInCheckOut}
      onCheckOut={() => handleCheckInCheckOut(false)}
    />
  )
}
