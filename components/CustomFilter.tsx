'use client'

import { KeyValue } from '@/app/models/key-value.model'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { updateSearchParam } from '@/utils'

type Props = {
  title: string
  options: KeyValue[]
}

export default function CustomFilter(props: Props) {
  const [selected, setSelected] = useState<KeyValue>(props.options[0])
  const router = useRouter()

  const handleUpdateParams = (value: string) => {
    router.push(updateSearchParam(props.title, value.toLowerCase()))
  }

  return (
    <div className={'w-fit'}>
      <Listbox
        value={selected}
        onChange={(e: KeyValue) => {
          setSelected(e)
          handleUpdateParams(e.value)
        }}
      >
        <div className={'relative w-fit z-10'}>
          <Listbox.Button className={'custom-filter__btn'}>
            <span className={'block truncate'}>{selected.title}</span>
            <Image
              src={'/chevron-up-down.svg'}
              alt={'chevron-up-down'}
              width={20}
              height={20}
              className={'ml-4 object-contain'}
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave={'transition ease-in duration-100'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <Listbox.Options className={'custom-filter__options'}>
              {props.options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? 'bg-primary-blue text-white' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option.title}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
