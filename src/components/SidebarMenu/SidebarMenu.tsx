import Image from 'next/image'
import { cn } from '@/library/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useCategoriesQuery } from '@/queries/useCategoriesQuery'
import { useTranslation } from 'react-i18next'

const SidebarMenu = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { i18n } = useTranslation()
  const id = pathname.split('/').filter(Boolean).pop()
  const currentSlug = pathname.split('/').filter(Boolean).pop()

  const { data: categories, isLoading } = useCategoriesQuery()

  return (
    <div className='md:block h-[500px] sticky top-24 hidden border border-[#882727] rounded-2xl p-5 min-w-[258px]'>
      {categories?.map((item, index) => {
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
            {item?.image && (
              <Image
                src={process.env.NEXT_PUBLIC_BACK_END_URL + item.image}
                width={22}
                height={22}
                alt={item.slug}
              />
            )}

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
