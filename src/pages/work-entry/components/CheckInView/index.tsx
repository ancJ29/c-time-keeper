import useTranslation from '@/hooks/useTranslation'
import { OptionProps } from '@/types'
import { Button, SimpleGrid, Stack, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '../..'
import CheckInInfo from '../CheckInInfo'
import ListView from '../ListView'

type CheckInViewProps = {
  form: UseFormReturnType<FormProps>
  onChangeValue: (field: string, value: string) => void
  onSubmit: (values: FormProps) => void
  userOptions: OptionProps[]
  venueOptions: OptionProps[]
}

export default function CheckInView({
  form,
  onChangeValue,
  onSubmit,
  userOptions,
  venueOptions,
}: CheckInViewProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={16} justify="center" align="center" mt={24}>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <ListView
            value={form.values.userId}
            onChangeValue={(value) => onChangeValue('userId', value)}
            options={userOptions}
          />
          <ListView
            value={form.values.venueId}
            onChangeValue={(value) => onChangeValue('venueId', value)}
            options={venueOptions}
          />
        </SimpleGrid>
        {(form.errors.userId || form.errors.venueId) && (
          <Text c="red.7" fz={16} fw="bold">
            {t('Please select user and venue')}
          </Text>
        )}
        <CheckInInfo form={form} />
        <Button type="submit">{t('Check in')}</Button>
      </Stack>
    </form>
  )
}
