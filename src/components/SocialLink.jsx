import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { instance } from '../api/Api';
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const SocialLink = () => {
    const [getScoil, setGetScoil] = useState([])
    const socialMedia = {
        twitter: <FaTwitter className='w-5 h-5' />,
        facebook: <FaFacebookF className='w-5 h-5' />,
        telegram: <FaTelegramPlane className='w-5 h-5' />,
        instagram: <FaInstagram className='w-5 h-5' />,
        youtube: <FaYoutube className='w-5 h-5' />,
    }
    const fetchSocialLink = async () => {
        try {
            const resp = await instance.get("/social_link/")
            setGetScoil(resp.data)
            // console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Qandaydir xatolik yuz berdi")
        }
    }
    useEffect(() => {
        fetchSocialLink()
    }, [])


    return (
        <ul className='flex gap-2'>
            {
                getScoil.length ? getScoil.map((social,i)=>(
                    <li key={i} className='w-10 h-10 rounded-full text-white flex items-center justify-center bg-[#008eda]'>
                        <a href={social?.link}>
                            {social ? socialMedia[social?.social] : ""}
                        </a>
                    </li>
                )) : ""
            }
        </ul>
    )
}

export default SocialLink