import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import useVenueStore from '@/stores/venue.store'
import { OptionProps } from '@/types'
import { Button, Stack } from '@mantine/core'
import { useForm, UseFormReturnType } from '@mantine/form'
import { modals } from '@mantine/modals'
import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

type FormProps = {
  venueId: string
}

export default function WorkEntry() {
  const navigate = useNavigate()
  const t = useTranslation()
  const { venues } = useVenueStore()

  const initialValues: FormProps = {
    venueId: Array.from(venues.keys())[0] || '',
  }

  const form = useForm<FormProps>({
    initialValues: initialValues,
    validate: _validate(t),
  })

  const venueOptions = useMemo(
    () =>
      Array.from(venues.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [venues, t],
  )

  const onClick = useCallback(() => {
    const submit = (form: FormProps) => {
      modals.closeAll()
      navigate(`/work-entry?venueId=${form.venueId}&step=1`)
    }

    modals.open({
      title: t('Work entry'),
      centered: true,
      size: 'md',
      children: <WorkEntryForm form={form} onSubmit={submit} venueOptions={venueOptions} />,
    })
  }, [form, navigate, t, venueOptions])

  return <Button onClick={onClick}>{t('Work entry')}</Button>
}

function _validate(t: (s: string) => string) {
  return {
    venueId: (value: string) => (value === '' ? t('Field is required') : null),
  }
}

function WorkEntryForm({
  form,
  onSubmit,
  venueOptions,
}: {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
  venueOptions: OptionProps[]
}) {
  const t = useTranslation()
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={10} align="center">
        <Select
          w="100%"
          withAsterisk
          label={t('Venue')}
          options={venueOptions}
          {...form.getInputProps('venueId')}
        />
        <Button type="submit" mt={10}>
          {t('Continue')}
        </Button>
      </Stack>
    </form>
  )
}
