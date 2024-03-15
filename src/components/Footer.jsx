import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/halal.png"
import { RiCustomerServiceLine } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import ModalForm from './ModalForm';
import { ProductsContext } from '../App';
import { fetchContact } from '../Fetches/productFetching';
import SocialLink from './SocialLink';

const Footer = () => {
  const [showModal, setShowModal] = useState(false)
  const [state,dispatch] = useContext(ProductsContext)
  useEffect(() => {
    fetchContact(dispatch)
  }, [])
  // console.log(state.contact);
  return (
    <div className='bg-[#f3f3f3]'>
          {showModal ?  <ModalForm setShowModal={setShowModal}/> : null}
      <div className="main-container  text-center lg:text-start text-[14px] py-14 xl:gap-32 gap-5 grid grid-cols-1 lg:grid-cols-3">
        <div className='flex flex-col items-center lg:items-start justify-between col-span-1'>
          <Link to={"/"}>
            <h1 className='text-3xl font-semibold'>
              <img className='w-20' src={logo} alt="" />
            </h1>
          </Link>
          <button onClick={()=>setShowModal(true)} className="cursor-pointer rounded w-52 py-2 gap-3 px-3 flex items-center border bg-red-600 text-white my-3 ">
            <RiCustomerServiceLine className='w-9 h-9' />
            <span>Customer Services</span>
          </button>
          <p>&copy; Online Shopping Halal Food</p>
        </div>
        <div className="flex flex-col justify-between items-center lg:items-start gap-4 col-span-1">
          <h1 className="text-lg font-semibold uppercase">
            About Shop
          </h1>
          <ul className="flex flex-col gap-2 text-[14px]">
            <li>
              <Link to={"/"} className='hover:text-red-500'>Home</Link>
            </li>
            <li>
              <Link to={"/about"} className='hover:text-red-500'>About</Link>
            </li>
            <li>
              <Link to={"/discount"} className='hover:text-red-500'>Discount</Link>
            </li>
            <li>
              <Link to={""} className='hover:text-red-500'>Contact</Link>
            </li>
          </ul>
        </div>
        <div className='flex flex-col justify-between items-center lg:items-start col-span-1'>
          <h1 className="text-lg font-semibold uppercase">
            Contact
          </h1>
          <ul className='flex flex-col gap-3 text-[14px]'>
            <li>
              <SocialLink/>
            </li>
            <li>
              <a className='flex gap-2' href={`tel:${state.contact[0]?.phone_number}`}>
                <FiPhone className='w-5 h-5' />
                <span>{state.contact[0]?.phone_number}</span>
              </a>
            </li>
            <li>
              <a className='flex gap-2' href={"#"}>
                <MdOutlineMail className='w-5 h-5' />
                <span>{state.contact[0]?.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer