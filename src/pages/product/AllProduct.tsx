/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import { TQueryParam } from "../../types";
import { Input, Checkbox, Slider, Skeleton, Empty, Pagination } from "antd";
import { debounce } from "lodash";
import ProductCard from "../../components/ui/ProductCard";

const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([1, 10000]);
    const [page, setPage] = useState(1)
    const { data: products, isFetching, isError } = useGetAllProductsQuery(
        [
            { name: 'limit', value: 8 },
            { name: 'page', value: page },
            { name: 'sort', value: 'id' },
            ...params]
    );

    const categories: string[] = ["Books", "Art and Craft", "Stationery", "Classroom Supplies"];
    const availabilityOptions: string[] = ["In Stock", "Out of Stock"];

    const debouncedUpdateParams = useCallback(
        debounce((value: string) => {
            setParams((prevParams) => {
                const updatedParams = prevParams.filter((param) => param.name !== "search");
                return value ? [...updatedParams, { name: "search", value }] : updatedParams;
            });
        }, 300),
        []
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedUpdateParams(value);
    };

    const handleCategoryChange = (category: string) => {
        setParams((prevParams) => {
            const exists = prevParams.some((param) => param.name === "category" && param.value === category);
            return exists
                ? prevParams.filter((param) => !(param.name === "category" && param.value === category))
                : [...prevParams, { name: "category", value: category }];
        });
    };

    const handleAvailabilityChange = (availability: string) => {
        setParams((prevParams) => {
            const exists = prevParams.some((param) => param.name === "availability" && param.value === availability);
            return exists
                ? prevParams.filter((param) => !(param.name === "availability" && param.value === availability))
                : [...prevParams, { name: "availability", value: availability }];
        });
    };

  

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
        setParams((prevParams) => {
            const updatedParams = prevParams.filter((param) => param.name !== "priceRange");
            return [...updatedParams, { name: "priceRange", value: value.join("-") }];
        });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };


    return (
        <div className="py-24 bg-[#F9F9FB] min-h-screen px-6 md:px-40">
            <h1 className="text-2xl font-bold text-center mb-10">All Products</h1>

            {isFetching ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                            <Skeleton active paragraph={{ rows: 2 }} />
                        </div>
                    ))}
                </div>
            ) : isError || !products?.data || products?.data?.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                    <Empty
                        description={
                            <span className="text-gray-600 text-lg font-semibold">
                                No products available
                            </span>
                        }
                    />
                    <p className="text-gray-500 mt-2">Try adjusting your filters or check back later.</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-6">
                    <aside className="bg-white shadow-lg rounded-lg p-6 h-full w-full lg:w-1/4">
                        <div className="mb-6">
                            <Input
                                placeholder="Search by category, brand, etc."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                                allowClear
                                aria-label="Search by category, brand, or other filters"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Category</h3>
                            <div className="overflow-y-auto max-h-40 border rounded-md p-3 bg-gray-50">
                                {categories.map((category) => {
                                    const isChecked = params.some(
                                        (param) => param.name === "category" && param.value === category
                                    );
                                    return (
                                        <Checkbox
                                            key={category}
                                            checked={isChecked}
                                            onChange={() => handleCategoryChange(category)}
                                            className="block text-sm text-gray-700 mb-2 hover:text-gray-900 transition"
                                            aria-label={`Filter by ${category}`}
                                        >
                                            {category}
                                        </Checkbox>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Availability</h3>
                            <div className="overflow-y-auto max-h-32 border rounded-md p-3 bg-gray-50">
                                {availabilityOptions.map((option) => {
                                    const isChecked = params.some(
                                        (param) => param.name === "availability" && param.value === option
                                    );
                                    return (
                                        <Checkbox
                                            key={option}
                                            checked={isChecked}
                                            onChange={() => handleAvailabilityChange(option)}
                                            className="block text-sm text-gray-700 mb-2 hover:text-gray-900 transition"
                                            aria-label={`Filter by ${option}`}
                                        >
                                            {option}
                                        </Checkbox>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Price Range (USD)</h3>
                            <Slider
                                range
                                min={1}
                                max={10000}
                                step={1}
                                value={priceRange}
                                onChange={(value) => setPriceRange(value as [number, number])}
                                onAfterChange={(value) => handlePriceChange(value as [number, number])}
                                className="text-blue-500"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>USD {priceRange[0]}</span>
                                <span>USD {priceRange[1]}</span>
                            </div>
                        </div>
                    </aside>

                    <main className="w-full lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products?.data?.map((product, index) => (
                                <ProductCard product={product} key={index} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-6">
                            <Pagination
                                current={page}
                                pageSize={8}
                                total={products?.meta?.total || 0}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                            />
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
