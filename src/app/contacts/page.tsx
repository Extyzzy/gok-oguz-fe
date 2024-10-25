'use client'

import Image from 'next/image'
import Title from '../componets/Title/Title'
import { useTranslation } from 'react-i18next'

const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const Contacts = () => {
  const { t } = useTranslation()
  const todayDate = new Date()
  const europeanDate = !todayDate.getDay() ? 6 : todayDate.getDay()
  const hour = todayDate.getHours()
  const isOpen = hour >= 10 && hour < 23

  return (
    <div className='lg:mb-38 mb-16 relative px-4 sm:px-0'>
      <div className='pt-2'>
        <Title classNames='text-center'>{t('contacts.title')}</Title>
      </div>
      <div className='flex flex-col leading-loose gap-2'>
        <div className='flex gap-4'>
          <Image src='/assets/svg/phone.svg' alt='phone' width={25} height={25}></Image>
          <p>079468852</p>
        </div>
        <div className='flex gap-4'>
          <Image src='/assets/svg/instagram.svg' alt='instagram' width={25} height={25}></Image>
          <a href='https://www.instagram.com/gok_oguz__restaurant/' target='_blank'>
            @gok_oguz_restaurant
          </a>
        </div>
        <div className='flex gap-4'>
          <Image src='/assets/svg/facebook.svg' alt='facebook' width={25} height={25}></Image>
          <a href='https://www.facebook.com/restaurant.Gok.Oguz' target='_blank'>
            Gök-Oguz
          </a>
        </div>
        <div className='flex gap-4'>
          <Image src='/assets/svg/tiktok.svg' alt='tiktok' width={25} height={25}></Image>
          <a href='https://www.tiktok.com/@gok.oguz.restaurant?lang=en' target='_blank'>
            @gok.oguz.restaurant
          </a>
        </div>
        <div className='flex gap-4'>
          <Image src='/assets/svg/mail.svg' alt='email' width={25} height={25}></Image>
          <p>gok-oguz.md@yandex.ru</p>
        </div>
        <div className='flex gap-4'>
          <Image src='/assets/svg/vector.svg' alt='location' width={25} height={25}></Image>
          <a href='https://maps.app.goo.gl/KchdcDHBHo2pMazQ8' target='_blank'>
            str. Calea Orheiului 19A, Chișinău
          </a>
        </div>
      </div>
      <div>
        <div className='flex gap-4 text-xl items-center mt-12'>
          <Image src='/assets/svg/clock.svg' alt='clock' width={25} height={32}></Image>
          <p className='md:text-xl text-base'>{t('contacts.work_hours')}</p>
        </div>
        <ul className='mt-4 '>
          {week.map((day, index) => {
            return (
              <li key={index} className='flex items-center gap-4'>
                <span className='bg-black rounded w-6 text-center mb-1 text-white'>
                  {t(`week.${day}`)}
                </span>
                10:00 - 23:00{' '}
                {europeanDate === index + 1 &&
                  (isOpen ? (
                    <span className='text-green-500'>{t('contacts.openNow')}</span>
                  ) : (
                    <span className='text-red-500'>{t('contacts.closedNow')}</span>
                  ))}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='lg:absolute -right-24 top-32 mt-12 '>
        <Image
          className='rounded-l-lg'
          src='/assets/images/map.png'
          alt='gok-oguz map'
          width={850}
          height={850}
        ></Image>
      </div>
    </div>
  )
}

export default Contacts
