'use client'

import { Car } from '@/app/models/car.model'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Image from 'next/image'
import { generateCarImageUrl } from '@/utils'

type Props = {
  isOpen: boolean
  closeModal: () => void
  car: Car
}

export default function CarDetails(props: Props) {
  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog
          as={'div'}
          className={'relative z-10'}
          onClose={props.closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter={'ease-out duration-300'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'ease-in duration-100'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <div className={'fixed inset-0 bg-black bg-opacity-25'} />
          </Transition.Child>
          <div className={'fixed inset-0 overflow-y-auto'}>
            <div
              className={
                'flex min-h-full items-center justify-center p-4 text-center'
              }
            >
              <Transition.Child
                as={Fragment}
                enter={'ease-out duration-300'}
                enterFrom={'opacity-0 scale-55'}
                enterTo={'opacity-100 scale-100'}
                leave={'ease-in duration-100'}
                leaveFrom={'opacity-100 scale-100'}
                leaveTo={'opacity-0 scale-55'}
              >
                <Dialog.Panel
                  className={
                    'relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white text-left shadow-xl gap-5 flex flex-col p-6 transition-all'
                  }
                >
                  <button
                    className={
                      'absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                    }
                    type={'button'}
                    onClick={props.closeModal}
                  >
                    <Image
                      src={'/close.svg'}
                      alt={'close'}
                      height={20}
                      width={20}
                      className={'object-contain'}
                    />
                  </button>
                  <div className={'flex-1 flex flex-col gap-3'}>
                    <div
                      className={
                        'relative w-full h-40 bg-cover bg-pattern bg-center rounded-lg'
                      }
                    >
                      <Image
                        src={generateCarImageUrl(props.car)}
                        alt={'car_model'}
                        fill
                        priority
                        className={'object-contain'}
                      />
                    </div>
                    <div className={'flex gap-3'}>
                      <div
                        className={
                          'flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'
                        }
                      >
                        <Image
                          src={generateCarImageUrl(props.car, '29')}
                          alt={'car_model'}
                          fill
                          priority
                          className={'object-contain'}
                        />
                      </div>
                      <div
                        className={
                          'flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'
                        }
                      >
                        <Image
                          src={generateCarImageUrl(props.car, '33')}
                          alt={'car_model'}
                          fill
                          priority
                          className={'object-contain'}
                        />
                      </div>
                      <div
                        className={
                          'flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'
                        }
                      >
                        <Image
                          src={generateCarImageUrl(props.car, '13')}
                          alt={'car_model'}
                          fill
                          priority
                          className={'object-contain'}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={'flex-1 flex flex-col gap-2'}>
                    <h2 className={'font-semibold capitalize text-xl'}>
                      {props.car.make} {props.car.model}
                    </h2>
                    <div className={'mt-3 flex flex-wrap gap-4'}>
                      {Object.entries(props.car).map(([key, value]) => (
                        <div
                          key={key}
                          className={
                            'flex justify-between gap-5 w-full text-right'
                          }
                        >
                          <h4 className={'text-gray capitalize'}>
                            {key.replace('_', ' ')}
                          </h4>
                          <p className={'font-semibold text-black'}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
