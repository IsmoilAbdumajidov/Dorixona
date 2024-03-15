import React, { useContext } from 'react'
import { VscChromeClose } from "react-icons/vsc";
import { Link } from 'react-router-dom';
import ChooseCart from './ChooseCart';
import { ProductsContext } from '../App';

const Modal = ({ setModal }) => {
    const [{allPrice},_] = useContext(ProductsContext)
    return (
        <div className='bg-black/60 w-full h-screen p-1 sm:p-3 flex items-center justify-center fixed top-0 left-0 z-10'>
            <div className='relative w-[600px] h-[95%] border p-6 bg-white rounded'>
                <div className='flex items-center justify-between mb-3'>
                    <h1>Retsept</h1>
                    <button onClick={() => setModal(false)}><VscChromeClose className="w-5 h-5" /></button>
                </div>
                <div className='overflow-y-scroll h-[70%] sm:h-[80%]'>
                    <ChooseCart/>
                </div>
                <div className='border-t'>
                    <div className='flex items-center justify-between text-xl font-bold border-b py-2'>
                        <div>Jami:</div>
                        <div className='text-2xl text-[#008eda]'>{Math.floor(allPrice).brm()} uzs</div>
                    </div>
                    <div className='flex flex-col sm:flex-row justify-between gap-3'>
                        <button onClick={() => setModal(false)} className='flex-1 bg-transparent hover:bg-slate-600 transition-all hover:text-white border border-slate-600 text-slate-600 p-2 rounded'>Tanlashda davometish</button>
                        <Link to={"/cart"} className='flex-1'>
                            <button className='bg-black border border-black text-white p-2 w-full rounded'>
                                Buyurtma berish
                            </button>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal