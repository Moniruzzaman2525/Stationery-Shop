import { removeFromCart, updateQuantity, useCurrentCartProduct } from "../../redux/feathers/cart/cartSlice";
import { useAppSelector } from "../../redux/hooks";
import { Button } from "antd";
import CartItem from "../../components/ui/CartItem";
import { useDispatch } from "react-redux";
import { TProduct } from "../../types";
const UserCart = () => {
    const cart = useAppSelector(useCurrentCartProduct) as TProduct[]
    const dispatch = useDispatch()

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const handleUpdateQuantity = (id: string, quantity: number): void => {
        dispatch(updateQuantity({id, quantity}))
    };

    const handleRemoveItem = (id: string): void => {
        dispatch(removeFromCart(id))
    };


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
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
                        <Button
                            type="primary"
                            size="large"
                            className="mt-4"
                            onClick={() => console.log("Proceed to Checkout")}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-40">
                    <p className="text-lg font-medium text-gray-500">Your cart is empty.</p>
                </div>
            )}
        </div>
    );
};

export default UserCart;
