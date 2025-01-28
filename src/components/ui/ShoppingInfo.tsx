import React from "react";

import freeDelivery from "../../assets/images/free-delivery.png";
import differentPayment from "../../assets/images/different-payment.png";
import collect from "../../assets/images/collect.png";

const ShoppingInfo = () => {
    const features = [
        {
            image: freeDelivery,
            title: "Free and Fast delivery",
            description: "Applies to UAE and Oman",
        },
        {
            image: differentPayment,
            title: "Different payment options",
            description: "We are now accepting payment through cash, card or bank transfer",
        },
        {
            image: collect,
            title: "Click and collect",
            description: "Order products from our website and collect them from our store",
        },
    ];

    return (
        <div className="px-6 md:px-40 py-18 bg-[#F9F9FB] text-center">
            <div className="mb-[-20px]">
                <h2 className="text-3xl font-semibold text-gray-800">Shopping made easy!</h2>
                <p className="text-lg text-gray-600 ">Now shop at our store with complete convenience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center px-6 py-4">
                        <img
                            src={feature.image}
                            alt={feature.title}
                            className="w-[200px] h-[200px] mb-4 object-contain"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-gray-600 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingInfo;
