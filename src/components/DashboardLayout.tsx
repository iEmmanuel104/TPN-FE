import React, { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

    const toggleMobileDrawer = () => {
        setMobileDrawerVisible(!mobileDrawerVisible);
    };

    return (
        <Layout className="min-h-screen">
            <Header
                style={{
                    background: '#fff',
                    padding: 0,
                    width: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    height: '64px',
                }}
            >
                <div className="flex items-center h-full">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={toggleMobileDrawer}
                        className="ml-4 lg:hidden"
                    />
                    <DashboardHeader />
                </div>
            </Header>
            <Layout>
                <Sider
                    width={250}
                    theme="light"
                    className="hidden lg:block"
                    style={{
                        marginTop: '64px',
                        position: 'fixed',
                        height: '100vh',
                    }}
                >
                    <Sidebar />
                </Sider>

                <Drawer
                    placement="left"
                    closable={false}
                    onClose={toggleMobileDrawer}
                    open={mobileDrawerVisible}
                    className="lg:hidden"
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar mobile={true} />
                </Drawer>

                <Content
                    style={{
                        marginTop: '64px',
                        marginLeft: '250px',
                        padding: '24px',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
