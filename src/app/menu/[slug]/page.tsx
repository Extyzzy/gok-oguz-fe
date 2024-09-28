'use client'

import CardMenu from '../../componets/CardMenu/CardMenu'
import useGetMenuCardsItems from '../../../../hooks/useGetMenuCardsItems'
import { FC } from 'react'
import SidebarMenu from '@/app/componets/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/app/componets/SidebarMenu/SidebarMenuMobile'

interface MenuProps {
  params: {
    slug: string
  }
}

const Menu: FC<MenuProps> = ({ params }) => {
  const menuCardsList = useGetMenuCardsItems()
  const filteredCards = menuCardsList.filter((card) => card.group === params.slug)

  return (
    <div className="flex gap-8 pt-16 mb-10">
      <SidebarMenu />
      <div className="flex flex-wrap justify-center md:justify-start gap-4 w-[80%] md:w-auto">
        {filteredCards.map((item, index) => (
          <CardMenu key={index} imagePath={item.image} {...item} />
        ))}
      </div>
      <SidebarMenuMobile />
    </div>
  )
}

export default Menu
