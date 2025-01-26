import React, { useState } from "react";

const ProductPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState([]);
  const [priceRange, setPriceRange] = useState([1, 60]);

  const products = Array(20).fill({
    name: "Brand Name - Product name",
    description: "Its specifications and all other details.",
    price: "7.66",
    discount: "30% off",
    delivery: "Xpress",
    image: "https://via.placeholder.com/150", // Replace with actual product images
  });

  const categories = [
    "Inspire U Posters",
    "Banner",
    "Headliner",
    "Birthday Charts",
    "Blank Chart",
    "Calendar Charts",
    "Chart Packs",
    "Classroom",
    "Incentive Charts",
    "Educational Charts",
    "Language Skills",
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleDeliveryChange = (deliveryType) => {
    setSelectedDelivery((prev) =>
      prev.includes(deliveryType)
        ? prev.filter((d) => d !== deliveryType)
        : [...prev, deliveryType]
    );
  };

  const handlePriceChange = (event) => {
    const value = event.target.value.split("-").map(Number);
    setPriceRange(value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesDelivery =
      selectedDelivery.length === 0 ||
      selectedDelivery.includes(product.delivery);

    const matchesPrice =
      parseFloat(product.price) >= priceRange[0] &&
      parseFloat(product.price) <= priceRange[1];

    return matchesSearch && matchesCategory && matchesDelivery && matchesPrice;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <aside className="bg-white shadow-md rounded-lg p-4 w-full lg:w-1/4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Category, brand, etc."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Delivery</h3>
            <div>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="Xpress"
                  onChange={() => handleDeliveryChange("Xpress")}
                  className="mr-2"
                />
                Xpress Delivery
              </label>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value="Regular"
                  onChange={() => handleDeliveryChange("Regular")}
                  className="mr-2"
                />
                Regular Delivery
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Category</h3>
            <div className="overflow-y-auto h-48">
              {categories.map((category) => (
                <label key={category} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={category}
                    onChange={() => handleCategoryChange(category)}
                    className="mr-2"
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Price</h3>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={priceRange.join("-")}
              onChange={handlePriceChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm mt-2">
              <span>AED {priceRange[0]}</span>
              <span>AED {priceRange[1]}</span>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  {product.delivery === "Xpress" && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Xpress
                    </span>
                  )}
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}
                  </span>
                </div>
                <div className="p-4">
                  <h2 className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 truncate">
                    {product.description}
                  </p>
                  <p className="text-lg font-bold text-gray-800 mt-2">
                    AED {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
