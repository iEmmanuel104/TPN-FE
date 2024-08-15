import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={250}
            collapsedWidth={80}
            breakpoint="lg"
            style={{ zIndex: 1000 }}
        >
            <Menu defaultSelectedKeys={['1']} mode="inline" theme="light">
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    {!collapsed && 'Dashboard'}
                </Menu.Item>
                <Menu.SubMenu
                    key="sub1"
                    icon={<UserOutlined />}
                    title={!collapsed && 'Instructors'}
                >
                    <Menu.Item key="2">Professor 1</Menu.Item>
                    <Menu.Item key="3">Professor 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu
                    key="sub2"
                    icon={<BookOutlined />}
                    title={!collapsed && 'Courses'}
                >
                    <Menu.Item key="4">Course 1</Menu.Item>
                    <Menu.Item key="5">Course 2</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item key="6" icon={<FileTextOutlined />}>
                    {!collapsed && 'Students'}
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;
