import { Card, message, Tooltip } from "antd";
import cardIcon from "../../assets/images/add-card.png";
import { TProduct } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feathers/cart/cartSlice";

interface ProductCardProps {
    product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProductDetails = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCart = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!product.stock) {
            message.warning(`Only ${product.stock} items are available in stock.`);
            return;
        }
        dispatch(addToCart({ product, quantity: 1 }));
        message.success("Product added to cart!");
    };

    return (
        <Card
            hoverable
            cover={
                <img
                    src={product.photo}
                    alt={product.name || "Product image"}
                    className="h-48 w-full object-cover"
                />
            }
            onClick={handleProductDetails}
            className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
        >
            <Tooltip title="Add to Cart">
                <button
                    className="absolute top-4 right-4 cursor-pointer p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
                    onClick={handleAddToCart}
                >
                    <img className="w-8" src={cardIcon} alt="Add to cart" />
                </button>
            </Tooltip>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 truncate">
                    {product.name} - {product.category}
                </h2>
                <p className="text-sm text-gray-600 mt-1 truncate">
                    {product.description || "No description available."}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-3">
                    ${product.price.toFixed(2)}
                </p>
                <button
                    onClick={handleAddToCart}
                   className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition"
                >
                    Add to Cart
                </button>
            </div>
        </Card>
    );
};

export default ProductCard;
