import Image from 'next/image'
import { useTranslation } from 'react-i18next'

interface CardMenuProps {
  slug: string
  name_en: string
  name_ru: string
  name_ro: string
  imagePath?: string
  weight: number
  description_ru: string
  description_ro: string
  description_en: string
  price: number
  onPressImage: () => void
}

const CardMenu = ({ imagePath, weight, price, slug, onPressImage, ...props }: CardMenuProps) => {
  const { i18n } = useTranslation()

  return (
    <div className='bg-beige hover:shadow rounded-2xl sm:h-[340px] h-auto border border-[#882727] overflow-hidden'>
      {(imagePath && (
        <Image
          src={process.env.NEXT_PUBLIC_BACK_END_URL + imagePath}
          alt={slug}
          className='h-[150px] sm:h-[200px] w-full object-cover'
          width={65}
          height={50}
          placeholder='blur'
          blurDataURL='/assets/svg/peppers.svg'
          onClick={() => onPressImage()}
        />
      )) || (
        <Image
          src='/assets/svg/peppers.svg'
          alt={slug}
          className='h-[150px] sm:h-[200px] w-full border-b  border-[#882727]'
          width={65}
          height={50}
        />
      )}

      <h3 className='pl-4 font-medium !text-md md:!text-lg mt-4'>
        {
          //@ts-ignore
          props.title
        }
      </h3>
      <div className='flex items-center justify-between font-light mt-2 px-4'>
        <div className='font-extralight w-full'>
          <div className='flex justify-between'>
            <p className='text-md md:text-md italic'>{weight} gr</p>
            <div>
              <span className='text-lg md:text-xl font-medium whitespace-nowrap'>{price} mdl</span>
            </div>
          </div>

          <p className='text-md md:text-base w-[90%] line-clamp-2 mb-4 sm:mb-0'>
            {
              //@ts-ignore
              props.description
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardMenu
