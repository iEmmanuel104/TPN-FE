import React from 'react';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

const Sidebar: React.FC = () => {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            mode="inline"
            theme="light"
            className="h-full"
        >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                Dashboard
            </Menu.Item>
            <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Professors">
                <Menu.Item key="2">Professor 1</Menu.Item>
                <Menu.Item key="3">Professor 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub2" icon={<BookOutlined />} title="Courses">
                <Menu.Item key="4">Course 1</Menu.Item>
                <Menu.Item key="5">Course 2</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="6" icon={<FileTextOutlined />}>
                Students
            </Menu.Item>
        </Menu>
    );
};

export default Sidebar;
