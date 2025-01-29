import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import ProductCard from "../../components/ui/ProductCard";
import { useNavigate } from "react-router-dom";
import { Empty, Skeleton } from "antd";

const BannerProduct = () => {

    const { data: products, isFetching, isError } = useGetAllProductsQuery(undefined);
    const navigate = useNavigate();

    const displayedProducts = products?.data
        ? [...products.data].sort(() => Math.random() - 0.5).slice(0, 6)
        : [];


    return (
        <div className="py-18 px-6 md:px-40">
            <div className="mb-10">
                <h1 className="text-[20px] font-bold text-center mb-2">Featured Products</h1>
                <p className="text-[15px] text-center">Check & Get Your Desired Product!</p>
            </div>

            {isFetching ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            ) : isError || !displayedProducts || displayedProducts.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-100">
                    <Empty description={`No products available`} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {displayedProducts.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            )}

            <div className="text-center mt-6">
                <button
                    className="bg-[#001845] cursor-pointer !text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition"
                    onClick={() => navigate("/all-products")}
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default BannerProduct;
