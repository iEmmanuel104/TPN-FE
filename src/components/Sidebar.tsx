// components/Sidebar.tsx
import React from 'react';
import { Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    BookOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false }) => {
    const location = useLocation();

    return (
        <Menu
            defaultSelectedKeys={[location.pathname]}
            // defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            theme="light"
            className={`h-full ${mobile ? 'px-2 py-4' : ''}`}
        >
            <Menu.Item key="/iadmin/dashboard" icon={<DashboardOutlined />}>
                <Link to="/iadmin/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.SubMenu key="sub2" icon={<BookOutlined />} title="Courses">
                <Menu.Item key="/iadmin/courses">
                    <Link to="/iadmin/courses">All Courses</Link>
                </Menu.Item>
                <Menu.Item key="/iadmin/courses/add">
                    <Link to="/iadmin/courses/add">Add Course</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Instructors">
                <Menu.Item key="/iadmin/instructors/1">
                    <Link to="/iadmin/instructors/1">Professor 1</Link>
                </Menu.Item>
                <Menu.Item key="/iadmin/instructors/2">
                    <Link to="/iadmin/instructors/2">Professor 2</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/iadmin/students" icon={<FileTextOutlined />}>
                <Link to="/iadmin/students">Students</Link>
            </Menu.Item>
        </Menu>
    );
};

export default Sidebar;
