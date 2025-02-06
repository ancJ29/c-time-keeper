import { MenuItem } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavbarItemView from '../NavbarItemView'

type NavbarItemProps = {
  menuItem: MenuItem
  navbarOpened: boolean
  toggleNavbar: () => void
  level?: number
}

export default function NavbarItem({
  menuItem,
  navbarOpened,
  toggleNavbar,
  level = 0,
}: NavbarItemProps) {
  const location = useLocation()
  const navigate = useNavigate()
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
    if (!navbarOpened) {
      toggleNavbar()
      return
    }
    if (!menuItem.subs) {
      navigate(menuItem.url || '')
      toggleNavbar()
      return
    }
    setOpened(!opened)
  }, [menuItem, navbarOpened, navigate, opened, toggleNavbar])

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
    <NavbarItemView
      menuItem={menuItem}
      opened={opened}
      isHighlighted={isHighlighted(menuItem, active)}
      isBold={isBold(menuItem, active)}
      onClick={onClick}
      ml={ml}
      level={level}
      navbarOpened={navbarOpened}
      toggleNavbar={toggleNavbar}
    />
  )
}
