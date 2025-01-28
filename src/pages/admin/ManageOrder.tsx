import { useConfirmUserOrderMutation, useGetAllOrderQuery } from "../../redux/feathers/admin/adminApi";
import { Table, Tag, Skeleton, message, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';

interface Order {
    _id: string;
    product: {
        name: string;
        price: number;
    };
    totalAmount: number;
    paymentStatus: string;
    status: string;
    user: {
        name: string;
    };
    orderDate: string;
}

const ManageOrder = () => {
    const { data: allOrder, isLoading, isError, refetch } = useGetAllOrderQuery(undefined);
    const [confirmUserOrder] = useConfirmUserOrderMutation()

    const handleApprove = async (orderId: string) => {
        try {
            const res = await confirmUserOrder(orderId)
            if (res) {
                message.success('Order status updated to "Shipping".');
                refetch()
            }
        } catch (error) {
            console.log(error)
            message.error('Failed to update order status.');
        }
    };

    if (isError) {
        return <div className="flex items-center justify-center h-screen text-xl text-red-500">Error fetching orders</div>;
    }

    const columns: ColumnsType<Order> = [
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
            title: 'Order Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={status === 'Pending' ? 'blue' : 'green'}>
                    {status?.toUpperCase()}
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
        {
            title: 'Action',
            key: 'action',
            render: (_, order: Order) => (
                order.status === 'Pending' ? (
                    <Popconfirm
                        title="Approve this order?"
                        onConfirm={() => handleApprove(order._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button
                            className="px-4 cursor-pointer py-2 bg-[#001845] !text-white rounded-lg shadow">
                            Approve
                        </button>
                    </Popconfirm>
                ) : (
                    <Tag color="green">Shipped</Tag>
                )
            ),
        },
    ];

    const dataSource = allOrder?.data?.map((order: Order, index: number) => ({
        key: index,
        ...order,
    }));

    return (
        <div className="p-4 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 10 }} />
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: '100%' }}
                />
            )}
        </div>
    );
};

export default ManageOrder;