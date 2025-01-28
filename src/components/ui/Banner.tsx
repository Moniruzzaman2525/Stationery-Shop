import banner1 from '../../assets/images/banner-pic-1.png'
import banner2 from '../../assets/images/banner-pic-2.png'
import banner3 from '../../assets/images/banner-pic-3.png'
import banner4 from '../../assets/images/banner-pic-4.png'
import banner5 from '../../assets/images/banner-pic-5.png'
import banner6 from '../../assets/images/banner-pic-6.png'
import banner7 from '../../assets/images/banner-pic-7.png'
import mobileBanner from "../../assets/images/mobile-banner.png";
import seeProductArrow from '../../assets/images/see-product.png';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const banners = [
        { src: banner1, alt: "Banner 1" },
        { src: banner2, alt: "Banner 2" },
        { src: banner3, alt: "Banner 3" },
        { src: banner4, alt: "Banner 4" },
        { src: banner5, alt: "Banner 5" },
        { src: banner6, alt: "Banner 6" },
        { src: banner7, alt: "Banner 7" },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="w-full relative">
            <div className="hidden md:block h-[700px] relative overflow-hidden">
                {banners.map((banner, index) => (
                    <img
                        key={index}
                        src={banner.src}
                        alt={banner.alt}
                        className={`w-full h-full object-cover absolute transition-opacity duration-1000 ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    />
                ))}

                <button
                    onClick={handlePrev}
                    className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 !text-white rounded-full w-10 h-10 flex justify-center items-center z-10"
                >
                    &#9664;
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 !text-white rounded-full w-10 h-10 flex justify-center items-center z-10"
                >
                    &#9654;
                </button>

                <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2 z-10">
                    <Link to="/all-products">
                        <button className="px-6 py-6 bg-[#001845] text-white text-lg rounded-md shadow-md transition hover:bg-[#002855]">
                            <img className="w-[150px] object-cover" src={seeProductArrow} alt="See Products" />
                        </button>
                    </Link>
                </div>

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {banners.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                                index === currentIndex ? "bg-white" : "bg-gray-400"
                            }`}
                        ></div>
                    ))}
                </div>
            </div>

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
