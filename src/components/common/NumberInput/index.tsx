import {
  NumberInput as MantineNumberInput,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core'

interface NumberInputProps extends MantineNumberInputProps {}

export default function NumberInput({ ...props }: NumberInputProps) {
  return <MantineNumberInput thousandSeparator="." decimalSeparator="," {...props} />
}
