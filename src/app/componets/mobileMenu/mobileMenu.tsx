import Link from 'next/link'
import { useTranslation } from 'react-i18next'

const MobileMenu = () => {
  const { t } = useTranslation()
  return (
    <nav
      className="md:hidden block bg-black text-white py-4 z-50 fixed bottom-3 left-1/2  transform -translate-x-1/2 -translate-y w-[85%] rounded-3xl inset-x-0 ">
      <div className="flex justify-center mx-auto">
        <ul className="flex items-center gap-12 font-medium">
          <li className="hover:underline hover:underline-offset-8">
            <Link href="/">{t('header.main_page')}</Link>
          </li>
          <li className="hover:underline hover:underline-offset-8">
            <Link href="/menu">{t('header.menu')}</Link>
          </li>
          <li className="hover:underline hover:underline-offset-8">
            <Link href="/contacts">{t('header.contacts')}</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MobileMenu
