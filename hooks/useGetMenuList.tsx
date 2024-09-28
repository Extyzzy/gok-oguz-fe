import { useTranslation } from 'react-i18next'

const useGetMenuList = () => {
  const { t } = useTranslation()

  return [
    {
      iconSrc: '/assets/svg/menuList/gustari.svg',
      name: t('menuList.main_dish'),
      slug: 'main_dish',
    },
    {
      iconSrc: '/assets/svg/menuList/lamb.svg',
      name: t('menuList.lamb'),
      slug: 'lamb',
    },
    {
      iconSrc: '/assets/svg/menuList/chicken.svg',
      name: t('menuList.chicken'),
      slug: 'chicken',
    },
    {
      iconSrc: '/assets/svg/menuList/fish.svg',
      name: t('menuList.fish'),
      slug: 'fish',
    },
    {
      iconSrc: '/assets/svg/menuList/garnish.svg',
      name: t('menuList.garnishes'),
      slug: 'garnishes',
    },
    {
      iconSrc: '/assets/svg/menuList/salad.svg',
      name: t('menuList.salads'),
      slug: 'salads',
    },
    {
      iconSrc: '/assets/svg/menuList/soup.svg',
      name: t('menuList.supe'),
      slug: 'supe',
    },
    {
      iconSrc: '/assets/svg/menuList/gozleme.svg',
      name: t('menuList.bread'),
      slug: 'bread',
    },
    {
      iconSrc: '/assets/svg/menuList/mamaliga.svg',
      name: t('menuList.mamaliga'),
      slug: 'mamaliga',
    },
  ]
}

export default useGetMenuList
