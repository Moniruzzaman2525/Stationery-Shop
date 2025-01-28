import {
    removeFromCart,
    updateQuantity,
    useCurrentCartProduct,
} from "../../redux/feathers/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import CartItem from "../../components/ui/CartItem";
import { useDispatch } from "react-redux";
import { TProduct } from "../../types";
import { Empty, message, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useConfirmOrderMutation } from "../../redux/feathers/product/productApi";
import { setPaymentData } from "../../redux/feathers/order/orderSlice";
import React from "react";

const UserCart: React.FC = () => {
    const cart = useAppSelector(useCurrentCartProduct) as TProduct[];
    const dispatch = useDispatch();
    const [confirmOrderProduct, { isLoading }] = useConfirmOrderMutation();
    const navigate = useNavigate();
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
            const outOfStockItems = cart.filter((item) => item.quantity > (item.inStock ?? 0));

            if (outOfStockItems.length > 0) {
                const outOfStockDetails = outOfStockItems
                    .map((item) => `${item.name} (Qty: ${item.quantity}, Available: ${item.inStock})`)
                    .join(", ");
                message.error(`Out of stock: ${outOfStockDetails}. Please update your cart.`);
                return false;
            }
            return true;

        } catch (error) {
            console.error("Error checking stock:", error);
            message.error("Failed to check stock availability. Please try again.");
            return false;
        }
    };

    const confirmOrder = async () => {
        const isStockAvailable = await checkStockAvailability(cart);

        if (isStockAvailable) {
            const data = { price: totalPrice };
            const res = await confirmOrderProduct(data).unwrap();
            if (res) {
                dispatch(setPaymentData(res?.data));
                navigate('/payment');
            }
        } else {
            console.log("Order not confirmed. Stock issue.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Shopping Cart</h1>
            {isLoading ? (
                <div className="max-w-5xl mx-auto">
                    {[...Array(3)].map((_, index) => (
                        <Skeleton key={index} active avatar paragraph={{ rows: 2 }} />
                    ))}
                </div>
            ) : cart.length > 0 ? (
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
                    <div className="mt-6 text-center sm:text-right">
                        <h3 className="text-lg md:text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
                        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-4 gap-4">
                            <Link to="/all-products" className="w-full sm:w-auto">
                                <button
                                    className="bg-[#001845] cursor-pointer !text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition"
                                >
                                    Continue Shopping
                                </button>
                            </Link>
                            <button
                                className="bg-[#001845] cursor-pointer !text-white px-6 py-3 rounded-lg hover:bg-[#003366] transition"
                                onClick={confirmOrder}
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-100">
                    <Empty description="Your cart is empty" />
                    <Link to="/all-products" className="mt-4">
                        <button className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserCart;