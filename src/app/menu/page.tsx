'use client'

import CardMenu from '../componets/CardMenu/CardMenu'
import useGetMenuCardsItems from '../../../hooks/useGetMenuCardsItems'
import SidebarMenu from '@/app/componets/SidebarMenu/SidebarMenu'
import SidebarMenuMobile from '@/app/componets/SidebarMenu/SidebarMenuMobile'
import Title from "@/app/componets/Title/Title";
import {useTranslation} from "react-i18next";

const Menu = () => {
  const { t } = useTranslation()
  const menuCardsList = useGetMenuCardsItems()

  return (
      <div className='pt-2 mb-4'>
          <Title classNames='text-center'>{t('menu.title')}</Title>
          <div className="flex gap-8 mt-2 ">
              <SidebarMenu/>
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 flex-wrap justify-center md:justify-start gap-4 w-[90%] lg:w-[69%]">
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
              <SidebarMenuMobile/>
          </div>
      </div>

  )
}

export default Menu
