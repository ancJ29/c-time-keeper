import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { checkInByUser, checkOutByUser } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useUserStore from '@/stores/user.store'
import useVenueStore from '@/stores/venue.store'
import { useForm } from '@mantine/form'
import { useCallback, useMemo } from 'react'
import WorkEntryView from './components/WorkEntryView'

export type FormProps = {
  clientId: string
  userId: string
  venueId: string
}

export default function WorkEntry() {
  const t = useTranslation()
  const { user } = useAuthStore()
  const { venues } = useVenueStore()
  const { users } = useUserStore()

  const initialValues: FormProps = {
    clientId: user?.clientId || '',
    userId: Array.from(users.values())[0]?.id || '',
    venueId: Array.from(venues.values())[0]?.id || '',
  }

  const form = useForm<FormProps>({
    initialValues: initialValues,
    validate: _validate(t),
  })

  const userOptions = useMemo(
    () =>
      Array.from(users.values()).map((el) => ({
        label: el.name,
        value: el.id,
      })),
    [users],
  )

  const venueOptions = useMemo(
    () =>
      Array.from(venues.values()).map((el) => ({
        label: el.name,
        value: el.id,
      })),
    [venues],
  )

  const handleChangeValue = useCallback(
    (field: string, value: string) => {
      form.setFieldValue(field, value)
    },
    [form],
  )

  const submitCheckIn = useCallback(
    async (values: FormProps) => {
      checkInByUser(values).then((res) => {
        const success = res?.success
        showNotification({
          t,
          success,
          message: success ? t('Checked in successfully') : t('Failed to check in'),
        })
      })
    },
    [t],
  )

  const submitCheckOut = useCallback(
    async (values: FormProps) => {
      checkOutByUser(values).then((res) => {
        const success = res?.success
        showNotification({
          t,
          success,
          message: success ? t('Checked out successfully') : t('Failed to check out'),
        })
      })
    },
    [t],
  )

  return (
    <WorkEntryView
      form={form}
      onChangeValue={handleChangeValue}
      onSubmitCheckIn={submitCheckIn}
      onSubmitCheckOut={submitCheckOut}
      userOptions={userOptions}
      venueOptions={venueOptions}
    />
  )
}

function _validate(t: (s: string) => string) {
  return {
    userId: (value: string) => (value === '' ? t('Field is required') : null),
    venueId: (value: string) => (value === '' ? t('Field is required') : null),
  }
}
