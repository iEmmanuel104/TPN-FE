import React, { useState } from 'react';
import { Menu, Layout, Button } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={toggleCollapse}
            width={250}
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
            style={{ zIndex: 1000 }}
        >
            <div className="flex justify-between items-center px-4 py-2 bg-white">
                <img
                    src="https://res.cloudinary.com/drc6omjqc/image/upload/v1721073067/chain_breaker_lmjc02.webp"
                    alt="EDUMIN"
                    className="w-8 h-8"
                />
                <Button type="text" onClick={toggleCollapse}>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <Menu defaultSelectedKeys={['1']} mode="inline" theme="light">
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    Dashboard
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    icon={<UserOutlined />}
                    title="Professors"
                >
                    <Menu.Item key="2">Professor 1</Menu.Item>
                    <Menu.Item key="3">Professor 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub2"
                    icon={<BookOutlined />}
                    title="Courses"
                >
                    <Menu.Item key="4">Course 1</Menu.Item>
                    <Menu.Item key="5">Course 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="6" icon={<FileTextOutlined />}>
                    Students
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
