import React from 'react';
import { useGetAllOrderQuery } from "../../redux/feathers/admin/adminApi";
import { Table, Tag, Skeleton } from 'antd';
import 'antd/dist/reset.css';

interface Order {
    _id: string;
    product: {
        name: string;
        price: number;
    };
    totalAmount: number;
    paymentStatus: string;
    user: {
        name: string;
    };
    orderDate: string;
}

const ManageUser: React.FC = () => {
    const { data: allOrder, isLoading, isError } = useGetAllOrderQuery(undefined);

    if (isError) {
        return <div className="flex items-center justify-center h-screen text-xl text-red-500">Error fetching orders</div>;
    }

    const columns = [
        {
            title: 'Order ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Product Name',
            dataIndex: ['product', 'name'],
            key: 'productName',
        },
        {
            title: 'Price',
            dataIndex: ['product', 'price'],
            key: 'price',
            render: (price: number) => `$${price}`,
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number) => `$${amount}`,
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (status: string) => (
                <Tag color={status === 'succeeded' ? 'green' : 'red'}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'User',
            dataIndex: ['user', 'name'],
            key: 'user',
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (date: string) => new Date(date).toLocaleString(),
        },
    ];

    const dataSource = allOrder?.map((order: Order, index: number) => ({
        key: index,
        ...order,
    }));

    return (
        <div className="p-4 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Manage User</h1>
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
            ) : (
                <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
            )}
        </div>
    );
};

export default ManageUser;