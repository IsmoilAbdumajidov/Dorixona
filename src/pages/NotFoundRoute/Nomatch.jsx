import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import animate from "./animate404.json"
const Nomatch = () => {
    return (
        <div className='main-container py-32'>
            <Player
                autoplay
                loop
                src={animate}
                className='w-[90%] sm:w-[70%]'
            >
            </Player>
        </div>
    )
}

export default Nomatch