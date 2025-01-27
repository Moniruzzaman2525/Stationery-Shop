import { useGetAllProductsQuery } from '../../redux/feathers/product/productApi';
import { Empty, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

interface CategoryItemProps {
    item: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item }) => {
    const { data: products, isFetching } = useGetAllProductsQuery([
        {
            name: "category",
            value: item,
        },
    ]);
    const productList = products?.data ?? [];
    return (
        <div>
            {isFetching ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            ) : productList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {productList.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-40">
                    <Empty description={`No ${item} products available`} />
                    <Link to="/all-products" className="mt-4">
                        <button className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition">
                            View All Products
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default CategoryItem;
