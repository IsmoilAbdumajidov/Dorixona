import React, { useContext } from 'react'
import { ProductsContext } from '../App'
import ListItems from '../components/ListItems'

const WishList = () => {
    const [{wishlist},_] = useContext(ProductsContext)
    // console.log(wishlist);
  return (
    <div className='min-h-screen'>
        <ListItems list={wishlist} remove={"wishlist"}/>
    </div>
  )
}

export default WishList