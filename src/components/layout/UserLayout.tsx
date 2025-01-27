import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feathers/auth/authSlice";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { userPaths } from "../../routes/user.routes";
import { TSlideBarItem } from "../../types";
import logo from '../../assets/images/logo1.png'

const userRole = {
    ADMIN: "admin",
    USER: "user",
};

const Layout = () => {
    const user = useAppSelector(selectCurrentUser);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSubmenuIndex, setOpenSubmenuIndex] = useState<number | null>(null);

    const sidebarItems: TSlideBarItem[] =
        user?.role === userRole.ADMIN
            ? sidebarItemsGenerator(adminPaths)
            : user?.role === userRole.USER
                ? sidebarItemsGenerator(userPaths)
                : [];

    const handleSubmenuToggle = (index: number) => {
        setOpenSubmenuIndex(index === openSubmenuIndex ? null : index);
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
                    {sidebarItems.map((item, index) => (
                        item && ( 
                            <div key={item.key} className="mb-2">
                                <div
                                    onClick={() => handleSubmenuToggle(index)}
                                    className="block p-2 rounded-lg hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                                >
                                    <span>{item.label}</span>
                                    {item.children && (
                                        <span>{openSubmenuIndex === index ? "-" : "+"}</span>
                                    )}
                                </div>
                                {item.children && openSubmenuIndex === index && (
                                    <div className="ml-4">
                                        {item.children.map(
                                            (subItem) =>
                                                subItem && (
                                                    <div key={subItem.key} className="mb-1">
                                                        {subItem.label}
                                                    </div>
                                                )
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    ))}
                </nav>

            </aside>

            <main className="flex-1 bg-gray-100 overflow-auto">
                <header className="flex justify-between items-center mb-12 p-4 bg-white shadow-md">
                    <button
                        className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        ☰
                    </button>
                    <button className="bg-yellow-400 text-[#001845] px-4 py-2 rounded font-bold text-sm transition-colors hover:bg-yellow-500 cursor-pointer">
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
