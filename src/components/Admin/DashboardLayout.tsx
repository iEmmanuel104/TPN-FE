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
            <Header className="bg-white p-0 w-full fixed z-50 h-16">
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
                    className="hidden lg:block fixed h-screen"
                    style={{ marginTop: '64px' }}
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

                <Content className="mt-16  p-6 min-h-[calc(100vh-64px)]">
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
