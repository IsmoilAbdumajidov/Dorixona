import React, { createContext, useEffect, useReducer } from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Nomatch from './pages/NotFoundRoute/Nomatch'
import { reducer } from './reduser/reduser'
import { ToastContainer } from 'react-toastify'
import Detail from './pages/Detail'
import WishList from './pages/WishList'
import Scale from './pages/Scale'
import Discount from './pages/Discount'
import Contact from './pages/Contact'
import { fetchDiscount } from './Fetches/productFetching'
import Cart from './pages/Cart'

export const ProductsContext = createContext()

const initialValue = {
  products: [],
  categories: [],
  detail: [],
  wishlist: [],
  cart: [],
  scale: [],
  allPrice: 0,
  contact: [],
  discount: [],
  loading: true,
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []
    const scale = JSON.parse(localStorage.getItem("scale")) || []
    dispatch({ type: "UPDATE_CART", payload: cart })
    dispatch({ type: "UPDATE_WISHLIST", payload: wishlist })
    dispatch({ type: "UPDATE_SCALE", payload: scale })
    fetchDiscount(dispatch)
  }, [])



  return (
    <ProductsContext.Provider value={[state, dispatch]}>
      <div className='flex flex-col h-full'>


        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='dark'
        />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/product/:detailSlug' element={<Detail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<WishList />} />
          <Route path='/compare' element={<Scale />} />
          <Route path='/contact' element={<Contact />} />
          {state.discount.length ? <Route path='/discount' element={<Discount />} /> : ""}
          <Route path='*' element={<Nomatch />} />
        </Routes>
        <Footer />
      </div>
    </ProductsContext.Provider>
  )
}

export default App