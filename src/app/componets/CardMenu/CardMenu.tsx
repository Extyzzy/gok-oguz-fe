import Image from 'next/image'

interface CardMenuProps {
  title: string
  imagePath?: string
  weight: number
  description: string
  price: number
}

const CardMenu = ({ title, imagePath, weight, description, price }: CardMenuProps) => {
  return (
    <div
      className="bg-beige hover:shadow rounded-2xl w-[80%] lg:w-[28%] sm:w-[80%] sm:h-[310px] h-[275px] border border-[#882727] overflow-hidden">
      {(imagePath && (
        <Image
          src={imagePath}
          alt={title}
          className="h-[150px] sm:h-[170px] w-full object-cover"
          width={65}
          height={50}
        />
      )) || (
        <Image
          src="/assets/svg/peppers.svg"
          alt={title}
          className="h-[150px] sm:h-[170px] w-full border-b  border-[#882727]"
          width={65}
          height={50}
        />
      )}

      <h3 className="pl-4 font-medium !text-md md:!text-lg mt-4">{title}</h3>
      <div className="flex items-center justify-between font-light mt-2 px-4">
        <div className="font-extralight">
          <p className="text-md md:text-md italic">{weight} gr</p>
          <p className="text-md md:text-base w-[158px] line-clamp-2">{description}</p>
        </div>
        <div>
          <span className="text-lg md:text-xl font-medium whitespace-nowrap">{price} mdl</span>
        </div>
      </div>
    </div>
  )
}

export default CardMenu
