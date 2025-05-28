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
import useGetMenuCardsItems from '@/hooks/useGetMenuCardsItems'

interface MenuProps {
  params: {
    slug: string
  }
}

const Menu: FC<MenuProps> = ({ params }) => {
  const { t } = useTranslation()
  const [image, setImage] = useState('')
  const { isOpen, onOpenChange, onOpen } = useModal()

  const { data: dishes } = usePublicDishesByCategoryQuery({
    slug: params.slug,
  })

  return (
    <div className='pt-2 mb-4 mx-2 sm:mx-0'>
      <Title classNames='text-center'>{t('menu.title')}</Title>
      <div className='flex gap-8 mt-2'>
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
        <SidebarMenuMobile />
      </div>
      <Modal isOpen={isOpen} onChange={onOpenChange}>
        <Image
          fill
          src={process.env.NEXT_PUBLIC_BACK_END_URL + image}
          alt={'preview'}
          className='object-contain'
        />
      </Modal>
    </div>
  )
}

export default Menu
