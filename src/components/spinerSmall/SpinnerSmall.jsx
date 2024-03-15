import React from 'react'
import './spinner.css'

const SpinnerSmall = () => {
    return (
        <div>
            <div className="orbit-spinner">
                <div className="orbit"></div>
                <div className="orbit"></div>
                <div className="orbit"></div>
            </div>
        </div>
    )
}

export default SpinnerSmall