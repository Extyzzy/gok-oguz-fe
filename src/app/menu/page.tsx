'use client'

import CardMenu from '../componets/CardMenu/CardMenu'
import useGetMenuCardsItems from '../../../hooks/useGetMenuCardsItems'
import SidebarMenu from '@/app/componets/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/app/componets/SidebarMenu/SidebarMenuMobile'

const Menu = () => {
  const menuCardsList = useGetMenuCardsItems()

  return (
    <div className="flex gap-8 pt-16 mb-10">
      <SidebarMenu />
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:w-auto">
        {
          menuCardsList.map((item, index) => (
            <CardMenu
              key={index}
              imagePath={item.image}
              {...item}
            />
          ))
        }
      </div>
      <SidebarMenuMobile />
    </div>
  )
}

export default Menu
