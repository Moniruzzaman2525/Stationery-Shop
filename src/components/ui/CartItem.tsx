import { Button, InputNumber } from "antd";
import { TProduct } from "../../types";

type CartItemProps = {
    item: TProduct;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    const handleIncrease = () => {
        if (item.inStock !== undefined && item.quantity < item.inStock) {
            onUpdateQuantity(item._id, item.quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item._id, item.quantity - 1);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white p-4 shadow rounded-lg">
            <div className="flex items-center">
                <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm text-gray-500">Price: ${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Button onClick={handleDecrease} disabled={item.quantity <= 1}>
                        -
                    </Button>
                    <InputNumber
                        min={1}
                        max={item.inStock || 0}
                        value={item.quantity}
                        className="w-20"
                        onChange={(value) => {
                            if (value !== null) onUpdateQuantity(item._id, value);
                        }}
                    />
                    <Button onClick={handleIncrease} disabled={item.inStock === undefined || item.quantity >= item.inStock}>
                        +
                    </Button>
                </div>
                <Button
                    type="primary"
                    danger
                    onClick={() => onRemove(item._id)}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
