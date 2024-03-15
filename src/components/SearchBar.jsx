import React, { useEffect, useRef, useState } from 'react'
import DropCateory from './DropCateory'
import { Link, useSearchParams } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5"
import { HiOutlineScale } from "react-icons/hi2";
import { RiCustomerServiceLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { fetchAllCategory } from '../Fetches/productFetching';
import { useContext } from 'react';
import { ProductsContext } from '../App';
import { toast } from 'react-toastify';
import ModalForm from './ModalForm';



const SearchBar = () => {
    const [state, dispatch] = useContext(ProductsContext)
    const [count, setCount] = useState(0)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        let sanoq = 0
        state.cart.forEach(item => sanoq = item.count + sanoq)
        setCount(sanoq)
    }, [state?.cart])
    useEffect(() => {
        fetchAllCategory({ dispatch })
    }, [])
    const inputRef = useRef()
    const dropRef = useRef()
    const [_, setParam] = useSearchParams()
    const searchHandler = () => {
        const inputValue = inputRef.current.value
        inputRef.current.value = ''
        dropRef.current.value = "all"
        if (inputValue) {
            setParam({ search: `${inputValue}` })
        }
        else {
            setParam({})
            toast.error("Inputga ma'lumot kiritilmadi!!!")
        }
    }


    return (
        <div className='bg-[#008eda]  py-3 sticky z-10 top-[-1px]'>
            {showModal ?  <ModalForm setShowModal={setShowModal}/> : null}
            <div className='main-container flex gap-5  flex-wrap items-center justify-between'>
                <div className='relative bg-[#fff] px-3 py-1 cursor-pointer rounded-md w-full sm:w-64'>
                    <DropCateory inputRef={inputRef} dropRef={dropRef} category={state?.categories} />
                </div>
                <div className='flex text-black lg:w-[500px] xl:w-[650px] w-full order-2 lg:order-1'>
                    <input ref={inputRef} type="text" className='rounded-s-md rounded-e-none w-full py-3 text-[14px] bg-white placeholder:text-black' placeholder="Kerakli mahsulot nomini kiriting..." />
                    <button onClick={searchHandler} className='bg-green-500 rounded-e-md rounded-s-none text-[14px] text-white py-3 px-3 sm:px-10'>Izlash</button>
                </div>
                <div className='flex gap-6 flex-wrap justify-evenly items-center text-white order-1 lg:order-2 w-full sm:w-auto'>
                    <Link to={"/cart"} className='flex cursor-pointer flex-col items-center relative text-[12px]'>
                        <HiOutlineShoppingCart className='w-9 h-9' />
                        <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center  justify-center rounded-full'>{count}</span>
                        <span>Savat</span>
                    </Link>
                    <Link to={"/wishlist"} className='flex cursor-pointer flex-col items-center relative text-[12px]'>
                        <IoDocumentTextOutline  className='w-9 h-9' />
                        <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center  justify-center rounded-full'>{state.wishlist.length}</span>
                        <span>Retsept</span>
                    </Link>
                    <Link to={"/compare"} className='flex cursor-pointer flex-col items-center relative text-[12px]'>
                        <HiOutlineScale className='w-9 h-9' />
                        <span className='absolute right-0 top-0 bg-black w-max px-1 min-w-4 h-4 flex items-center  justify-center rounded-full'>{state.scale.length}</span>
                        <span>Solishtirish</span>
                    </Link>
                    <div onClick={() => setShowModal(true)} className='flex cursor-pointer flex-col items-center relative text-[12px]'>
                        <RiCustomerServiceLine className='w-9 h-9' />
                        <span>Murojaat qilish</span>
                    </div>
                    <Link to={"/"} className='flex cursor-pointer flex-col items-center relative text-[12px]'>
                        <AiOutlineHome className='w-9 h-9' />
                        <span>Asosiy sahifa</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SearchBar