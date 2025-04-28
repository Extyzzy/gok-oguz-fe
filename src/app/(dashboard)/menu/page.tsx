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

const Menu = () => {
  const { t } = useTranslation()
  const [image, setImage] = useState('')

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
              onPressImage={() => {
                setImage(item.image)
                onOpen()
              }}
              {...item}
            />
          ))}
        </div>
        <Modal isOpen={isOpen} onChange={onOpenChange} className='w-[80%] h-[80%]'>
          <Image
            fill
            src={process.env.NEXT_PUBLIC_BACK_END_URL + image}
            alt={'preview'}
            objectFit='contain'
          />
        </Modal>
        <SidebarMenuMobile />
      </div>
    </div>
  )
}

export default Menu
