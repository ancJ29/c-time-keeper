import { Image } from '@mantine/core'

type FlagIconProps = {
  language: string
  size?: number
}

export default function FlagIcon({ language, size = 22 }: FlagIconProps) {
  return <Image radius="lg" h={size} w={size} src={`/imgs/flags/${language.toLowerCase()}.svg`} />
}
