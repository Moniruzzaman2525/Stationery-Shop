import Order from "../pages/user/Order";
import UserDashboard from "../pages/user/UserDashboard";



export const userPaths = [

    {
        name: 'Dashboard',
        path: 'view-Profile',
        element: <UserDashboard />
    },
    {
        name: 'Order Management',
        children: [
            {
                name: 'See All Order',
                path: 'see-order',
                element: <Order />
            }

        ]
    },
]