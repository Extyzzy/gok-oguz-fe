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
      className="bg-beige hover:shadow rounded-2xl sm:h-[340px] h-auto border border-[#882727] overflow-hidden">
      {(imagePath && (
        <Image
          src={imagePath}
          alt={title}
          className="h-[150px] sm:h-[200px] w-full object-cover"
          width={65}
          height={50}
        />
      )) || (
        <Image
          src="/assets/svg/peppers.svg"
          alt={title}
          className="h-[150px] sm:h-[200px] w-full border-b  border-[#882727]"
          width={65}
          height={50}
        />
      )}

      <h3 className="pl-4 font-medium !text-md md:!text-lg mt-4">{title}</h3>
      <div className="flex items-center justify-between font-light mt-2 px-4">
        <div className="font-extralight w-full">
          <div className='flex justify-between'>
              <p className="text-md md:text-md italic">{weight} gr</p>
                <div>
                  <span className="text-lg md:text-xl font-medium whitespace-nowrap">{price} mdl</span>
                  </div>
          </div>
      
          <p className="text-md md:text-base w-[90%] line-clamp-2 mb-4 sm:mb-0">{description}</p>
        </div>
        
      </div>
    </div>
  )
}

export default CardMenu
