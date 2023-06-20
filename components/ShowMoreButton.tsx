'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { CustomButton } from '@/components/index'
import { updateSearchParam } from '@/utils'

type Props = {
  pageNumber: number
  isNext: boolean
}

export default function ShowMoreButton(props: Props) {
  const router = useRouter()

  const handleNavigation = () => {
    const newLimit = (props.pageNumber + 1) * 10

    return router.push(updateSearchParam('limit', newLimit.toString()))
  }

  return (
    <div className={'w-full flex-center gap-5 mt-10'}>
      {!props.isNext && (
        <CustomButton
          title={'Show more'}
          isDisabled={false}
          btnType={'button'}
          containerStyles={'bg-primary-blue rounded-full text-white'}
          handleClick={handleNavigation}
        />
      )}
    </div>
  )
}
