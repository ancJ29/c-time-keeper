import Avatar from '@/components/common/Avatar'
import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { MantineWidth, OptionProps } from '@/types'
import { Anchor, Button, Flex, Stack, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'

const w: MantineWidth = { base: '100%', sm: 400 }

type ProfileFormProps = {
  form: UseFormReturnType<User>
  onSubmit: (values: User) => void
  roleOptions: OptionProps[]
  salaryRuleOptions: OptionProps[]
}

export default function ProfileForm({
  form,
  onSubmit,
  roleOptions,
  salaryRuleOptions,
}: ProfileFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex gap={15} align="center" justify="center" h="100%" direction="column">
        <Avatar size={120} src={form.values.avatar} />
        <Stack gap={12} align="center" w={w}>
          <TextInput
            w={w}
            data-autofocus
            withAsterisk
            label={t('Email')}
            {...form.getInputProps('email')}
          />
          <TextInput w={w} withAsterisk label={t('Name')} {...form.getInputProps('name')} />
          <Select
            w={w}
            withAsterisk
            label={t('Role')}
            options={roleOptions}
            disabled
            {...form.getInputProps('roleId')}
          />
          <Select
            w={w}
            withAsterisk
            label={t('Salary rule')}
            options={salaryRuleOptions}
            {...form.getInputProps('salaryRuleId')}
          />
          <Button type="submit" mt={10}>
            {t('Save')}
          </Button>
          <Anchor ta="center" href="/change-password">
            {t('Update password')}
          </Anchor>
        </Stack>
      </Flex>
    </form>
  )
}
