import React from 'react'
import "./spinner.css"
const Spinner = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[60vh]'>

            <div className="fingerprint-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
                <div className="spinner-ring"></div>
            </div>
        </div>
    )
}

export default Spinner