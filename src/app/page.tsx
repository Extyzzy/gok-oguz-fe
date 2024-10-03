'use client'

import Image from 'next/image'
import Button from './componets/Button/button'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
// @ts-ignore
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

   const images = [
    '/assets/images/surpa.png',
    'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/a8e68509f9e34fd381d8070e2b7aa3eb/96e39763f14900ac5719e9ec719a8c78.webp',
    'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/b91acd91a22e4ce3bfc6e9ebccce8fd2/c7fc65dc1036c355c949ddb35f70f5b8.webp',
    'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/22070080a0234aef9e1c28d15fc8c342/f8882cf91547433b16347bb00612fe49.webp',
    'https://straus.s3.amazonaws.com/media/CACHE_IMG/products2/fef6e61bff0044db8d42f26fc6e86888/dbcd5b36c3d4bdca29a11dd098a544f9.webp'
  ];

  return (
    <>
      <section className="w-[80%] md:w-auto flex md:text-left text-center justify-between pt-12 md:pt-28">
        <div className="md:mt-12">
          <h1 className="flex text-2xl md:text-5xl md:w-[600px] leading-normal font-semibold ">
            {t('home.main_text')}
          </h1>
          <p className="flex md:text-2xl  md:w-[500px] my-6 font-light ">
            {t('home.main_description')}
          </p>
          <div className="flex md:justify-start justify-center md:gap-8 gap-4">
            <Button text={t('buttons.menu')} onClick={() => router.push('/menu')} />
            <a href="tel:079468852">
              <Button text={t('buttons.reservation')} />
            </a>
          </div>
        </div>
        <div
          className="hidden md:flex items-center bg-burgundy w-2/5 md:h-[450px] h-[400px] rounded-tl-full rounded-bl-full md:absolute right-0">
               <div className='w-[400px] ml-8'>
                <Slider {...settings}>
                  {images.map((src, index) => (
                    <div key={index}>
                      <Image
                      src={src}
                      alt="Steak pork"
                      width={350}
                      height={350}
                      className="w-[350px] h-[350px] object-cover rounded-full mx-auto" />
                    </div>
                  ))}
                </Slider>
          </div>

        </div>
      </section>

      <section className="w-[80%] px-6 md:px-0 md:flex mt-12 md:mt-36 md:justify-between">
        <div className="md:w-2/5 flex mx-auto md:mx-0">
          <Image src="/assets/images/Wine-bottle.svg" alt="Wine-bottle" width={400} height={400} />
        </div>
        <div className="md:w-2/4 flex justify-center items-center mt-5 md:mt-20 md:mx-0 mx-auto">
          <div>
            <h2 className="flex text-center md:text-left text-xl md:text-4xl font-medium mb-4 leading-tight">
              {t('home.traditions_title')}
            </h2>

            <h4 className="flex text-medium pb-4 font-light">{t('home.traditions_text')}</h4>
            <p className="font-light"> {t('home.traditions_wines')}</p>
            <ul className="list-disc pl-4 pt-4 leading-loose font-light">
              <li>
                <h3>Cabernet Sauvignon</h3>
              </li>
              <li>
                <h3>Merlot</h3>
              </li>
              <li>
                <h3>Syrah/Shiraz</h3>
              </li>
              <li>
                <h3>Pinot Noir</h3>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="mt-12 md:mt-40">
        <div className="w-full h-[1200px] md:h-[800px] bg-burgundy -left-0 absolute z-0 pt-12" />
        <div className="z-10 relative">
          <p className="text-white text-xl md:text-4xl text-center pb-6 md:pb-12 pt-12">{t('photos.photo_title')}</p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="">
              <Image
                className="max-w-none"
                src="/assets/images/restaurant-photo1.png"
                alt="restaurant-photo1"
                width={400}
                height={600}
              ></Image>
            </div>
            <div className="text-white md:w-3/12 text-center  md:text-left">
              <Image
                className="h-[300px] text-center md:text-left mx-auto md:mx-0"
                src="/assets/images/restaurant-photo3.png"
                alt="restaurant-photo3"
                width={400}
                height={400}
              ></Image>
              <p className="pt-6 leading-loose font-light px-4 md:px-0">{t('photos.restaurant_description')}</p>
              <p className="pt-6 px-4 md:px-0">{t('photos.restaurant_atmosphere')}</p>
            </div>
            <div className="text-white md:w-2/6 xl:block hidden">
              <Image
                className="h-[300px]"
                src="/assets/images/restaurant-photo2.png"
                alt="restaurant-photo2"
                width={450}
                height={400}
              ></Image>
              <p className="pt-6 leading-loose font-light">{t('photos.restaurant_places')}</p>
              <p className="pt-6">{t('photos.restaurant_waiters')}</p>
              <div className="flex justify-end">
                <Button
                  classNames="mt-8 border-white hover:border-white hover:!text-black hover:bg-white"
                  text={t('buttons.location')}
                  onClick={() => window.open('https://maps.app.goo.gl/KchdcDHBHo2pMazQ8')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[80%] px-8 md:px-0 md:flex mt-40 mb-12">
        <div className="md:w-2/5 mx-auto md:mx-o">
          <Image src="/assets/svg/Moldova.svg" alt="Moldova" width={500} height={400} />
        </div>
        <div className="md:w-2/5 mx-auto md:mx-o items-center">
          <div>
            <p className="text-lg md:text-xl font-bold">{t('gagauz_culture.title')}</p>
            <p className="text-sm md:text-base my-6">{t('gagauz_culture.gagauz_location')}</p>
            <p className="text-sm md:text-base">{t('gagauz_culture.gagauz_languages')}</p>
            <p className="text-sm md:text-base mt-6">{t('gagauz_culture.gagauz_example')}</p>
          </div>
        </div>
      </section>
    </>
  )
}
