import useTranslation from '@/hooks/useTranslation'
import { OptionProps } from '@/types'
import { Tabs } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '../..'
import CheckInView from '../CheckInView'
import CheckOutView from '../CheckOutView'

type WorkEntryViewProps = {
  form: UseFormReturnType<FormProps>
  onChangeValue: (field: string, value: string) => void
  onSubmitCheckIn: (values: FormProps) => void
  onSubmitCheckOut: (values: FormProps) => void
  userOptions: OptionProps[]
  venueOptions: OptionProps[]
}

export default function WorkEntryView({
  form,
  onChangeValue,
  onSubmitCheckIn,
  onSubmitCheckOut,
  userOptions,
  venueOptions,
}: WorkEntryViewProps) {
  const t = useTranslation()

  return (
    <Tabs defaultValue="check-in">
      <Tabs.List grow>
        <Tabs.Tab value="check-in">{t('Check in')}</Tabs.Tab>
        <Tabs.Tab value="check-out">{t('Check out')}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="check-in">
        <CheckInView
          form={form}
          onChangeValue={onChangeValue}
          onSubmit={onSubmitCheckIn}
          userOptions={userOptions}
          venueOptions={venueOptions}
        />
      </Tabs.Panel>

      <Tabs.Panel value="check-out">
        <CheckOutView
          form={form}
          onChangeValue={onChangeValue}
          onSubmit={onSubmitCheckOut}
          userOptions={userOptions}
        />
      </Tabs.Panel>
    </Tabs>
  )
}
