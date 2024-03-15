import React from 'react'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiOutlineScale } from "react-icons/hi2";

const Checked = ({ cardId }) => {

    const cart = JSON.parse(localStorage.getItem("cart"))
    const isInCart = cart?.find(elem => elem.id === cardId)
    const wishlist = JSON.parse(localStorage.getItem("wishlist"))
    const isInWishlist = wishlist?.find(elem => elem.id === cardId)
    const scale = JSON.parse(localStorage.getItem("scale"))
    const isInScale = scale?.find(elem => elem.id === cardId)
    return (
        <div className='flex flex-col gap-2 text-white absolute right-2 top-2'>
            {
                isInCart && (
                    <div className='bg-green-500 p-1 rounded-full'>
                        <HiOutlineShoppingCart className='w-5 h-5' />
                    </div>
                )
            }
            {
                isInWishlist && (
                    <div className='bg-[#07b8fc] p-1 rounded-full'>
                        <IoDocumentTextOutline  className='w-5 h-5' />
                    </div>
                )
            }
            {
                isInScale && (
                    <div className='bg-amber-500 p-1 rounded-full'>
                        <HiOutlineScale className='w-5 h-5' />
                    </div>
                )
            }
        </div>
    )
}

export default Checked