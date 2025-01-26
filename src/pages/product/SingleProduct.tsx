import { useParams } from "react-router-dom";

const SingleProduct = () => {

    const {productId} = useParams()

    console.log(productId)

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
                    src="https://via.placeholder.com/400x400"
                    alt="Product"
                    className="rounded-lg shadow-lg"
                />
            </div>

            <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div className="text-sm text-gray-500 mb-2">
                    <span>Books </span>
                    <span className="mx-1">→</span>
                    <span>Medicine </span>
                    <span className="mx-1">→</span>
                    <span className="font-medium text-gray-700">Surgery</span>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Brand Name - Product name, its specifications and all other details of it
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus
                    blandit pretium sed non enim. Maecenas lacinia non orci at aliq{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        Read more
                    </a>
                </p>

                <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">
                        <span className="font-medium text-gray-800">SKU:</span> 8901425031926
                    </p>
                    <p className="text-2xl font-bold text-gray-900">USD $2.00</p>
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

                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
