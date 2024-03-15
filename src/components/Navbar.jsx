import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineBars2 } from "react-icons/hi2";
import logo from "../assets/halal.png"
import { ProductsContext } from '../App';
import { fetchDiscount } from '../Fetches/productFetching';
const navlinkStyle = "py-2 lg:py-4 block group  hover:bg-red-500 lg:hover:bg-transparent rounded-md transition-all";
const spanClass = "group-hover:text-white lg:group-hover:text-red-600 lg:group-hover:pl-0  group-hover:pl-5 transition-all"
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [state, dispatch] = useContext(ProductsContext)
    useEffect(() => {
        fetchDiscount(dispatch)
    }, [])
    return (
        <div className='lg:flex bg-white py-4 items-center justify-between main-container w-full'>
            <div className='flex items-center justify-between'>
                <NavLink to={"/"}>
                    <h1 className='text-3xl font-semibold'>
                        <img className='w-16' src={logo} alt="" />
                    </h1>
                </NavLink>
                <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden '>
                    <HiOutlineBars2 className='w-6 h-6' />
                </button>
            </div>
            <div className={`${isOpen ? "h-auto" : "h-0"} lg:flex lg:h-auto overflow-hidden`}>
                <ul className='lg:flex items-center lg:ml-20 lg:gap-6 mt-5 lg:mt-0 text-[15px]'>
                    <NavLink to={'/'} className={navlinkStyle}><span className={spanClass}>Asosiy sahifa</span></NavLink>
                    <NavLink to={'/about'} className={navlinkStyle}><span className={spanClass}>Sayt haqida</span></NavLink>
                    {/* {state.discount.length ? <NavLink to={'/discount'} className={navlinkStyle}><span className={spanClass}>Discount</span></NavLink> : ""} */}
                    <NavLink to={'/contact'} className={navlinkStyle}><span className={spanClass}>Bog'lanish</span></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Navbar