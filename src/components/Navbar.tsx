import React, { useState, CSSProperties } from 'react';
import { Layout, Menu, Input, Button, Drawer, Dropdown } from 'antd';
import { SearchOutlined, MenuOutlined, DownOutlined, CloseOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Search } = Input;

const Navbar: React.FC = () => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (value: string) => {
        console.log(value);
        // Implement search functionality here
    };

    const categoryMenu = (
        <Menu>
            <Menu.Item key="1">Parenting</Menu.Item>
            <Menu.Item key="2">Anger Management</Menu.Item>
            <Menu.Item key="3">Alcohol Addiction</Menu.Item>
            <Menu.Item key="4">Drug Addiction</Menu.Item>
            <Menu.Item key="5">Domestic Violence</Menu.Item>
        </Menu>
    );

    const pagesMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => navigate('/courses')}>
                Courses
            </Menu.Item>
            <Menu.Item key="2" onClick={() => navigate('/blog')}>
                Blog
            </Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/about')}>
                About Us
            </Menu.Item>
            <Menu.Item key="4" onClick={() => navigate('/contact')}>
                Contact
            </Menu.Item>
            <Menu.Item key="5" onClick={() => navigate('/faqs')}>
                FAQs
            </Menu.Item>
        </Menu>
    );

    const headerStyle: CSSProperties = {
        padding: '0 16px',
    };

    return (
        <Header
            className="bg-white py-0 sticky top-0 z-50 w-full max-w-full overflow-x-hidden shadow-md sm:px-6 lg:px-24 xl:px-32"
            style={headerStyle}
        >
            <div className="container mx-auto flex items-center justify-between h-full">
                <Link to="/" className="text-2xl font-bold text-indigo-700">
                    TPN
                </Link>

                {/* Mobile menu button */}
                <Button className="lg:hidden" icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center space-x-6 flex-grow justify-center">
                    <Dropdown overlay={categoryMenu} trigger={['click']}>
                        <a className="ant-dropdown-link flex items-center cursor-pointer">
                            <MenuOutlined className="mr-2" />
                            Categories
                            <DownOutlined className="ml-2" />
                        </a>
                    </Dropdown>

                    <Search placeholder="Search..." allowClear onSearch={handleSearch} className="w-64" />

                    <Dropdown overlay={pagesMenu} trigger={['click']}>
                        <a className="ant-dropdown-link flex items-center cursor-pointer">
                            Page
                            <DownOutlined className="ml-2" />
                        </a>
                    </Dropdown>

                    <Link to="/become-teacher" className="text-gray-700 hover:text-indigo-600">
                        Become a Teacher
                    </Link>
                </div>

                <Button type="primary" className="hidden lg:inline-block bg-indigo-600 hover:bg-indigo-700">
                    LOGIN
                </Button>
            </div>

            {/* Mobile menu drawer */}
            <Drawer
                title="Menu"
                placement="left"
                closable={false}
                onClose={() => setDrawerVisible(false)}
                open={drawerVisible}
                bodyStyle={{ padding: 0 }}
                headerStyle={{ display: 'none' }}
                width="80%"
            >
                <div className="p-4 h-full flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <Link to="/" className="text-2xl font-bold text-indigo-700" onClick={() => setDrawerVisible(false)}>
                            TPN
                        </Link>
                        <Button icon={<CloseOutlined />} onClick={() => setDrawerVisible(false)} />
                    </div>
                    <Search
                        placeholder="Search..."
                        allowClear
                        enterButton={<SearchOutlined />}
                        size="large"
                        onSearch={handleSearch}
                        className="w-full mb-4"
                    />
                    <Menu mode="inline" className="w-full border-r-0">
                        <Menu.SubMenu key="categories" title="Categories" icon={<MenuOutlined />}>
                            {categoryMenu.props.children}
                        </Menu.SubMenu>
                        <Menu.SubMenu key="pages" title="Page" icon={<DownOutlined />}>
                            {pagesMenu.props.children}
                        </Menu.SubMenu>
                        <Menu.Item key="become-teacher">
                            <Link to="/become-teacher">Become a Teacher</Link>
                        </Menu.Item>
                    </Menu>
                    <Button type="primary" className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                        LOGIN
                    </Button>
                </div>
            </Drawer>
        </Header>
    );
};

export default Navbar;
