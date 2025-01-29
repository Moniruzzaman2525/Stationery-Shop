import { useState } from "react";
import logo from "../../assets/images/logo1.png";
import cart from "../../assets/images/add-card.png";
import profile from "../../assets/images/profile-img.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/feathers/auth/authSlice";
import { clearCart, useCurrentCartProduct } from "../../redux/feathers/cart/cartSlice";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector(selectCurrentUser);
    const cartValue = useAppSelector(useCurrentCartProduct);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (location.pathname === "/user-cart") {
            try {
                await dispatch(logOut());
                dispatch(clearCart());
                navigate("/");
            } catch (error) {
                console.error("Error during logout:", error);
            }
        } else {
            dispatch(clearCart());
            dispatch(logOut());
            setIsMenuOpen(false);
        }
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#001845] text-white px-6 md:px-40 py-3 h-[70px] shadow-md z-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center text-white gap-2 no-underline">
                    <img src={logo} alt="Logo" className="h-10 object-contain" />
                    <h2 className="text-lg font-bold hidden md:block">nsbooks.ae</h2>
                </Link>
            </div>

            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="focus:outline-none"
                >
                    <div className="w-6 h-1 bg-white mb-1"></div>
                    <div className="w-6 h-1 bg-white mb-1"></div>
                    <div className="w-6 h-1 bg-white"></div>
                </button>
            </div>

            <ul className="list-none hidden md:flex gap-8 !mb-1 text-sm font-medium">
                <Link to="/"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Home</li></Link>
                <Link to="/all-products"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Products</li></Link>
                <Link to="/blogs"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Blogs</li></Link>
                <Link to="/about-us"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">About Us</li></Link>
                <Link to="/contact-us"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Contact Us</li></Link>
            </ul>

            <div className="hidden md:flex items-center gap-4 relative">
                <Link to="/user-cart" className="relative">
                    <img src={cart} alt="Cart" className="h-8 cursor-pointer transition-transform hover:scale-105" />
                    {cartValue.length > 0 && (
                        <span className="absolute top-[-10px] right-[-10px] bg-yellow-400 text-[#001845] rounded-full h-5 w-5 text-xs font-bold flex items-center justify-center">
                            {cartValue.length}
                        </span>
                    )}
                </Link>
                <Link to="/dashboard/update-Profile"><img src={profile} alt="Profile" className="h-8 cursor-pointer transition-transform hover:scale-105" /></Link>
                {!user ? (
                    <Link to="/login">
                        <button className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500 cursor-pointer">
                            Login
                        </button>
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500 cursor-pointer">
                        Logout
                    </button>
                )}
            </div>

            {isMenuOpen && (
                <div className="absolute z-50 top-[70px] right-0 bg-[#001845] text-white w-full shadow-md md:hidden">
                    <ul className="list-none flex flex-col gap-4 p-4">
                        <Link onClick={handleMenuClose} to="/"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Home</li></Link>
                        <Link onClick={handleMenuClose} to="/all-products"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Products</li></Link>
                        <Link onClick={handleMenuClose} to="/blogs"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Blogs</li></Link>
                        <Link onClick={handleMenuClose} to="/about-us"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">About Us</li></Link>
                        <Link onClick={handleMenuClose} to="/Contact Us"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Contact Us</li></Link>
                        <Link onClick={handleMenuClose} to="/user-cart"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Cart</li></Link>
                        <Link onClick={handleMenuClose} to="/dashboard/update-Profile"><li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Dashboard</li></Link>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">
                            {user ? (
                                <button onClick={handleLogout} className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500">
                                    Logout
                                </button>
                            ) : (
                                <Link onClick={handleMenuClose} to="/login">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
