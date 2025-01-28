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
        <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center w-full justify-between md:!justify-start gap-[30px] md:gap-[20px]">
                <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 md:w-30 h-20 md:h-30 object-cover rounded-lg"
                />
                <div className="text-center md:text-left flex-1">
                    <h2 className="text-lg md:text-[20px] font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm md:text-[20px] text-gray-500">Price: ${item.price.toFixed(2)}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex items-center gap-[10px]">
                    <Button className="" onClick={handleDecrease} disabled={item.quantity <= 1}>
                        <span className="text-[24px] mt-[-2px]">-</span>
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
                        <span className="text-[24px] mt-[-2px]">+</span>
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
