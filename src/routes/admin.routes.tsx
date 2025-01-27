import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";

export const adminPaths = [
    // {
    //     name: 'Dashboard',
    //     path: 'dashboard',
    //     element: <AdminDashboard />
    // },
    {
        name: 'Dashboard',
        children: [
            {
                name: 'Manage Profile',
                path: 'manage-product',
                element: <AdminDashboard />
            },
        ]
    },
    {
        name: 'Product Management',
        children: [
            {
                name: 'Create A. Product',
                path: 'create-product',
                element: <CreateProduct />
            },
        ]
    },
];
