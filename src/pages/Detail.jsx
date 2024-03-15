import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DetailFunc } from '../Fetches/productFetching';
import { ProductsContext } from '../App';
import Checked from '../components/Checked';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineScale } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import parse from 'html-react-parser';
import Spinner from '../components/spinner/Spinner';


const Detail = () => {
    const { detailSlug } = useParams()
    const imgRef = useRef()
    console.log(detailSlug);
    const [state, dispatch] = useContext(ProductsContext)
    useEffect(() => {
        DetailFunc(detailSlug, dispatch)
    }, [])



    const imgHandler = (e) => {
        imgRef.current.src = e.target.src
    }

    return (

        <>

            {state.loading ? <Spinner /> :
                <div className='main-container w-full mt-10 grid grid-cols-1 lg:grid-cols-2 p-10 gap-6'>
                    <div className='flex flex-col gap-3 sm:flex-row items-center justify-between border w-full rounded-md lg:col-span-2 py-5 px-2'>
                        <div className='text-slate-950 text-xl sm:text-3xl font-semibold cursor-pointer'>
                            {state?.detail[0]?.name}
                        </div>
                        <p className='text-white p-2 rounded-md text-sm font-normal bg-green-500'><span>Kategoriya: </span>{state?.detail[0]?.category.name}</p>
                    </div>
                    <div className='flex gap-5 border overflow-hidden flex-col sm:flex-row  col-span-1 rounded-md'>
                        <div className='flex flex-wrap sm:flex-nowrap overflow-y-scroll max-h-[400px]  gap-3 sm:flex-col  sm:w-[100px] '>
                            {state?.detail[0]?.images.map((item, i) => (
                                <img onClick={imgHandler} src={item} key={i} className='cursor-pointer w-[100px] h-[80px] object-cover object-center' />
                            ))}
                        </div>
                        <div className='relative cursor-pointer border w-full'>
                            {/* <div className='absolute bottom-0 rounded left-0 text-sm bg-green-600 text-white px-1'>
                                salom
                            </div> */}
                            <img ref={imgRef} className='w-full h-full object-cover object-center aspect-[5/4]' src={state?.detail[0]?.images[0]} alt="" />
                            <Checked />
                        </div>
                    </div>
                    <div className='p-4 relative flex flex-col col-span-1 gap-2 flex-1 border rounded-md'>
                        <div className='flex flex-col gap-3'>
                            {/* <span className={`font-bold sm:text-xl ${state?.detail[0]?.discount !== 0 ? "block" : "hidden"}`}>Discount:<span className='ms-4 text-red-500 line-through font-semibold'>${state?.detail[0]?.discount}</span></span> */}
                            <span className='font-bold sm:text-xl block'>Narx:<span className='ms-4 text-green-500 text-2xl font-semibold'>${Math.floor(state?.detail[0]?.price).brm()}</span></span>
                            {state?.detail[0] ?
                                <span className='font-bold sm:text-xl block'>Mahsulot haqida:<span className='ms-4 text-base font-normal'><br />{parse(state?.detail[0]?.description)}</span></span>
                                :
                                null
                            }
                        </div>
                        <div className="flex flex-col sm:flex-row mt-auto gap-2">
                            <button className="bg-green-500 gap-2 flex items-center justify-center  hover:bg-green-600 text-white rounded-md p-1 sm:py=2 flex-1">
                                <HiOutlineShoppingCart className="w-5 h-5" />
                                <span className="text-sm sm:text-base">Buyurtma berish</span>
                            </button>
                            <div className="flex gap-2">
                                <button className="bg-[#008eda] hover:bg-[#07b8fc] transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2">
                                    <IoDocumentTextOutline className="w-5 h-5" />
                                </button>
                                <button className="bg-amber-400 hover:bg-amber-500 transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2">
                                    <HiOutlineScale className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {
                        // state?.detail[0]?.characteristic

                    }

                </div>
            }
        </>
    )
}

export default Detail