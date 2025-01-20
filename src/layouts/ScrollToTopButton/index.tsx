import { ActionIcon } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'
import { useCallback } from 'react'
import classes from './ScrollTopTopButton.module.scss'

export default function ScrollToTopButton() {
  const [scroll, scrollTo] = useWindowScroll()

  const scrollToTop = useCallback(() => {
    scrollTo({ y: 0 })
  }, [scrollTo])

  return (
    scroll.y >= 10 && (
      <ActionIcon radius="xl" variant="outline" onClick={scrollToTop} className={classes.button}>
        <IconArrowUp />
      </ActionIcon>
    )
  )
}
