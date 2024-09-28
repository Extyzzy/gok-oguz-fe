'use client'

import Image from 'next/image'
import useGetMenuList from '../../../../hooks/useGetMenuList'
import { cn } from '../../../../lib/utils'
import { usePathname, useRouter } from 'next/navigation'

const SidebarMenu = () => {
  const menuList = useGetMenuList()
  const router = useRouter()
  const pathname = usePathname()

  const currentSlug = pathname.split('/').filter(Boolean).pop()

  return (
    <div className="md:block h-[500px] min-w-52 hidden border border-[#882727] rounded-2xl p-5">
      {menuList.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => router.push(`/menu/${item.slug}`)}
            className={cn(
              'flex items-center gap-3 hover:font-bold hover:!text-[#882727] cursor-pointer mb-1',
              {
                'font-bold !text-[#882727]': item.slug === currentSlug,
              },
            )}
          >
            <Image src={item.iconSrc} width={22} height={22} alt={item.name} />
            <span>{item.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default SidebarMenu
