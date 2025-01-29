import { Table, Tag, Skeleton, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';
import { useBlockUserMutation, useGetAllUserQuery } from '../../redux/feathers/admin/adminApi';
import { TUser } from '../../types';



const ManageUsers = () => {
    const { data: allUsers, isLoading, isError, refetch } = useGetAllUserQuery(undefined);
    const [blockUser] = useBlockUserMutation();

    const handleBlockToggle = async (id: string, status: string) => {
        const data = {
            id,
            status
        }
        const res = await blockUser(data)
        if (res) {
            refetch()
        }
    };

    if (isError) {
        return <div className="flex items-center justify-center h-screen text-xl text-red-500">Error fetching users</div>;
    }

    const columns: ColumnsType<TUser> = [
        {
            title: 'User ID',
            dataIndex: 'id',
            key: 'id',
            responsive: ['md'],
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role: string) => (
                <Tag color={role === 'admin' ? 'blue' : 'green'}>{role.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            render: (isBlocked: boolean) => (
                <Tag color={isBlocked ? 'red' : 'green'}>{isBlocked ? 'Blocked' : 'Active'}</Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, user: TUser) => (
                user.isBlocked ? (
                    <Popconfirm
                        title="Un Block this user?"
                        onConfirm={() =>  user._id && handleBlockToggle(user?._id, 'un-block')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button
                            className="px-4 cursor-pointer py-2 bg-[#001845] !text-white rounded-lg shadow">
                            UnBlock
                        </button>
                    </Popconfirm>
                ) : (
                    <Popconfirm
                        title="Block this user?"
                        onConfirm={() => user._id && handleBlockToggle(user._id, "block")}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button
                            className="px-4 cursor-pointer py-2 bg-[#001845] !text-white rounded-lg shadow"
                        >
                            Block
                        </button>
                    </Popconfirm>
                )
            ),
        },
    ];

    const dataSource = allUsers?.map((user: TUser, index: number) => ({
        key: index,
        ...user,
    }));

    return (
        <div className="p-4 min-h-screen bg-gray-50">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            {isLoading ? (
                <div className="">
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    scroll={{ x: "max-content" }}
                    bordered
                    pagination={{ pageSize: 5, showSizeChanger: true }}
                    className="rounded-lg shadow-md"
                />
            )}
        </div>
    );
};

export default ManageUsers;
