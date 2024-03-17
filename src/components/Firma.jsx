import React from 'react'

const Firma = ({ title,setModal,count,state,zakolat,num }) => {
    return (
        <div className="flex flex-col gap-4  col-span-1 ">
            <div className='flex flex-col rounded-md  px-3 pt-4 pb-3 lg:px-6 border'>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <h1 className='font-semibold text-lg mb-4'>{title}</h1>
                </div>
                <div className="flex items-center justify-between mb-3  border-b py-2">
                    <div>
                        <p className='text-[13px] text-gray-500'>Maxsulot miqdori:</p>
                        <p> {count}</p>
                    </div>
                    <div>
                        <p className='text-[13px] text-gray-500'>Zakolat:</p>
                        <p>{zakolat}%</p>
                        {/* <p>{(Math.floor(state.allPrice/100*12/1000)*1000).brm()}</p> */}
                    </div>
                    <div className=' font-bold'>
                        <div>Jami:</div>
                        <div className='text-lg text-red-500'>{(Math.floor(state.allPrice / 1000) * 1000 + 1000*zakolat).brm()}<span className='text-black font-semibold'> uzs</span></div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <div>
                        <p className='text-[13px] text-gray-500'>Ish tartibi:</p>
                        <p>08:00-22:00</p>
                    </div>
                    <div>
                        <p className='text-[13px] text-gray-500'>Telefon:</p>
                        <p>{num}</p>
                    </div>
                    <button onClick={() => setModal(true)} className="bg-green-500 gap-2 text-[13px]  hover:bg-green-600 text-white rounded-md py-2   px-3  ">
                        Buyurtma berish
                    </button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Firma