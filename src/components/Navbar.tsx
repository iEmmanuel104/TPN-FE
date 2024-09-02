import { SetStateAction, useState } from 'react';
import { Layout, Menu, Input, Avatar, Dropdown, Typography } from 'antd';
import { SearchOutlined, MenuOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

const Navbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (value: SetStateAction<string>) => {
        console.log(value);
        setSearch(value);
        // Implement search functionality here
    };

    console.log(search)

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

    const userMenu = (
        <Menu>
            <Menu.Item key="1">
                <div className="flex flex-col items-center">
                    <Avatar size={64} icon={<UserOutlined />} className="bg-blue-800" />
                    <Text strong className="text-blue-600 mt-2">
                        Henry Eyo
                    </Text>
                    <Text className="text-blue-900">henry.eyo2@gmail.com</Text>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2">Logout</Menu.Item>
        </Menu>
    );

    return (
        <Header className="bg-white px-9 py-4 flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <Link to="/" className="text-2xl font-bold">
                    TPNetwork
                </Link>
            </motion.div>

            <div className="flex items-center gap-x-4">
                <Dropdown overlay={categoryMenu} trigger={['click']}>
                    <a className="ant-dropdown-link flex items-center cursor-pointer">
                        <MenuOutlined className="mr-2" />
                        <Text strong>Categories</Text>
                        <DownOutlined className="ml-2" />
                    </a>
                </Dropdown>

                <Search
                    placeholder="Search"
                    allowClear
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={handleSearch}
                    style={{ width: 450 }}
                />
            </div>

            <div className="flex items-center gap-x-4">
                <Dropdown overlay={pagesMenu} trigger={['click']}>
                    <a className="ant-dropdown-link flex items-center cursor-pointer">
                        <Text strong>Pages</Text>
                        <DownOutlined className="ml-2" />
                    </a>
                </Dropdown>

                <Dropdown overlay={userMenu} trigger={['click']}>
                    <a className="ant-dropdown-link flex items-center cursor-pointer">
                        <Text strong className="mr-2">
                            Henry
                        </Text>
                        <DownOutlined />
                    </a>
                </Dropdown>
            </div>
        </Header>
    );
};

export default Navbar;
