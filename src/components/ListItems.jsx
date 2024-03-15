import React, { useContext, useState } from "react";
import Checked from "./Checked";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineScale } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import ReactSkeleton from "./skeleton/ReactSkeleton";
import { ProductsContext } from "../App";
import { Link } from "react-router-dom";
import Modal from "./Modal";


const ListItems = ({ list, remove }) => {
  const [state, dispatch] = useContext(ProductsContext)
  const [modal, setModal] = useState(false)
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

  const quantityHandler = (ishora, item) => {
    let dataFromLS = JSON.parse(localStorage.getItem("cart")) || []
    const el = dataFromLS?.find(card => ((card.id === item.id) ? item : ""))
    // console.log(el);
    if (el !== undefined) {
      if (ishora) {
        el.count = el.count + 1
      }
      else {
        el.count = el.count !== 1 ? el.count - 1 : 1
      }
      dataFromLS.forEach(card => { card.id === item.id ? card.count = el.count : "" })
      localStorage.setItem("cart", JSON.stringify(dataFromLS))
      dispatch({ type: "UPDATE_CART", payload: dataFromLS })
    }
    else {
      item = { ...item, count: 1 }
      localStorage.setItem("cart", JSON.stringify([...dataFromLS, item]))
      dispatch({ type: "UPDATE_CART", payload: [...dataFromLS, item] })
    }
    setModal(true)
  }

  // console.log(list);
  return (
    <div className="main-container mt-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-8 pb-20">
      {modal && <Modal setModal={setModal} />}
      {state.loading ?
        <ReactSkeleton card={8} />
        :
        list.length ? (
          list.map((item, i) => (
            <div key={i} className="overflow-hidden flex flex-col shadow rounded-md sm:rounded-lg hover:shadow-xl transition-all  relative">
              <Link to={`/product/${item.slug}`} className="relative cursor-pointer">
                {/* <div className="absolute bottom-0 left-0 rounded text-sm bg-green-500 text-white px-1">
                  {item?.type}
                </div> */}
                <img
                  className="w-full aspect-square object-cover object-center"
                  src={item?.images[0]}
                  alt=""
                />
                <Checked cardId={item.id} />
              </Link>
              <div className="sm:p-4 p-2 relative flex flex-col gap-2 flex-1 border">
                <Link to={`/product/${item.slug}`} className="text-slate-900 text-sm sm:text-lg font-semibold sm:font-bold cursor-pointer">
                  {item?.name}
                </Link>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm  block">
                    Narx:
                    <span className="text-green-500 text-sm sm:text-lg font-semibold ml-3">
                      {(Math.floor(item?.price)).brm()}
                      <span className="text-black"> uzs</span>
                    </span>
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm  block">
                    Kategoriya:
                    <span className="text-slate-900 font-semibold ml-3">
                      {item?.category?.name}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row mt-auto gap-2">
                  <button onClick={() => quantityHandler(true, item)} className="bg-green-500 gap-2 flex items-center justify-center  hover:bg-green-600 text-white rounded-md p-1 sm:py=2 flex-1">
                    <HiOutlineShoppingCart className="w-5 h-5" />
                    <span className="text-sm sm:text-base">Buyurtma berish</span>
                  </button>
                  <div className="flex gap-2">
                    <button onClick={() => toggleHandler("wishlist", "UPDATE_WISHLIST", item)} className={`${remove==="wishlist" ? "bg-black" : "bg-[#008eda] hover:bg-[#07b8fc]"} transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2`}>

                      {
                        remove === "wishlist" ? <GoTrash className="w-5 h-5" /> : <IoDocumentTextOutline  className="w-5 h-5" />
                      }
                    </button>
                    <button onClick={() => toggleHandler("scale", "UPDATE_SCALE", item)} className="bg-amber-400 hover:bg-amber-500 transition-all flex-1 flex items-center justify-center text-white rounded-md p-1 sm:p-2">
                      <HiOutlineScale className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="min-h-[500px] ps-10">No items...</p>
        )}
    </div>
  );
};
export default ListItems;
