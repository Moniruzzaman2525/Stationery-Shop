import { Card, message } from 'antd';
import card from '../../assets/images/add-card.png';
import { TProduct } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/feathers/cart/cartSlice';
import { useAppSelector } from '../../redux/hooks';
import { useCurrentToken } from '../../redux/feathers/auth/authSlice';

interface ProductCardProps {
    product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useAppSelector(useCurrentToken);
    const productDetails = () => {
        navigate(`/product/${product._id}`);
    };

    const handleAddToCartFunction = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!isLoggedIn) {
            message.warning("Please log in to add products to the cart."); 
            navigate("/login"); 
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
                    alt={product.name}
                    className="h-48 w-full object-cover relative"
                />
            }
            onClick={productDetails}
            className="overflow-hidden"
        >
            <button
                className="absolute cursor-pointer top-[35%] right-3 p-2 rounded-full"
                onClick={handleAddToCartFunction}
            >
                <img className="w-[40px]" src={card} alt="" />
            </button>
            <div className="p-4">
                <h2 className="text-sm font-medium text-gray-800 truncate">
                    {product.name} - {product.category}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                    {product.description}
                </p>
                <p className="text-lg font-bold text-gray-800 mt-2">
                    USD ${product.price}
                </p>
            </div>
        </Card>
    );
};

export default ProductCard;
