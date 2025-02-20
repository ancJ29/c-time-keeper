import { ActionIcon } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons-react'
import classes from './PinButton.module.scss'

type PinButtonProps = {
  navbarOpened: boolean
  onClick: () => void
}

export default function PinButton({ navbarOpened, onClick }: PinButtonProps) {
  const { ref, hovered } = useHover()

  return (
    <ActionIcon
      variant="outline"
      color="quaternary.1"
      onClick={onClick}
      className={classes.container}
      visibleFrom="sm"
    >
      <IconArrowRight
        size={18}
        stroke={1.5}
        color={hovered ? 'black' : '#adb5b9'}
        className={navbarOpened ? classes.rotated : classes.unRotated}
        ref={ref}
      />
    </ActionIcon>
  )
}
