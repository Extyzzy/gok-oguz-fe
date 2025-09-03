'use client'

import CardMenu from '@/components/CardMenu/CardMenu'
import { FC } from 'react'
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/components/SidebarMenu/SidebarMenuMobile'
import Title from '@/components/Title/Title'
import { useTranslation } from 'react-i18next'
import { usePublicDishesByCategoryQuery } from '@/queries/usePublicDishesByCategoryQuery'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/components/modal/useModal'
import Image from 'next/image'
import { useState } from 'react'

interface MenuProps {
  params: {
    slug: string
  }
}

export interface Dish {
  image: string
  slug: string
  name_en: string
  name_ru: string
  name_ro: string
  price: number
  description_ru: string
  description_ro: string
  description_en: string
  weight: number
}

const Menu: FC<MenuProps> = ({ params }) => {
  const { t, i18n } = useTranslation()
  const [item, setItem] = useState<Dish>()
  const { isOpen, onOpenChange, onOpen } = useModal()

  const { data: dishes } = usePublicDishesByCategoryQuery({
    slug: params.slug,
  })

  if (item?.image) {
    console.log(process.env.NEXT_PUBLIC_BACK_END_URL + item.image)
  }

  return (
    <div className='pt-2 mb-4 mx-2 sm:mx-0'>
      <Title classNames='text-center'>{t('menu.title')}</Title>
      <div className='flex lg:gap-8 mt-2'>
        <SidebarMenu />
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 w-[88%] mx-auto'>
          {dishes?.map((item, index) => (
            <CardMenu
              key={index}
              imagePath={item.image}
              onClickCard={() => {
                setItem(item)
                onOpen()
              }}
              {...item}
            />
          ))}
        </div>
        <SidebarMenuMobile />
      </div>
      {item && (
        <Modal
          isOpen={isOpen}
          onChange={onOpenChange}
          title={
            //@ts-ignore
            item[`name_${i18n.language}`]
          }
        >
          {item && (
            <div className='w-full'>
              {/* Image container with no fixed height */}

              {(item?.image && (
                <Image
                  src={encodeURI(process.env.NEXT_PUBLIC_BACK_END_URL + item.image)}
                  alt='preview'
                  width={800}
                  height={600}
                  className='w-full h-auto rounded-xl'
                />
              )) || (
                <Image
                  src='/assets/svg/peppers.svg'
                  alt='preview'
                  width={800}
                  height={600}
                  className='w-full h-auto rounded-xl'
                />
              )}

              <p className='italic text-md mt-2'>
                {item.weight} gr / {item.price} mdl
              </p>

              <p className='text-md mt-1'>
                {
                  //@ts-ignore
                  item[`description_${i18n.language}`]
                }
              </p>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}

export default Menu
