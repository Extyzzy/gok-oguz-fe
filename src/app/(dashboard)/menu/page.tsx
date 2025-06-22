'use client'

import CardMenu from '@/components/CardMenu/CardMenu'
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/components/SidebarMenu/SidebarMenuMobile'
import Title from '@/components/Title/Title'
import { useTranslation } from 'react-i18next'
import { usePublicDishesQuery } from '@/queries/usePublicDishesQuery'
import { Modal } from '@/components/modal/Modal'
import { useModal } from '@/components/modal/useModal'
import Image from 'next/image'
import { useState } from 'react'
import { Dish } from './[slug]/page'

const Menu = () => {
  const { t, i18n } = useTranslation()
  const [item, setItem] = useState<Dish>()

  const { isOpen, onOpenChange, onOpen } = useModal()
  const { data: dishes } = usePublicDishesQuery()

  return (
    <div className='pt-2 mb-4 mx-2 sm:mx-0'>
      <Title classNames='text-center'>{t('menu.title')}</Title>
      <div className='flex gap-8 mt-2 '>
        <SidebarMenu />
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center md:justify-start gap-4 w-[90%] lg:w-[69%]'>
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
              <div className='w-full h-auto'>
                <Image
                  fill
                  src={process.env.NEXT_PUBLIC_BACK_END_URL + item.image}
                  alt={'preview'}
                  className='object-contain !static rounded-xl'
                />

                <p className='italic text-md mt-4'>
                  {item.weight} gr / {item.price} mdl
                </p>

                <p className='text-md mt-4'>
                  {
                    //@ts-ignore
                    item[`description_${i18n.language}`]
                  }
                </p>
              </div>
            )}
          </Modal>
        )}
        <SidebarMenuMobile />
      </div>
    </div>
  )
}

export default Menu
