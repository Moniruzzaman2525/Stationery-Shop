import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import ArtAndCraft from "../pages/ArtAndCraft";
import Stationery from "../pages/Stationery";
import ClassRoomSupplies from "../pages/ClassRoomSupplies";


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

])


export default router