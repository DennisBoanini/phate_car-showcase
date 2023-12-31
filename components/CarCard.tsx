'use client'

import { Car } from '@/app/models/car.model'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import Image from 'next/image'
import { CarDetails, CustomButton } from '@/components/index'
import { useState } from 'react'

type Props = {
  car: Car
}

export default function CarCard(props: Props) {
  const carRent = calculateCarRent(props.car.city_mpg, props.car.year)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className={'car-card group'}>
      <div className={'car-card__content'}>
        <h2 className={'car-card__content-title'}>
          {props.car.make} {props.car.model}
        </h2>
      </div>

      <p className={'flex mt-6 text-[32px] font-extrabold'}>
        <span className={'self-start text-[14px] font-semibold'}>$</span>
        {carRent}
        <span className={'self-end text-[14px] font-medium'}>/day</span>
      </p>
      <div className={'relative w-full h-40 my-3 object-contain'}>
        <Image
          src={generateCarImageUrl(props.car)}
          alt={'car_model'}
          fill
          priority
          className={'object-contain'}
        />
      </div>
      <div className={'relative flex w-full mt-2'}>
        <div
          className={
            'flex group-hover:invisible w-full justify-between text-gray'
          }
        >
          <div className={'flex flex-col justify-center items-center gap-2'}>
            <Image
              src={'/steering-wheel.svg'}
              alt={'steering-wheel'}
              width={20}
              height={20}
            />
            <p className={'text-[14px]'}>
              {props.car.transmission === 'a' ? 'Automatic' : 'Manual'}
            </p>
          </div>
          <div className={'flex flex-col justify-center items-center gap-2'}>
            <Image src={'/tire.svg'} alt={'tire'} width={20} height={20} />
            <p className={'text-[14px]'}>{props.car.drive.toUpperCase()}</p>
          </div>
          <div className={'flex flex-col justify-center items-center gap-2'}>
            <Image src={'/gas.svg'} alt={'gas'} width={20} height={20} />
            <p className={'text-[14px]'}>{props.car.city_mpg} MPG</p>
          </div>
        </div>

        <div className={'car-card__btn-container'}>
          <CustomButton
            title={'View More'}
            isDisabled={false}
            containerStyles={'w-full py-[16px] rounded-full bg-primary-blue'}
            textStyles={'text-white text-[14px] leading-[17px] font-bold'}
            rightIcon={'/right-arrow.svg'}
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={props.car}
      />
    </div>
  )
}
