import React from 'react';
import { Button, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { logOut } from '../../redux/feathers/auth/authSlice';
import { Sidebar } from './Sidebar';

const { Header, Content } = Layout;

const UserLayout: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        try {
            await dispatch(logOut()); 
            navigate('/'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Layout style={{ height: '100%' }}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0 }}>
                    <Button onClick={handleLogout}>Log out</Button>
                </Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserLayout;
