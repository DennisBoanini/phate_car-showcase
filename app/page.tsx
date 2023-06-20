import { CarCard, CustomFilter, Hero, SearchBar } from '@/components'
import React from 'react'
import { fetchCars } from '@/utils'
import { Car } from '@/app/models/car.model'
import { fuels, yearsOfProduction } from '@/constants'
import ShowMoreButton from '@/components/ShowMoreButton'

export default async function Home({ searchParams }: any) {
  const allCars: Car[] = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    model: searchParams.model || '',
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
  })
  const isDataEmpty =
    !Array.isArray(allCars) || allCars.length === 0 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className={'mt-12 padding-x padding-y max-width'} id={'discover'}>
        <div className={'home__text-container'}>
          <h1 className={'text-4xl font-extrabold'}>Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className={'home__filters'}>
          <SearchBar />

          <div className={'home__filter-container'}>
            <CustomFilter title={'fuel'} options={fuels} />
            <CustomFilter title={'years'} options={yearsOfProduction} />
          </div>
        </div>

        {isDataEmpty ? (
          <div className={'home__error-container'}>
            <h2 className={'text-black text-xl font-bold'}>Oops, no results</h2>
          </div>
        ) : (
          <section>
            <div className={'home__cars-wrapper'}>
              {allCars?.map((car: Car, index: number) => (
                <CarCard key={index} car={car} />
              ))}
            </div>

            <ShowMoreButton
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        )}
      </div>
    </main>
  )
}
