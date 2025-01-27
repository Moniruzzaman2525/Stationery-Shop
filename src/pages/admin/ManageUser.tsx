import React from 'react';
import { Table, Tag, Switch, Skeleton } from 'antd';
import { ColumnsType } from 'antd/es/table';
import 'antd/dist/reset.css';
import { useBlockUserMutation, useGetAllUserQuery } from '../../redux/feathers/admin/adminApi';

interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
    age?: string;
    gender?: string;
    phone?: string;
    currentCity?: string;
    currentCountry?: string;
    currentStreet?: string;
    permanentCity?: string;
    permanentCountry?: string;
    permanentStreet?: string;
}

const ManageUsers: React.FC = () => {
    const { data: allUsers, isLoading, isError, refetch } = useGetAllUserQuery(undefined);
    const [blockUser] = useBlockUserMutation();

    const handleBlockToggle = async (id: string) => {
        const res = await blockUser(id)
        if (res) {
            refetch()
        }
    };

    if (isError) {
        return <div className="flex items-center justify-center h-screen text-xl text-red-500">Error fetching users</div>;
    }

    const columns: ColumnsType<User> = [
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
            render: (_, user: User) => (
                <Switch
                    checked={!user.isBlocked}
                    onChange={() => handleBlockToggle(user?._id)}
                    checkedChildren="Active"
                    unCheckedChildren="Blocked"
                />
            ),
        },
    ];

    const dataSource = allUsers?.map((user: User, index: number) => ({
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
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: '100%' }}
                />
            )}
        </div>
    );
};

export default ManageUsers;
