import React, { useCallback, useState } from "react";
import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import card from '../../assets/images/add-card.png';
import { TQueryParam } from "../../types";
import { Input, Checkbox, Slider, Card } from "antd";
import { debounce } from "lodash";
const ProductPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [params, setParams] = useState<TQueryParam[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([1, 60]);
    const { data: products } = useGetAllProductsQuery(params);
    const categories: string[] = [
        "Books",
        "Art and Craft",
        "Stationery",
        "Classroom Supplies",
    ];


    console.log(products)

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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">All Products</h1>
            <div className="flex flex-col lg:flex-row gap-6">
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
                            <Card
                                key={index}
                                hoverable
                                cover={
                                    <img
                                        src={product.photo}
                                        alt={product.name}
                                        className="h-48 w-full object-cover relative"
                                    />
                                }
                                className="overflow-hidden"
                            >
                                <div className="absolute top-[35%] right-3 p-2 rounded-full ">
                                    <img className='w-[40px]' src={card} alt="" />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-sm font-medium text-gray-800 truncate">
                                        {product.name} - {product.brand}
                                    </h2>
                                    <p className="text-sm text-gray-600 truncate">
                                        {product.description}
                                    </p>
                                    <p className="text-lg font-bold text-gray-800 mt-2">
                                        USD ${product.price}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProductPage;