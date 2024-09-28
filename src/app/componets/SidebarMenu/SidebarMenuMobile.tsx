'use client'

import Image from 'next/image'
import useGetMenuList from '../../../../hooks/useGetMenuList'
import { cn } from '../../../../lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import clsx from 'clsx'

const SidebarMenuMobile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const menuList = useGetMenuList()
  const router = useRouter()
  const pathname = usePathname()

  const currentSlug = pathname.split('/').filter(Boolean).pop()

  const selectedItem = menuList.find(menuItem => menuItem.slug === currentSlug)

  return (
    <div>
      <div
        className={clsx('block md:hidden border border-[#882727] bg-burgundy p-5 text-white py-4 z-50 fixed bottom-20 left-1/2 transform -translate-x-1/2 -translate-y w-[85%] rounded-3xl inset-x-0',
          {},
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-3">
            <Image src="/assets/svg/menu.svg" width={22} height={22} alt="menu" />
            <span>Meniu {selectedItem && `/ ${selectedItem.name}`}</span>
          </div>

          <Image
            src="/assets/svg/arrow.svg"
            width={22}
            height={22}
            alt="menu"
            className={cn(
              'transition-transform duration-300 ease-in-out', // Smooth transition
              {
                'rotate-180': isOpen, // Rotates 180° when open
              },
            )}
          />

        </div>
      </div>
      {
        isOpen && (
          <div
            className={clsx('rounded-t-3xl bg-beige border border-[#882727] p-5 fixed bottom-[7.4rem] left-1/2  transform -translate-x-1/2 -translate-y w-[85%] pb-10',
              {
                'rounded-t-3xl': isOpen,
              },
            )}>
            {menuList.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => router.push(`/menu/${item.slug}`)}
                  className={cn(
                    'flex items-center gap-3 hover:font-bold hover:!text-[#882727] cursor-pointer mb-3',
                    {
                      'font-bold !text-[#882727]': item.slug === currentSlug,
                    },
                  )}
                >
                  <Image src={item.iconSrc} width={22} height={22} alt={item.name} className="text-white" />
                  <span>{item.name}</span>
                </div>
              )
            })}
          </div>
        )
      }

    </div>
  )
}

export default SidebarMenuMobile
