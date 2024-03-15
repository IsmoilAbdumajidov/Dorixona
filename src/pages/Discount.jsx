import React, { useContext, useEffect } from 'react'
import { ProductsContext } from '../App'
import { fetchDiscount } from '../Fetches/productFetching'
import ListItems from '../components/ListItems'

const Discount = () => {
    const [state, dispatch] = useContext(ProductsContext)
    useEffect(() => {
        fetchDiscount(dispatch)
    }, [])

    return (
        <div className='min-h-screen'>
            <ListItems list={state.discount} />
        </div>
    )
}

export default Discount