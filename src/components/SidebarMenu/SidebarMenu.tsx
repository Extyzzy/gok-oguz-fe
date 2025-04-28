import Image from 'next/image'
import useGetMenuList from '@/hooks/useGetMenuList'
import { cn } from '@/library/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'
import { useTranslation } from 'react-i18next'

const SidebarMenu = () => {
  const menuList = useGetMenuList()
  const router = useRouter()
  const pathname = usePathname()
  const { i18n } = useTranslation()
  const id = pathname.split('/').filter(Boolean).pop()

  const { data: categories, isLoading } = useCategoriesQuery()

  return (
    <div className='md:block h-[500px] sticky top-24 hidden border border-[#882727] rounded-2xl p-5 min-w-[258px]'>
      {categories?.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => router.push(`/menu/${item.id}`)}
            className={cn(
              'flex items-center gap-3 hover:font-bold hover:!text-[#882727] cursor-pointer mb-1',
              {
                'font-bold !text-[#882727]': item.id.toString() === id,
              },
            )}
          >
            <Image src={item?.iconSrc} width={22} height={22} alt={item.name} />

            <span>
              {
                //@ts-ignore
                item[`name_${i18n.language}`]
              }
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default SidebarMenu
