import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logOut, selectCurrentUser } from "../../redux/feathers/auth/authSlice";
import logo from '../../assets/images/logo1.png'

const Layout = () => {
    const user = useAppSelector(selectCurrentUser);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const userItems = [
        {
            path: "update-Profile",
            label: "My Profile",
        },
        {
            path: "address",
            label: "Address",
        },
        {
            path: "see-order",
            label: "View Order",
        },
        
    ]
    const adminItems = [
        {
            path: "update-Profile",
            label: "My Profile",
        },
        {
            path: "address",
            label: "Address",
        },
        {
            path: "create-product",
            label: "Create Product",
        },
        {
            path: "manage-order",
            label: "Manage Order",
        },
        {
            path: "manage-user",
            label: "Manage user",
        },
       
    ]

    const getMenuItems = (role: string) => {
        switch (role) {
            case "admin":
                return adminItems;
            case "user":
            default:
                return userItems;
        }
    };
    
    
    const menuItems = getMenuItems(user?.role ?? "user");

    const handleLogout = async () => {
        try {
            await dispatch(logOut()); 
            navigate('/'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">
            <aside
                className={`fixed z-50 bg-gray-800 text-white w-64 p-4 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:relative md:translate-x-0`}
            >
                <div className="mb-6 flex justify-between items-center">
                    <Link to="/" className="flex items-center text-white gap-2 no-underline">
                        <img src={logo} alt="Logo" className="h-10 object-contain" />
                        <h2 className="text-lg font-bold hidden md:block">nsbooks.ae</h2>
                    </Link>
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        ✕
                    </button>
                </div>
                <nav>
                    {menuItems.map((item, index) => (
                        item && (
                            <div key={index} className="mb-2">
                                <div

                                    className="block p-2 rounded-lg hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                                >
                                    <Link to={item.path}> <span>{item.label}</span></Link>
                                </div>
                            </div>
                        )
                    ))}
                </nav>

            </aside>

            <main className="flex-1 bg-gray-100 overflow-auto">
                <header className="flex justify-between items-center p-4 bg-white shadow-md">
                    <button
                        className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                    <button onClick={handleLogout} className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500 cursor-pointer">
                        Log out
                    </button>
                </header>
                <div className="">
                    <Outlet />
                </div>
            </main>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Layout;
