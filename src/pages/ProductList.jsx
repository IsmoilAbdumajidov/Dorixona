import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../components/HomeSlider'
import ListItems from '../components/ListItems'
import { ProductsContext } from '../App'
import { instance } from '../api/Api'
import { fetchAllProducts } from '../Fetches/productFetching'
import { useSearchParams } from 'react-router-dom'
import { all } from 'axios'


const ProductList = () => {
  const [state, dispatch] = useContext(ProductsContext)
  const [param, _] = useSearchParams()
  const [isReversed, setIsReversed] = useState(true)

  const filter = param.get("filter")
  const search = param.get("search")
  useEffect(() => {
    fetchAllProducts({ dispatch, filter, search })
  }, [filter, search])

  const sortHandler = (type) => {
    setIsReversed(!isReversed)
    const sortArr = state.products.sort((a, b) => {
      if (type === "price") {
        return a.price - b.price
      }
      else if (type == "name") {
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;

        return 0;
      }
    })

    if (type == "default") {
      fetchAllProducts({ dispatch })
    }
    else if (isReversed) {
      dispatch({ type: "PRODUCT_LIST", payload: sortArr })
    }
    else {
      dispatch({ type: "PRODUCT_LIST", payload: sortArr.reverse() })
    }

  }

  return (
    <div className='min-h-[75vh] w-full'>
      <div className='main-container mt-10'>
        <HomeSlider />
      </div>
      <div className='flex flex-col sm:flex-row gap-3 main-container justify-between items-center mt-10'>
        <div className='text-lg font-bold'>Mahsulotlarni Saralash:</div>
        <div className='flex flex-wrap gap-3'>
          <button onClick={() => sortHandler("default")} className='border rounded p-2'>
            Odatiy tartib
          </button>
          <button onClick={() => sortHandler("price")} className='border rounded p-2'>
            Narx boyicha tarib
          </button>
          <button onClick={() => sortHandler("name")} className='border rounded p-2'>
            Nomi boyicha tartibi
          </button>
        </div>
      </div>
      <ListItems list={state?.products} />
    </div>
  )
}

export default ProductList