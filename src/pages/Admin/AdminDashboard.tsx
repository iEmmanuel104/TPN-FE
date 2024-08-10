// src/pages/Admin/AdminDashboard.tsx

import React from 'react';
import { Layout, Menu, Input, Avatar, Badge } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    DollarOutlined,
    BellOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import Overview from './components/Overview';
import StudentList from './components/StudentList';
import ProfessorList from './components/ProfessorList';
import FinancialReport from './components/FinancialReport';

const { Header, Sider, Content } = Layout;
const { Search } = Input;

const AdminDashboard: React.FC = () => {
    const [selectedMenu, setSelectedMenu] = React.useState('1');

    const renderContent = () => {
        switch (selectedMenu) {
            case '1':
                return <Overview />;
            case '2':
                return <StudentList />;
            case '3':
                return <ProfessorList />;
            case '4':
                return <FinancialReport />;
            default:
                return <Overview />;
        }
    };

    return (
        <Layout className="min-h-screen">
            <Sider theme="light" className="shadow-md">
                <div className="h-16 flex items-center justify-center bg-white">
                    <h1 className="text-2xl font-bold text-blue-600">EDUMIN</h1>
                </div>
                <Menu
                    mode="inline"
                    selectedKeys={[selectedMenu]}
                    onClick={({ key }) => setSelectedMenu(key)}
                    className="mt-4"
                >
                    <Menu.Item key="1" icon={<DashboardOutlined />}>
                        Overview
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                        Students
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UserOutlined />}>
                        Professors
                    </Menu.Item>
                    <Menu.Item key="4" icon={<DollarOutlined />}>
                        Financial Report
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="bg-white shadow-sm flex justify-between items-center px-6">
                    <Search placeholder="Search..." className="w-1/3" />
                    <div className="flex items-center space-x-4">
                        <Badge count={5}>
                            <BellOutlined className="text-lg" />
                        </Badge>
                        <SettingOutlined className="text-lg" />
                        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
                    </div>
                </Header>
                <Content className="m-6 p-6 bg-white rounded-lg shadow-sm">
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
