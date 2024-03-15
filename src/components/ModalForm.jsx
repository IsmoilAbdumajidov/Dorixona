import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { instance } from '../api/Api';
import { toast } from 'react-toastify';
import SpinnerSmall from './spinerSmall/SpinnerSmall';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
const initialValue = {
    name: "",
    number: "",
    message: "",
}
const ModalForm = ({ setShowModal }) => {
    const [dataForm, setDataForm] = useState(initialValue)
    const [spin, setSpin] = useState(false)
    const [status, setStatus] = useState(null)
    const inputHandler = (name, value) => {
        setDataForm({ ...dataForm, [name]: value })
        // setDataForm((prev)=>({...prev,[name]:value}))
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
        const timer = setTimeout(()=>{
            setStatus(null)
        },4000)
        return ()=> clearInterval(timer)
    }, [status])


    return (
        <div className='bg-black/70 backdrop-blur-md w-full h-screen p-1 sm:p-3 flex items-center justify-center fixed top-0 left-0 z-10'>
            <div className='relative w-[500px] h-auto border p-6 bg-white rounded'>
                <div className="my-4">
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-black text-lg font-medium'>Admin bilan bog'lanish</h1>
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
                    <button onClick={() => setShowModal(false)} className='bg-transparent text-black border-none absolute top-3 right-3'>
                        <AiOutlineClose className='w-5 h-5' />
                    </button>
                </div>
                <form onSubmit={sendDataForm} className='flex flex-col gap-4'>
                    <input onChange={(e) => inputHandler(e.target.name, e.target.value)} name='name' type="text" className='p-3 text-sm text-black' placeholder='F.I.O' />
                    <input onChange={(e) => inputHandler(e.target.name, +e.target.value)} name='number' type="number" className='p-3 text-sm text-black' placeholder='Telefon raqamingiz' />
                    <textarea onChange={(e) => inputHandler(e.target.name, e.target.value)} name='message' className='p-3 text-sm text-black' placeholder='Xabaringiz'></textarea>
                    <button  disabled={!dataForm.name || !dataForm.number || !dataForm.message ? true : false} className='bg-green-500 disabled:opacity-25 disabled:cursor-not-allowed p-3 text-white rounded-md'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ModalForm