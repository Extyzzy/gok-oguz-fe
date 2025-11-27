import { SidebarItemProps } from '@/components/Admin/Sidebar/SidebarItem'
import { CategoriesIcon } from '@/components/icons/CategoriesIcon'
import { DashboardIcon } from '@/components/icons/DashboardIcon'
import { DishesIcon } from '@/components/icons/DishesIcon'
import { PageContentIcon } from '@/components/icons/PageContentIcon'

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
  {
    title: 'Categories',
    icon: <CategoriesIcon className={'h-6 min-w-6'} />,
    href: '/admin/categories',
  },
  {
    title: 'Page Content',
    icon: <PageContentIcon className={'h-6 min-w-6'} />,
    href: '/admin/page-content',
  },
]
