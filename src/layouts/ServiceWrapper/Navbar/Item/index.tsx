import useWindowResize from '@/hooks/useWindowResize'
import { MenuItem } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ItemView from './ItemView'

type ItemProps = {
  menuItem: MenuItem
  level?: number
  navbarOpened: boolean
  closeNavbar: () => void
  openNavbar: () => void
}

export default function Item({
  menuItem,
  level = 0,
  navbarOpened,
  closeNavbar,
  openNavbar,
}: ItemProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const isMobile = useWindowResize()
  const [opened, setOpened] = useState(false)
  const [active, setActive] = useState(location.pathname)
  const ml = level * 1

  useEffect(() => {
    setActive(location.pathname)
    setOpened(isBold(menuItem, location.pathname))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const onClick = useCallback(() => {
    if (menuItem.onClick) {
      menuItem.onClick()
      return
    }
    if (!menuItem.subs) {
      navigate(menuItem.url || '')
      isMobile && closeNavbar()
      return
    }
    setOpened(!opened)
    openNavbar()
  }, [closeNavbar, isMobile, menuItem, navigate, opened, openNavbar])

  const isHighlighted = useCallback((item: MenuItem, activeUrl: string): boolean => {
    return activeUrl === item.url
  }, [])

  const isBold = useCallback((item: MenuItem, activeUrl: string): boolean => {
    if (activeUrl === item.url) {
      return true
    }
    if (item.subs) {
      return item.subs.some((sub: MenuItem) => isBold(sub, activeUrl))
    }
    return false
  }, [])

  return (
    <ItemView
      menuItem={menuItem}
      opened={opened}
      isHighlighted={isHighlighted(menuItem, active)}
      isBold={isBold(menuItem, active)}
      onClick={onClick}
      ml={ml}
      level={level}
      navbarOpened={navbarOpened}
      closeNavbar={closeNavbar}
      openNavbar={openNavbar}
    />
  )
}
