import React from 'react'
import { TfiMinus } from "react-icons/tfi";

const Characteristic = ({ itemData }) => {
    // console.log(itemData?.characteristic);
    // console.log(Object.values(itemData?.characteristic));
    // console.log(Object.keys(itemData?.characteristic));
    const character = ['Вага', 'Штук', 'Тип м’яса', 'Гатунок', 'Термін придатності', 'ТУ', 'Оболонка/тара', 'Пакування', 'Температура зберігання']
    return (
        <>
            {character.map((charact, i) => (
                <div key={i} className='border-b text-xs  sm:text-base h-[40px] p-2  even:bg-gray-200 odd:bg-white odd:border-s'>
                    {
                        itemData.characteristic[character[i]] ?
                            itemData.characteristic[character[i]] :
                            <TfiMinus />
                    }
                </div>
            ))}
        </>
    )
}

export default Characteristic