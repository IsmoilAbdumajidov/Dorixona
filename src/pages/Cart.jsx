import React, { useContext, useEffect, useState } from 'react'
import ChooseCart from '../components/ChooseCart'
import { ProductsContext } from '../App'
import SpinnerSmall from '../components/spinerSmall/SpinnerSmall'
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { MdErrorOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import { instance } from '../api/Api';
import Cookies from 'js-cookie';
import BookingModule from '../components/BookingModule';
import Firma from '../components/Firma';

const initialValue = {
    name: "",
    lname: "",
    email: "",
    number: "",
    address: "",
    message: "",
}

const Cart = () => {
    const [state, dispatch] = useContext(ProductsContext)
    const [modal, setModal] = useState(false)
    const [count, setCount] = useState(0)
    const [spin, setSpin] = useState(false)
    const [status, setStatus] = useState(null)
    const [dataForm, setDataForm] = useState(initialValue)

    const dataFormLS = JSON.parse(localStorage.getItem("cart")) || []
    // console.log(dataFormLS);

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
                    "Content-type": "application/json",
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
            {modal && <BookingModule setModal={setModal} />}
            <div className="main-container grid grid-cols-1 xl:grid-cols-2 mt-10 items-start gap-8">
                <div className='col-span-1 flex flex-col gap-8 max-h-[500px] overflow-y-scroll pe-2'>
                    <ChooseCart />
                </div>
                <div className=''>

                    <div className='col-span-1 flex flex-col gap-5 max-h-[500px] overflow-y-scroll pe-2'>
                        <Firma title={"Rosinka (Novomoskovskaya filiali) Rosinka (Novomoskovskaya filiali)"} setModal={setModal} count={count} state={state} />
                        <Firma title={"Bravo Pharm"} setModal={setModal} count={count} state={state} />
                        <Firma title={"Globus"} setModal={setModal} count={count} state={state} />
                        <Firma title={"Dori-Darmon АК (filial 60 Dori-Darmon АК"} setModal={setModal} count={count} state={state} />
                        <Firma title={"Apteka '999'"} setModal={setModal} count={count} state={state} />
                        <Firma title={"Eco Med"} setModal={setModal} count={count} state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart