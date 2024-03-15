import React, { useContext } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { ProductsContext } from '../App';
import { Link } from 'react-router-dom';
import Checked from './Checked';
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import Characteristic from './Characteristic';


const ScaleCarausel = ({ state }) => {
  const [_, dispatch] = useContext(ProductsContext)


  const toggleHandler = (store, dispatchType, item) => {
    item = { ...item, count: 1 }
    let dataFromLS = JSON.parse(localStorage.getItem(store)) || []
    const el = dataFromLS?.find(elem => elem.id === item.id)
    if (el) {
      const filteredArr = dataFromLS.filter(elem => elem.id !== item.id)
      localStorage.setItem(store, JSON.stringify(filteredArr))
      dispatch({ type: dispatchType, payload: filteredArr })
    }
    else {
      localStorage.setItem(store, JSON.stringify([...dataFromLS, item]))
      dispatch({ type: dispatchType, payload: [...dataFromLS, item] })
    }
  }

  return (
    <Swiper slidesPerView={1} breakpoints={{
      900: {
        slidesPerView: 2,
      },
      1280: {
        slidesPerView: 3,

      },
    }} navigation={true} modules={[Navigation]}>
      {
        state?.scale.map((item, i) => (
          <SwiperSlide key={i}>
            <div key={i} className="overflow-hidden mx-1 mb-1 flex flex-col  relative">
              <Link to={`/product/${item.slug}`} className="relative cursor-pointer h-[280px] sm:h-[300px] lg:h-[330px] ">
                <div className="absolute bottom-0 left-0 rounded text-sm bg-green-500 text-white px-1">
                  {item?.type}
                </div>
                <img
                  className="w-full h-full aspect-square object-cover object-center"
                  src={item?.images[0]}
                  alt=""
                />
                <Checked cardId={item.id} />
              </Link>
              <div className="sm:p-4 p-2 h-[280px] sm:h-[260px] lg:h-[230px]  flex flex-col gap-2  border">
                <Link to={`/product/${item.slug}`} className="text-slate-900 text-sm sm:text-lg font-semibold sm:font-bold cursor-pointer">
                  {item?.name}
                </Link>
                <div>
                  <p
                    className={`${item?.discount !== 0 ? "inline" : "hidden"
                      } text-gray-400 text-xs sm:text-sm  block`}
                  >
                    Discount:{" "}
                    <span className="text-red-500 line-through font-semibold ml-3">
                      <span>$</span>
                      {(item?.discount).toFixed(2, 0)}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm  block">
                    Price:{" "}
                    <span className="text-green-500 text-sm sm:text-lg font-semibold ml-3">
                      <span>$</span>
                      {(item?.price).toFixed(2, 0)}
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm  block">
                    Category:{" "}
                    <span className="text-slate-900 font-semibold ml-3">
                      {item?.category?.name}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row mt-auto gap-2">
                  <button className="bg-green-500 gap-2 flex items-center justify-center  hover:bg-green-600 text-white rounded-md p-1 sm:py=2 flex-1">
                    <HiOutlineShoppingCart className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Buy</span>
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => toggleHandler("wishlist", "UPDATE_WISHLIST", item)} className="bg-red-500 hover:bg-red-600 transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2">
                      <HiOutlineHeart className="w-5 h-5" />
                    </button>
                    <button onClick={() => toggleHandler("scale", "UPDATE_SCALE", item)} className="bg-black transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2">
                    <GoTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='border-t'>
              <Characteristic itemData={item} />
            </div>
          </SwiperSlide>
        ))
      }

    </Swiper>
  )
}

export default ScaleCarausel