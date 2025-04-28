'use client'

import CardMenu from '@/components/CardMenu/CardMenu'
import useGetMenuCardsItems from '@/hooks/useGetMenuCardsItems'
import SidebarMenu from '@/components/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/components/SidebarMenu/SidebarMenuMobile'
import Title from '@/components/Title/Title'
import { useTranslation } from 'react-i18next'
import { usePublicDishesQuery } from '@/queries/usePublicDishesQuery'

const Menu = () => {
  const { t } = useTranslation()
  const menuCardsList = useGetMenuCardsItems()

  const { data: dishes } = usePublicDishesQuery()

  console.info(dishes)
  return (
    <div className='pt-2 mb-4 mx-2 sm:mx-0'>
      <Title classNames='text-center'>{t('menu.title')}</Title>
      <div className='flex gap-8 mt-2 '>
        <SidebarMenu />
        <div className='grid lg:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center md:justify-start gap-4 w-[90%] lg:w-[69%]'>
          {menuCardsList.map((item, index) => (
            <CardMenu key={index} imagePath={item.image} {...item} />
          ))}
        </div>
        <SidebarMenuMobile />
      </div>
    </div>
  )
}

export default Menu
