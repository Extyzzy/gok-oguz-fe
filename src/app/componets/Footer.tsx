import Image from 'next/image'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="flex justify-center md:pb-0 pb-12 w-[80%] md:w-auto md:text-lg text-base">
      <div className="pb-8">
        <Image
          src="/assets/svg/Black_barashek.svg"
          alt="barashek"
          width={240}
          height={270}
          className="mx-auto"
        />

        <p className="text-center mt-8 font-light ">10:00 - 23:00</p>
        <p className="text-center my-2 font-light ">Calea Orheiului 19/A, Chișinău</p>
        <p className="text-center font-light w-[220px] md:w-auto">
          ©{year} Gök-Oguz, Chișinău. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
export default Footer
