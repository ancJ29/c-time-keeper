import { Image, MantineSize } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons-react'

type AvatarProps = {
  src?: string | null
  radius?: string | MantineSize
  size: number
  onClick?: () => void
}

export default function Avatar({ src, radius = '100', size, onClick }: AvatarProps) {
  if (src) {
    return <Image radius={radius} src={src} h={size} w={size} onClick={onClick} />
  }

  return <IconUserCircle size={size} strokeWidth={1.5} onClick={onClick} />
}
