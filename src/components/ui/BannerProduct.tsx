import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import ProductCard from "../../components/ui/ProductCard";
import { useNavigate } from "react-router-dom";

const BannerProduct = () => {
    const { data: products } = useGetAllProductsQuery(undefined);
    const navigate = useNavigate();
    const displayedProducts = products?.data?.slice(0, 6);

    return (
        <div className="pt-10">
            <h1 className="text-[20px] font-bold text-center mb-2">Featured Products</h1>
            <p className="text-[15px] text-center mb-6">Check & Get Your Desired Product!</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {displayedProducts?.map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
            <div className="text-center mt-6">
                <button
                    className="px-4 py-2 bg-[#001845] text-white rounded-lg shadow"
                    onClick={() => navigate("/all-products")}
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default BannerProduct;
