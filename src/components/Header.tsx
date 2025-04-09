import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { cn } from '@/library/utils'

const Header = () => {
  const { i18n, t } = useTranslation()

  return (
    <header className='border-b-2 border-black bg-beige h-18 sticky top-0 z-50'>
      <div className='flex justify-center md:justify-between mx-auto container'>
        <ul className='hidden md:flex items-center gap-12 grow-[0.7] font-medium'>
          <li className='hover:underline hover:underline-offset-8'>
            <Link href='/'>{t('header.main_page')}</Link>
          </li>
          <li className='hover:underline hover:underline-offset-8'>
            <Link href='/menu'>{t('header.menu')}</Link>
          </li>
          <li className='hover:underline hover:underline-offset-8'>
            <Link href='/contacts'>{t('header.contacts')}</Link>
          </li>
        </ul>
        <div className='flex items-center justify-center  md:justify-start py-2 gap-4 text-xl grow font-bold'>
          <Link href='/' className='flex items-center gap-4'>
            <Image src='/assets/svg/logo.svg' alt='Gok-Oguz' width={65} height={50} />
            <h1>Gök-Oguz</h1>
          </Link>
        </div>
        <div className='flex px-3 lg:px-6 gap-2 lg:gap-8 bg-black text-white items-center grow-0 font-light text-sm lg:text-lg'>
          <span
            onClick={() => i18n.changeLanguage('ro')}
            className={cn(
              'cursor-pointer opacity-70 hover:opacity-100 transition duration-150 ease-out hover:ease-in hover:underline underline-offset-8',
              {
                'opacity-100 underline': i18n.language === 'ro',
              },
            )}
          >
            RO
          </span>
          <span
            onClick={() => i18n.changeLanguage('en')}
            className={cn(
              'cursor-pointer opacity-70 hover:opacity-100 transition duration-150 ease-out hover:ease-in hover:underline underline-offset-8',
              {
                'opacity-100 underline': i18n.language === 'en',
              },
            )}
          >
            EN
          </span>
          <span
            onClick={() => i18n.changeLanguage('ru')}
            className={cn(
              'cursor-pointer opacity-70 hover:opacity-100 transition duration-150 ease-out hover:ease-in hover:underline underline-offset-8',
              {
                'opacity-100 underline': i18n.language === 'ru',
              },
            )}
          >
            RU
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
