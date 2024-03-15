import React, { useContext, useEffect, useState } from 'react'
import ChooseCart from '../components/ChooseCart'
import { ProductsContext } from '../App'
import SpinnerSmall from '../components/spinerSmall/SpinnerSmall'
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { instance } from '../api/Api';
import Cookies from 'js-cookie';

const initialValue = {
    name: "",
    lname: "",
    email: "",
    number: "",
    address: "",
    message: "",
}

const   Cart = () => {
    const [state, dispatch] = useContext(ProductsContext)

    const [count, setCount] = useState(0)
    const [spin, setSpin] = useState(false)
    const [status, setStatus] = useState(null)
    const [dataForm, setDataForm] = useState(initialValue)

    const dataFormLS = JSON.parse(localStorage.getItem("cart")) || []
    console.log(dataFormLS);

    useEffect(() => {
        let sanoq = 0
        state.cart.forEach(item => sanoq = item.count + sanoq)
        setCount(sanoq)
    }, [state?.cart])

    const inputHandler = (e) => {
        const key = e.target.name
        setDataForm({ ...dataForm, [key]: e.target.value })
    }
    const csrfToken = Cookies.get("csrftoken")
    const sendDataForm = async (e) => {
        setSpin(true)
        e.preventDefault()
        try {
            const resp = await instance.post("/support/", { ...dataForm, selectId: dataFormLS }, {
                headers: { 
                    "Content-type": "application/json" ,
                    'X-CSRFToken': csrfToken
                },
            })

            toast.success("Success")
            console.log(resp);
            setSpin(true)
            setStatus(true)
            setDataForm(initialValue)
        } catch (error) {
            toast.error("Error")
            console.log(error);
            setStatus(false)
            setSpin(false)
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus(null)
        }, 4000)
        return () => clearInterval(timer)
    }, [status])
    return (
        <div className='min-h-screen'>
            <div className="main-container grid grid-cols-1 xl:grid-cols-2 mt-10 items-start gap-8">
                <div className='col-span-1 flex flex-col gap-8'>
                    <ChooseCart />
                </div>
                <div className="flex flex-col gap-5 col-span-1 rounded-md p-3 lg:p-6 border">
                    <div className="flex items-center justify-between text-xl font-bold border-b py-2">
                        <div>Total:</div>
                        <div className='text-2xl text-red-500'>${state.allPrice}</div>
                    </div>
                    <div>
                        <h1 className='flex gap-2'><span>Product quantity:</span> <span>{count}</span></h1>
                        <h1 className='flex gap-2'><span>Deliver:</span><span>Free</span></h1>
                    </div>
                    <div>
                        <div className='flex flex-col sm:flex-row'>
                            <h1 className='text-lg font-bold mb-5'>Contact detail</h1>
                            <div className='ms-auto me-5'>
                                {spin ? <SpinnerSmall /> : null}
                                <div className='flex gap-3 items-center'>
                                    {
                                        status ? (
                                            <>
                                                <IoCheckmarkDoneOutline className='text-green-500 w-5 h-5' />
                                                <h3>Success</h3>
                                            </>
                                        ) : status === false ?
                                            (
                                                <>
                                                    <MdErrorOutline className='text-red-500 w-5 h-5' />
                                                    <h3>Error</h3>
                                                </>
                                            ) : null
                                    }
                                </div>
                            </div>
                        </div>
                        <form onSubmit={sendDataForm} className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                            <input value={dataForm.name} onChange={inputHandler} name='name' type="text" placeholder="First name*" />
                            <input value={dataForm.lname} onChange={inputHandler} name='lname' type="text" placeholder='Last name*' />
                            <input value={dataForm.number} onChange={inputHandler} name='number' type="number" placeholder='Phone number*' />
                            <input value={dataForm.email} onChange={inputHandler} name='email' type="email" placeholder='Email*' />
                            <input value={dataForm.address} onChange={inputHandler} name='address' className='md:col-span-2' type="text" placeholder='Address*' />
                            <textarea value={dataForm.message} onChange={inputHandler} name='message' className='md:col-span-2' placeholder='Message' >
                            </textarea>
                            <button disabled={!dataForm.name || !dataForm.number || !dataForm.address || !dataForm.lname || !dataFormLS.length ? true : false} onClick={sendDataForm} className='bg-black disabled:opacity-40 disabled:cursor-not-allowed p-3 w-full text-white rounded-md'>Оформити замовлення</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Cart