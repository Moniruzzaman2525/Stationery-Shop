import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import ArtAndCraft from "../pages/ArtAndCraft";
import Stationery from "../pages/Stationery";
import ClassRoomSupplies from "../pages/ClassRoomSupplies";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import UserLayout from "../components/layout/UserLayout";
import UserCart from "../pages/UserCart";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";


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
        children: routeGenerator(adminPaths)
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute><UserLayout /> </ProtectedRoute>,
        children: routeGenerator(userPaths)
    },

])


export default router