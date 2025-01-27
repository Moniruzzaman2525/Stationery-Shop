import {
    removeFromCart,
    updateQuantity,
    useCurrentCartProduct,
} from "../../redux/feathers/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import CartItem from "../../components/ui/CartItem";
import { useDispatch } from "react-redux";
import { TProduct } from "../../types";
import { Empty, message } from "antd";
import { Link } from "react-router-dom";
import { useConfirmOrderMutation } from "../../redux/feathers/product/productApi";

const UserCart = () => {
    const cart = useAppSelector(useCurrentCartProduct) as TProduct[];
    const dispatch = useDispatch();
    const [confirmOrderProduct] = useConfirmOrderMutation()

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleUpdateQuantity = (id: string, quantity: number): void => {
        dispatch(updateQuantity({ id, quantity }));
    };

    const handleRemoveItem = (id: string): void => {
        dispatch(removeFromCart(id));
    };

    const checkStockAvailability = async (
        cart: TProduct[]
    ) => {
        try {
            const outOfStockItems = cart.filter((item) => item.quantity > (item.inStock ?? 0))

            if (outOfStockItems.length > 0) {
                const outOfStockDetails = outOfStockItems
                    .map((item) => `${item.name} (Qty: ${item.quantity}, Available: ${item.inStock})`)
                    .join(", ");
                message.error(`Out of stock: ${outOfStockDetails}. Please update your cart.`);
                return false;
            }
            return true

        } catch (error) {
            console.error("Error checking stock:", error);
            message.error("Failed to check stock availability. Please try again.");
            return false;
        }
    };


    const confirmOrder = async () => {
        const isStockAvailable = await checkStockAvailability(cart);

        if (isStockAvailable) {
            console.log("Order confirmed:", cart);
            const data = {}
            const res = await confirmOrderProduct(data)
            console.log(res)
            message.success("Order successfully confirmed!");
        } else {
            console.log("Order not confirmed. Stock issue.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 gap-6">
                        {cart.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                onUpdateQuantity={handleUpdateQuantity}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>
                    <div className="mt-6 text-right">
                        <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
                        <div className="flex justify-between">
                            <Link to="/all-products">
                                <button
                                    className="bg-[#001845] mt-4 cursor-pointer text-white px-6 py-2 rounded-lg"
                                >
                                    Continue Shopping
                                </button>
                            </Link>
                            <button
                                className="bg-[#001845] mt-4 cursor-pointer text-white px-6 py-2 rounded-lg"
                                onClick={confirmOrder}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-40">
                    <Empty description="Your cart is empty" />
                </div>
            )}
        </div>
    );
};

export default UserCart;
