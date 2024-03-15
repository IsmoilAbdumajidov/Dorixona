import React from 'react'
import Skeleton from 'react-loading-skeleton'

const ReactSkeleton = ({ card }) => {
    console.log();
    return (
        Array(card).fill(0).map((_, i) => (
            <div key={i} className='rounded-md shadow flex flex-col'>
                <div className='cursor-pointer'>
                    <div className='w-full h-full aspect-square object-cover'>
                        <Skeleton className='w-full h-full' />
                    </div>
                </div>
                <div className='sm:p-4 p-2 flex flex-col gap-1 flex-1'>
                    <div className='mb-3 gap-1 sm:gap-2 flex flex-col'>
                        <div className='h-3 sm:h-6'>
                            <Skeleton className='w-full h-full' />
                        </div>
                        <div className='w-[85%] h-2 sm:h-3'>
                            <Skeleton className='w-full h-full' />
                        </div>
                        <div className='w-[75%] h-2 sm:h-3'>
                            <Skeleton className='w-full h-full' />
                        </div>
                        <div className='w-[65%] h-2 sm:h-3'>
                            <Skeleton className='w-full h-full' />
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row  mt-auto gap-2'>
                        <div className="flex-1">
                            <Skeleton className='w-full rounded-md h-full sm:p-[5px]' />
                        </div>
                        <div className='flex sm:gap-3 gap-1'>
                            <div className='flex-1'>
                                <Skeleton className='w-full rounded-md sm:w-10 sm:h-10 h-full sm:p-5' />
                            </div>
                            <div className='flex-1'>
                                <Skeleton className='w-full rounded-md sm:w-10 sm:h-10 h-full sm:p-5' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}

export default ReactSkeleton