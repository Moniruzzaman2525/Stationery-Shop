import { Card } from 'antd';
import card from '../../assets/images/add-card.png'
import { TProduct } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: TProduct;
}

const ProductCard : React.FC<ProductCardProps>  = ({ product }) => {

    const navigate = useNavigate()

    const productDetails = () => {
        navigate(`/product/${product._id}`)
    }

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
            <div className="absolute top-[35%] right-3 p-2 rounded-full ">
                <img className='w-[40px]' src={card} alt="" />
            </div>
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