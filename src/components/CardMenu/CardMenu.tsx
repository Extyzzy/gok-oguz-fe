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
  onClickCard: () => void
}

const CardMenu = ({ imagePath, weight, price, slug, onClickCard, ...props }: CardMenuProps) => {
  const { i18n } = useTranslation()

  return (
    <div
      onClick={() => onClickCard()}
      className='cursor-pointer bg-beige hover:shadow rounded-2xl sm:h-[340px] h-auto border border-[#882727] overflow-hidden'
    >
      {(imagePath && (
        <Image
          src={process.env.NEXT_PUBLIC_BACK_END_URL + imagePath}
          alt={slug}
          className='h-[190px] sm:h-[200px] w-full object-cover'
          width={300} // example width, adjust to your actual layout
          height={200}
          placeholder='blur'
          blurDataURL='/assets/svg/peppers.svg'
        />
      )) || (
        <Image
          src='/assets/svg/peppers.svg'
          alt={slug}
          className='h-[190px] sm:h-[200px] w-full border-b  border-[#882727]'
          width={65}
          height={50}
        />
      )}

      <h3 className='pl-4 font-medium !text-md md:!text-lg mt-4'>
        {
          //@ts-ignore
          props[`name_${i18n.language}`]
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
              props[`description_${i18n.language}`]
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardMenu
