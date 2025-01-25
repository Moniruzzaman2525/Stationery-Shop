import banner1 from "../../assets/images/banner-img-1.png";
import banner2 from "../../assets/images/banner-img-2.png";
import banner3 from "../../assets/images/banner-img-3.png";
import banner4 from "../../assets/images/banner-img-4.png";
import banner5 from "../../assets/images/banner-img-5.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css"; 
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} 
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000, 
                    disableOnInteraction: false,
                }}
                loop
                className="h-[600px]"
            >
                <SwiperSlide>
                    <img src={banner1} alt="Banner 1" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner2} alt="Banner 2" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner3} alt="Banner 3" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner4} alt="Banner 4" className="w-full h-full object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={banner5} alt="Banner 5" className="w-full h-full object-cover" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
