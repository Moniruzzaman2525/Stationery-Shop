import React, { useCallback, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import { TQueryParam } from "../../types";
import { Input, Checkbox, Slider, Skeleton } from "antd";
import { debounce } from "lodash";
import ProductCard from "../../components/ui/ProductCard";
const ProductPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([1, 60]);
    const { data: products, isFetching } = useGetAllProductsQuery(params);
    const categories: string[] = [
        "Books",
        "Art and Craft",
        "Stationery",
        "Classroom Supplies",
    ];



    const availabilityOptions: string[] = ["In Stock", "Out of Stock"];

    const debouncedUpdateParams = useCallback(
        debounce((value: string) => {
            setParams((prevParams) => {
                const updatedParams = prevParams.filter((param) => param.name !== "search");
                return value ? [...updatedParams, { name: "search", value }] : updatedParams;
            });
            console.log("API call with params:", value);
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
            const exists = prevParams.some(param => param.name === 'category' && param.value === category);
            if (exists) {
                return prevParams.filter(param => !(param.name === 'category' && param.value === category));
            } else {
                return [...prevParams, { name: 'category', value: category }];
            }
        });
    };

    const handleAvailabilityChange = (availability: string) => {
        setParams((prevParams) => {
            const exists = prevParams.some(param => param.name === 'availability' && param.value === availability);
            if (exists) {
                return prevParams.filter(param => !(param.name === 'availability' && param.value === availability));
            } else {
                return [...prevParams, { name: 'availability', value: availability }];
            }
        });
    };

    const handlePriceChange = (value: [number, number]) => {
        setPriceRange(value);
        setParams((prevParams) => {
            const updatedParams = prevParams.filter(param => param.name !== 'priceRange');
            return [...updatedParams, { name: 'priceRange', value: value.join("-") }];
        });
    };


    return (
        <div className="p-6  min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
            {isFetching ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="p-4">
                        <Skeleton.Avatar active size="large" shape="square" className="mb-2" />
                        <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                ))}
            </div> : <div className="flex flex-col lg:flex-row gap-6">
                {/* Filters Section */}
                <aside className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/4">
                    <div className="mb-4">
                        <Input
                            placeholder="Search by category, brand, etc."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="mb-2"
                            allowClear
                        />
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-2">Category</h3>
                        <div className="overflow-y-auto h-30">
                            {categories.map((category) => (
                                <div key={category}>
                                    <Checkbox
                                        onChange={() => handleCategoryChange(category)}
                                        className="block mb-2"
                                    >
                                        {category}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-2">Availability</h3>
                        <div className="overflow-y-auto h-20">
                            {availabilityOptions.map((option) => (
                                <Checkbox
                                    key={option}
                                    onChange={() => handleAvailabilityChange(option)}
                                    className="block mb-2"
                                >
                                    {option}
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="font-semibold text-lg mb-2">Price Range (USD)</h3>
                        <Slider
                            range
                            min={1}
                            max={60}
                            step={1}
                            value={priceRange}
                            onChange={(value) => setPriceRange(value as [number, number])}
                            onAfterChange={(value) => handlePriceChange(value as [number, number])}
                        />
                        <div className="flex justify-between text-sm mt-2">
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
                </main>
            </div>}
        </div>
    );
};

export default ProductPage;