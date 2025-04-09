import { SidebarItemProps } from '@/components/Admin/Sidebar/SidebarItem'
import { DashboardIcon } from '@/components/icons/DashboardIcon'
import { DishesIcon } from '@/components/icons/DishesIcon'

export const navigation: SidebarItemProps[] &
  {
    items?: SidebarItemProps[]
  }[] = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon className={'h-6 min-w-6'} />,
    href: '/admin/dashboard',
  },
  {
    title: 'Dishes',
    icon: <DishesIcon className={'h-6 min-w-6'} />,
    href: '/admin/dishes',
  },
]
