import { useState } from "react";
import logo from "../../assets/images/logo1.png";
import cart from "../../assets/images/add-card.png";
import profile from "../../assets/images/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="flex justify-between items-center bg-[#001845] px-6 py-3 h-[70px] rounded-lg text-white shadow-md">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <Link to="/" className="flex items-center text-white gap-2 no-underline">
                    <img src={logo} alt="Logo" className="h-10 object-contain" />
                    <h2 className="text-lg font-bold hidden md:block">nsbooks.ae</h2>
                </Link>
            </div>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="focus:outline-none">
                    <div className="w-6 h-1 bg-white mb-1"></div>
                    <div className="w-6 h-1 bg-white mb-1"></div>
                    <div className="w-6 h-1 bg-white"></div>
                </button>
            </div>

            {/* Navigation Links for Desktop */}
            <ul className="list-none hidden md:flex gap-8 text-sm font-medium">
                <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Books</li>
                <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Arts and Crafts</li>
                <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Stationery</li>
                <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Classroom Supplies</li>
            </ul>

            {/* Cart, Profile, and Login Section for Desktop */}
            <div className="hidden md:flex items-center gap-4">
                <img src={cart} alt="Cart" className="h-8 cursor-pointer transition-transform hover:scale-105" />
                <img src={profile} alt="Profile" className="h-8 cursor-pointer transition-transform hover:scale-105" />
                <Link to="/login">
                    <button className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500">
                        Login
                    </button>
                </Link>
            </div>

            {/* Dropdown Menu for Mobile */}
            {isMenuOpen && (
                <div className="absolute top-[70px] right-0 bg-[#001845] text-white w-full shadow-md md:hidden">
                    <ul className="list-none flex flex-col gap-4 p-4">
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Books</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Arts and Crafts</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Stationery</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Classroom Supplies</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Cart</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">Profile</li>
                        <li className="capitalize cursor-pointer transition-colors hover:text-gray-300">
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
