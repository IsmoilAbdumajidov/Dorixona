import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { instance } from "../api/Api";
import { ProductsContext } from "../App";
import Skeleton from "react-loading-skeleton";

const HomeSlider = () => {
    const [isfetching, setIsfetching] = useState(true)
    const [dataSlider, setDataSlider] = useState();

    const fetchSlider = async () => {
        setIsfetching(true)
        try {
            const data = await instance.get("/slider");
            setDataSlider(data?.data);
            // console.log(data);
            setIsfetching(false)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSlider();
    }, []);
    return (
        <div>
            <>
                {
                    isfetching ?
                        <Skeleton className='h-[250px] sm:h-[350px] md:h-[500px] rounded-xl w-full mb-4' /> :
                        dataSlider &&
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            loop={true}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 3500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            modules={[Pagination, Autoplay, Navigation]}
                            className="mySwiper"
                        >
                            {
                                dataSlider ? dataSlider?.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <img
                                            src={item?.image}
                                            alt=""
                                            className="h-[250px] sm:h-[350px] md:h-[500px] rounded-xl object-cover origin-center w-full"
                                        />
                                    </SwiperSlide>
                                ))
                                    : ""}
                        </Swiper>
                }
            </>
        </div>
    );
};

export default HomeSlider;
