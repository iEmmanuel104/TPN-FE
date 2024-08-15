import React from 'react';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
} from '@ant-design/icons';

interface SidebarProps {
    mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false }) => {
    return (
        <Menu
            defaultSelectedKeys={['1']}
            mode={mobile ? 'inline' : 'vertical'}
            theme="light"
            className={mobile ? 'px-2 py-4' : ''}
        >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
                Dashboard
            </Menu.Item>
            <Menu.SubMenu
                key="sub1"
                icon={<UserOutlined />}
                title="Instructors"
            >
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
