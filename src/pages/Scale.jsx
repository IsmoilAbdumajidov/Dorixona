import React, { useContext } from 'react'
import ScaleCarausel from '../components/ScaleCarausel'
import { ProductsContext } from '../App'

const Scale = () => {
  const character = ['Apteka "Dori-Darmon" AK (37)', 'Globus Sanoat Savdo', 'Apteka "MFS-Servis" DP type', 'Apteka "Davo"', 'Apteka "Tabletka"', 'Apteka "Novbahor Farma Line"', '"NeoDorixona"', '"ATM Partners"', '"Jurabek Laboratories"']
  const [state, _] = useContext(ProductsContext)
  return (
    <div className='min-h-screen mt-5'>
      {
        state?.scale.length ?
          (
            <div className="grid grid-cols-3 lg:grid-cols-4">
              <div className='col-span-1 sm:ps-3'>
                <div className='h-[560px]'></div>
                <div className='mt-1 border-t'>
                  {
                    character.map((item, i) => (
                      <div key={i} className='border-b text-xs h-[40px] md:text-base overflow-hidden sm:font-semibold sm:ps-3 even:bg-gray-200 odd:bg-white odd:border-e p-2'>
                        {item}:
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className='col-span-2 lg:col-span-3'>
                <ScaleCarausel state={state} />
              </div>
            </div>
          ) : <p className="min-h-[500px] ps-10 pt-10">Mmahsulot topilmadi...</p>
      }
    </div>
  )
}

export default Scale