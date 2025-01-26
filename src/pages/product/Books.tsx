import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import ProductCard from "../../components/ui/ProductCard";
import { Empty } from "antd";
import { Skeleton } from "antd";

const Books = () => {
    const { data: products, isFetching } = useGetAllProductsQuery([
        {
            name: "category",
            value: "Books",
        },
    ]);

    const productList = products?.data ?? [];

    return (
        <div className="pt-10">
            <h1 className="text-[20px] font-bold text-center mb-4">All Books</h1>
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
                <div className="flex justify-center items-center h-40">
                    <Empty description="No Books products available" />
                </div>
            )}
        </div>
    );
};

export default Books;