import banner1 from "../../assets/images/banner-img-1.png";
import banner4 from "../../assets/images/banner-img-4.png";
import banner5 from "../../assets/images/banner-img-5.png";
import mobileBanner from "../../assets/images/mobile-banner.png";
import seeProductArrow from '../../assets/images/see-product.png'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="w-full ">
            {/* Desktop Swiper */}
            <div className="hidden md:block">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 300000,
                        disableOnInteraction: false,
                    }}
                    loop
                    className="h-[600px]"
                >
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img
                                src={banner1}
                                alt="Banner 1"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex justify-center items-center mt-[300px]">
                                <Link to='/all-products'>
                                    <button className="px-6 py-6 cursor-pointer bg-[#001845] !text-white text-lg rounded-md shadow-md transition">
                                        <img className="w-[150px] object-cover" src={seeProductArrow} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img
                                src={banner4}
                                alt="Banner 4"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex justify-center items-center mt-[300px]">
                                <Link to='/all-products'>
                                    <button className="px-6 py-6 cursor-pointer bg-[#001845] !text-white text-lg rounded-md shadow-md transition">
                                        <img className="w-[150px] object-cover" src={seeProductArrow} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="relative w-full h-full">
                            <img
                                src={banner5}
                                alt="Banner 5"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex justify-center items-center mt-[300px]">
                                <Link to='/all-products'>
                                    <button className="px-6 py-6 cursor-pointer bg-[#001845] !text-white text-lg rounded-md shadow-md transition">
                                        <img className="w-[150px] object-cover" src={seeProductArrow} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

            {/* Mobile Banner */}
            <div className="block md:hidden">
                <img
                    src={mobileBanner}
                    alt="Mobile Banner"
                    className="w-full h-auto object-cover"
                />
            </div>
        </div>
    );
};

export default Banner;
