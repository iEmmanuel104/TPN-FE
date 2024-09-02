// components/Sidebar.tsx
import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, UserOutlined, BookOutlined, TeamOutlined, SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface SidebarProps {
    mobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ mobile = false }) => {
    const location = useLocation();
    const currentAdmin = useSelector((state: RootState) => state.auth.admin);

    return (
        <Menu defaultSelectedKeys={[location.pathname]} mode="inline" theme="light" className={`h-full ${mobile ? 'px-2 py-4' : ''}`}>
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
            <Menu.Item key="/iadmin/instructors" icon={<UserOutlined />}>
                <Link to="/iadmin/instructors">Instructors</Link>
            </Menu.Item>
            <Menu.Item key="/iadmin/students" icon={<TeamOutlined />}>
                <Link to="/iadmin/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="/iadmin/blogs" icon={<FileTextOutlined />}>
                <Link to="/iadmin/blogs">Blog</Link>
            </Menu.Item>
            {currentAdmin?.isSuperAdmin && (
                <Menu.Item key="/iadmin/admins" icon={<SettingOutlined />}>
                    <Link to="/iadmin/admins">Admin Management</Link>
                </Menu.Item>
            )}
        </Menu>
    );
};

export default Sidebar;
