'use client'

import { SearchManufacturer } from '@/components'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type={'submit'} className={`-ml-3 z-10 ${otherClasses}`}>
    <Image
      src={'/magnifying-glass.svg'}
      alt={'magnifying-glass'}
      width={40}
      height={40}
      className={'object-contain'}
    />
  </button>
)

type Props = {}

export default function SearchBar(props: Props) {
  const router = useRouter()
  const [manufacturer, setManufacturer] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (manufacturer === '' || model === '') {
      return alert('Please fill in the search bar')
    }

    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
  }

  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (model) {
      searchParams.set('model', model)
    } else {
      searchParams.delete('model')
    }

    if (manufacturer) {
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`
    router.push(newPathName)
  }

  return (
    <form className={'searchbar'} onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />

        <SearchButton otherClasses={'sm:hidden'} />
      </div>

      <div className={'searchbar__item'}>
        <Image
          src={'/model-icon.png'}
          alt={'car model'}
          height={25}
          width={25}
          className={'h-[20px] w-[20px] ml-4 absolute'}
        />
        <input
          type="text"
          name={'model'}
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder={'Tiguan'}
          className={'searchbar__input'}
        />
        <SearchButton otherClasses={'sm:hidden'} />
      </div>
      <SearchButton otherClasses={'max-sm:hidden'} />
    </form>
  )
}
