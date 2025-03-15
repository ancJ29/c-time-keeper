import useTranslation from '@/hooks/useTranslation'
import { OptionProps } from '@/types'
import { Button, Stack, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '../..'
import CheckInInfo from '../CheckInInfo'
import ListView from '../ListView'

type CheckOutViewProps = {
  form: UseFormReturnType<FormProps>
  onChangeValue: (field: string, value: string) => void
  onSubmit: (values: FormProps) => void
  userOptions: OptionProps[]
}

export default function CheckOutView({
  form,
  onChangeValue,
  onSubmit,
  userOptions,
}: CheckOutViewProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16} justify="center" align="center" mt={24}>
        <ListView
          value={form.values.userId}
          onChangeValue={(value) => onChangeValue('userId', value)}
          options={userOptions}
        />
        {(form.errors.userId || form.errors.venueId) && (
          <Text c="red.7" fz={16} fw="bold">
            {t('Please select user and venue')}
          </Text>
        )}
        <CheckInInfo form={form} showVenue={false} />
        <Button type="submit">{t('Check out')}</Button>
      </Stack>
    </form>
  )
}
