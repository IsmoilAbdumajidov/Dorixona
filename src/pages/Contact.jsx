import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from '../App'
import SpinnerSmall from '../components/spinerSmall/SpinnerSmall';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import parse from 'html-react-parser';
import { instance } from '../api/Api';
import { toast } from 'react-toastify';
// inputs style
const inputStyle = "p-3 text-sm"
// initialValues
const initialValue = {
    name: "",
    email: "",
    message: "",
}
const Contact = () => {
    const [state, _] = useContext(ProductsContext)
    console.log(state.contact);
    const [dataForm, setDataForm] = useState(initialValue)
    const [spin, setSpin] = useState(false)
    const [status, setStatus] = useState(null)

    // get all input values
    const inputHandler = (e) => {
        const key = e.target.name
        setDataForm({ ...dataForm, [key]: e.target.value })
    }

    const sendDataForm = async (e) => {
        setSpin(true)
        e.preventDefault()
        try {
            const resp = await instance.post("/support/", dataForm, {
                headers: { "Content-type": "application/json" },
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
        <div className='min-h-screen w-full'>
            <div className="main-container  mt-10 grid grid-cols-1 gap-7 lg:grid-cols-2">
                <div className="col-span-1 p-3 flex flex-col gap-3 border">
                    <h1 className='text-xl font-bold mb-3'>Namangan city, Afsona park</h1>
                    <h1>Phone: <a href={`tel:${state.contact[0]?.phone_number}`}>{state.contact[0]?.phone_number}</a></h1>
                    <h1>Email: <span>{state.contact[0]?.email}</span></h1>
                </div>
                <div className='col-span-1 p-3 border'>
                    <div className='flex flex-col sm:flex-row'>
                        <h1 className='text-xl font-bold mb-3'>Ma'lumotlaringizni kiriting</h1>
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
                    <form onSubmit={sendDataForm} className='flex flex-col gap-4'>
                        <input onChange={inputHandler} value={dataForm.name} type="text" name='name' className={inputStyle} placeholder="*F.I.O..." />
                        <input onChange={inputHandler} value={dataForm.email} type="number" name='email' className={inputStyle} placeholder="*Telefon raqamingizni kiriting..." />
                        <textarea onChange={inputHandler} value={dataForm.message} className={inputStyle} name="message" placeholder="Komentariya" ></textarea>
                        <button disabled={!dataForm.name || !dataForm.email || !dataForm.message ? true : false} className='bg-black p-3 disabled:opacity-25 disabled:cursor-not-allowed text-white rounded-md'>Submit</button>
                    </form>
                </div>
                <div className='lg:col-span-2 p-3 border'>
                    {parse(state?.contact[0] ? state.contact[0]?.location : "")}
                </div>
            </div>
        </div>
    )
}

export default Contact