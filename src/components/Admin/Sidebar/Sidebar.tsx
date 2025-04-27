'use client'

import { usePathname } from 'next/navigation'
import { SidebarItem, SidebarItemProps } from '@/components/Admin/Sidebar/SidebarItem'
import { Button, Divider, tv } from '@nextui-org/react'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { navigation } from '@/config/navigation.config'
import { NavCollapsedIcon } from '@/components/icons/NavCollapsedIcon'
import { NavExpandedIcon } from '@/components/icons/NavExpandedIcon'
import { LogoutIcon } from '@/components/icons/LogoutIcon'
import { useTheme } from 'next-themes'

const sidebar = tv({
  base: twMerge(
    'bg-background transition-all h-full fixed -translate-x-full shrink-0 z-20 overflow-y-auto border-r border-divider flex-col py-6 px-3 justify-between',
    'md:ml-0 md:flex md:static md:h-dvh md:translate-x-0',
  ),
  variants: {
    isCollapsed: {
      true: '-translate-x-full md:w-[4.3rem]',
      false: 'translate-x-0 w-64',
    },
  },
})

const toggle = tv({
  base: 'fixed left-3.5 bottom-3.5 z-50',
  variants: {
    isCollapsed: {
      true: 'left-3.5 md:left-3.5',
    },
  },
})

const processNavigation = (
  navigation: SidebarItemProps[],
  pathname: string,
  isCollapsed: boolean,
  parent?: SidebarItemProps,
) => {
  navigation.forEach((nav) => {
    nav.isCollapsed = isCollapsed
    nav.isActive = nav.href === '/' ? nav.href === pathname : pathname.startsWith(String(nav.href))
    if (parent && !parent.isOpen) {
      parent.isOpen = nav.isActive
    }
    if (nav.items) {
      processNavigation(nav.items, pathname, false, nav)
    }
  })
}

export const Sidebar = () => {
  const { logout } = useAuth()
  const { setTheme } = useTheme()

  const isMobile = window.innerWidth < 768

  const pathname = usePathname()

  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    setIsCollapsed(isMobile ? true : localStorage.getItem('isCollapsed') === 'true')
  }, [isMobile])

  const [showName, setShowName] = useState(!isCollapsed)

  useEffect(() => {
    if (isCollapsed) {
      setShowName(false)
    } else {
      setTimeout(() => {
        setShowName(true)
      }, 100)
    }
  }, [isCollapsed])

  const onToggleCollapsed = () => {
    const newValue = !isCollapsed
    setIsCollapsed(newValue)
    localStorage.setItem('isCollapsed', String(newValue))
  }

  processNavigation(navigation, pathname, isCollapsed)

  return (
    <aside className='sticky top-0 z-20 h-dvh'>
      <div className={sidebar({ isCollapsed })}>
        <div className='flex flex-col gap-2'>
          {navigation.map((item, index) => (
            <SidebarItem {...item} key={index} />
          ))}

          <Divider className='mt-6' />
        </div>

        <div>
          <div className='space-x-2 mb-6'>
            <Button
              onClick={() => setTheme('light')}
              className={'capitalize'}
              color={'primary'}
              size={'sm'}
            >
              Light
            </Button>
            <Button
              onClick={() => setTheme('dark')}
              className={'capitalize'}
              color={'default'}
              size={'sm'}
            >
              Dark
            </Button>
          </div>
          <Button
            color='danger'
            onClick={logout}
            fullWidth
            className='justify-start mb-12 min-w-0 px-2.5'
          >
            <LogoutIcon className='h-6 w-6' />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>

      <Button
        className={toggle({ isCollapsed })}
        isIconOnly
        aria-label='toggle'
        onClick={onToggleCollapsed}
        color={'primary'}
      >
        {isCollapsed ? (
          <NavCollapsedIcon className={'h-7'} />
        ) : (
          <NavExpandedIcon className={'h-7'} />
        )}
      </Button>
    </aside>
  )
}
