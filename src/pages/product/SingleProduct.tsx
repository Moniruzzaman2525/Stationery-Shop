import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/feathers/product/productApi";
import { Skeleton, Alert } from "antd";

const SingleProduct = () => {
    const { productId } = useParams();
    const { data: singleProductData, isFetching, isError } = useGetSingleProductQuery(productId);

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
                    <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium text-gray-800">SKU:</span>{" "}
                        {singleProductData?.sku || "Not available"}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                        USD ${singleProductData?.price || "0.00"}
                    </p>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Order within 4 hours and get it delivered by today
                </p>

                <div className="flex items-center gap-6">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <button className="px-3 py-2 text-gray-500 hover:text-gray-800">-</button>
                        <input
                            type="number"
                            className="w-12 text-center text-gray-800 border-x outline-none"
                            defaultValue={1}
                            min={1}
                        />
                        <button className="px-3 py-2 text-gray-500 hover:text-gray-800">+</button>
                    </div>

                    <button className="bg-[#001845] text-white px-6 py-2 rounded-lg">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
