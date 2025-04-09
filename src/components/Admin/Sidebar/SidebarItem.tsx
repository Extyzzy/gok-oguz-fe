import { ReactNode } from 'react'
import {
  Accordion,
  AccordionItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react'
import { ChevronUpIcon } from '@/components/icons/ChevronUpIcon'
import { SidebarLink } from '@/components/Admin/Sidebar/SidebarLink'

export interface SidebarItemProps {
  title: string
  icon?: ReactNode
  href?: string
  items?: SidebarItemProps[]
  isActive?: boolean
  isCollapsed?: boolean
  isOpen?: boolean
}

export const SidebarItem = (props: SidebarItemProps) => {
  const { icon, title, isOpen = false, items, isCollapsed = false } = props
  if (isCollapsed) {
    if (items) {
      return (
        <Popover placement='right' offset={18} showArrow>
          <PopoverTrigger>
            <button className={'outline-none'}>
              <SidebarLink {...props} />
            </button>
          </PopoverTrigger>
          <PopoverContent className='flex w-full flex-col items-start gap-2'>
            {items.map((item, index) => (
              <SidebarItem {...item} key={index} />
            ))}
          </PopoverContent>
        </Popover>
      )
    }
    return <SidebarLink {...props} />
  }

  if (items) {
    return (
      <Accordion className='px-0' defaultExpandedKeys={isOpen ? ['first'] : []}>
        <AccordionItem
          key={'first'}
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: 'data-[open=true]:-rotate-180',
            trigger:
              'py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-2.5',
            title: 'px-0 flex text-base gap-2 h-full items-center cursor-pointer',
            content: 'pl-4',
          }}
          aria-label={title}
          title={
            <div className='flex flex-row gap-2'>
              {icon}
              <span>{title}</span>
            </div>
          }
        >
          {items.map((item, index) => (
            <SidebarItem {...item} key={index} />
          ))}
        </AccordionItem>
      </Accordion>
    )
  }
  return <SidebarLink {...props} />
}
