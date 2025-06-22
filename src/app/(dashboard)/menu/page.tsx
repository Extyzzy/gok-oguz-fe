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
import { Skeleton } from '@nextui-org/react'

const Menu = () => {
  const { t, i18n } = useTranslation()
  const [item, setItem] = useState<Dish>()
  const [imageLoaded, setImageLoaded] = useState(false)

  const { isOpen, onOpenChange, onOpen } = useModal()
  const { data: dishes } = usePublicDishesQuery()

  return (
    <div className='pt-2 mb-4 mx-2 sm:mx-0'>
      <Title classNames='text-center'>{t('menu.title')}</Title>
      <div className='flex lg:gap-8 mt-2 '>
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
                <Skeleton isLoaded={imageLoaded} className='w-full rounded-xl'>
                  {(item.image && (
                    <Image
                      src={process.env.NEXT_PUBLIC_BACK_END_URL + item.image}
                      alt='preview'
                      width={800}
                      height={600}
                      className='w-full h-auto rounded-xl'
                      onLoad={() => setImageLoaded(true)}
                    />
                  )) || (
                    <Image
                      src='/assets/svg/peppers.svg'
                      alt='preview'
                      width={800}
                      height={600}
                      className='w-full h-auto rounded-xl'
                      onLoad={() => setImageLoaded(true)}
                    />
                  )}
                </Skeleton>

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
        <SidebarMenuMobile />
      </div>
    </div>
  )
}

export default Menu
