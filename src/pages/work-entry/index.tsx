import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { checkInByUser, checkOutByUser, getAllUsersByAdmin, User } from '@/services/domain'
import { modals } from '@mantine/modals'
import { useCallback, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Camera from './components/Camera'
import Message from './components/Message'
import Picture from './components/Picture'
import WorkEntryForm from './components/WorkEntryForm'
import WorkEntryView from './components/WorkEntryView'

const MODAL_CLOSE_DELAY = 2000

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
    async (userId: string, isCheckIn: boolean) => {
      modals.closeAll()
      if (isCheckIn) {
        const res = await checkInByUser({ clientId, userId, venueId: venueId || '' })
        const success = res?.success
        modals.open({
          withCloseButton: false,
          centered: true,
          size: 'lg',
          children: (
            <Message
              success={success}
              message={success ? t('Checked in successfully') : t('Failed to check in')}
            />
          ),
        })
        setTimeout(() => modals.closeAll(), MODAL_CLOSE_DELAY)
      } else {
        const res = await checkOutByUser({ clientId, userId })
        const success = res?.success
        modals.open({
          withCloseButton: false,
          centered: true,
          size: 'lg',
          children: (
            <Message
              success={success}
              message={success ? t('Checked out successfully') : t('Failed to check out')}
            />
          ),
        })
        setTimeout(() => modals.closeAll(), MODAL_CLOSE_DELAY)
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
