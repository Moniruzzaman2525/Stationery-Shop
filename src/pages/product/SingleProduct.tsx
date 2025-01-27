import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/feathers/product/productApi";
import { Skeleton, Alert, message, Button, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feathers/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/feathers/auth/authSlice";

const SingleProduct = () => {
    const { productId } = useParams();
    const { data: singleProductData, isFetching, isError } = useGetSingleProductQuery(productId)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector(useCurrentToken);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (value: number) => {
        if (value >= 1) {
            setQuantity(value);
        }
    };

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            message.warning("Please log in to add products to the cart.");
            localStorage.setItem("redirectAfterLogin", location.pathname);
            navigate("/login");
            return;
        }

        if (singleProductData) {
            if (!singleProductData.stock) {
                message.warning(`Only ${singleProductData.stock} items are available in stock.`);
                return;
            }

            dispatch(addToCart({ product: singleProductData, quantity }));
            message.success("Product added to cart!");
            setQuantity(1);
        }
    };


    if (isFetching) {
        return (
            <div className="flex flex-col md:flex-row gap-8 p-8">
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Skeleton.Image style={{ width: 200, height: 200 }} />
                </div>
                <div className="w-full md:w-1/2">
                    <Skeleton active paragraph={{ rows: 6 }} />
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Alert
                    message="Error"
                    description="Failed to fetch product details. Please try again later."
                    type="error"
                    showIcon
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="absolute top-8 left-8">
                <button className="text-gray-500 hover:text-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
                <img
                    src={singleProductData?.photo || "/placeholder-image.png"}
                    alt={singleProductData?.name || "Product"}
                    className="rounded-lg w-[50%] shadow-lg"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className="text-sm text-gray-500 mb-2">
                    <span>Stationery</span>
                    <span className="mx-1">→</span>
                    <span>{singleProductData?.category || "N/A"}</span>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    {singleProductData?.name || "Product Name"} -{" "}
                    {singleProductData?.brand || "Brand"} -{" "}
                    {singleProductData?.category || "Category"}
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {singleProductData?.description || "No description available for this product."}
                </p>

                <div className="mb-4">
                    {/* <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium text-gray-800">SKU:</span>{" "}
                        {singleProductData?.sku || "Not available"}
                    </p> */}
                    <p className="text-2xl font-bold text-gray-900">
                        USD ${singleProductData?.price || "0.00"}
                    </p>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Order within 4 hours and get it delivered by today
                </p>

                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}>
                            -
                        </Button>
                        <InputNumber
                            min={1}
                            max={singleProductData?.inStock || 0}
                            value={quantity}
                            className="w-20"
                            onChange={(value) =>
                            { if (value !== null) handleQuantityChange(value); }
                            }
                        />
                        <Button className="ml-[8px]" onClick={() => handleQuantityChange(quantity + 1)} disabled={quantity >= (singleProductData?.inStock || 0)}>
                            +
                        </Button>
                    </div>
                    {/* <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                            className="px-3 py-2 text-gray-500 hover:text-gray-800"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="w-12 cursor-pointer text-center text-gray-800 border-x outline-none"
                            value={quantity}
                            onChange={(e) =>
                                handleQuantityChange(Number(e.target.value))
                            }
                            min={1}
                            max={singleProductData?.inStock || 0}
                        />
                        <button
                            className="px-3 cursor-pointer py-2 text-gray-500 hover:text-gray-800"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={quantity >= (singleProductData?.inStock || 0)}
                        >
                            +
                        </button>
                    </div> */}
                    <button
                        className="bg-[#001845] cursor-pointer text-white px-6 py-2 rounded-lg"
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
