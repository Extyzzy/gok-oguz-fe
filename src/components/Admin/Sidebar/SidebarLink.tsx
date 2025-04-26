import NextLink from 'next/link'
import { twMerge } from 'tailwind-merge'
import { SidebarItemProps } from '@/components/Admin/Sidebar/SidebarItem'

export const SidebarLink = ({
  title,
  href = '',
  icon,
  isActive = false,
  isCollapsed = false,
}: Omit<SidebarItemProps, 'items'>) => {
  return (
    <NextLink
      href={href}
      className={twMerge(
        isActive ? 'bg-primary-100 [&_svg_path]:fill-primary-500' : 'hover:bg-default-100',
        'cursor-pointer text-default-900 outline-none active:bg-none',
        'flex h-full min-h-[44px] w-full max-w-full items-center gap-2 rounded-xl px-2.5',
        'transition-all duration-150 active:scale-[0.98]',
      )}
    >
      {icon}
      {isCollapsed || <span>{title}</span>}
    </NextLink>
  )
}
