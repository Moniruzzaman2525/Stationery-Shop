import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/product/Books";
import ArtAndCraft from "../pages/product/ArtAndCraft";
import Stationery from "../pages/product/Stationery";
import ClassRoomSupplies from "../pages/product/ClassRoomSupplies";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import UserLayout from "../components/layout/UserLayout";
import UserCart from "../pages/user/UserCart";
import AllProduct from "../pages/product/AllProduct";
import SingleProduct from "../pages/product/SingleProduct";
import Payment from "../pages/payment/Payment";
import UserDashboard from "../pages/user/UserDashboard";
import Order from "../pages/user/Order";
import Address from "../pages/user/Address";
import ManageOrder from "../pages/admin/ManageOrder";
import ManageUser from "../pages/admin/ManageUser";
import CreateProduct from "../pages/admin/CreateProduct";
import AboutPage from "../pages/others/AboutPage";
import ContactUsPage from "../pages/others/ContactUsPage";
import BlogPage from "../pages/others/BlogPage";
import SingleBlogPage from "../pages/others/SingleBlogPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/art-cart',
                element: <ArtAndCraft />
            },
            {
                path: '/stationery',
                element: <Stationery />
            },
            {
                path: '/classroom-supplies',
                element: <ClassRoomSupplies />
            },
            {
                path: '/user-cart',
                element: <ProtectedRoute><UserCart /> </ProtectedRoute>
            },
            {
                path: '/all-products',
                element: <AllProduct />
            },
            {
                path: '/product/:productId',
                element: <SingleProduct />
            },
            {
                path: '/payment',
                element: <Payment />
            },
            {
                path: '/about-us',
                element: <AboutPage />
            },
            {
                path: '/contact-us',
                element: <ContactUsPage />
            },
            {
                path: '/blog',
                element: <BlogPage />
            },
            {
                path: '/blog/:blogId',
                element: <SingleBlogPage />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
   
    {
        path: '/dashboard',
        element: <ProtectedRoute><UserLayout /> </ProtectedRoute>,
        children: [
            {
                path: 'update-Profile',
                element: <UserDashboard />
            },
            {
                path: 'see-order',
                element: <Order />
            },
            {
                path: 'address',
                element: <Address />
            },
            {
                path: 'create-product',
                element: <CreateProduct />
            },
            {
                path: 'manage-order',
                element: <ManageOrder />
            },
            {
                path: 'manage-user',
                element: <ManageUser />
            },
        ],
    },

])


export default router