import React, { useState, CSSProperties } from 'react';
import { Layout, Menu, Input, Button, Drawer, Dropdown, Avatar } from 'antd';
import { SearchOutlined, MenuOutlined, DownOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthModal from './AuthModal';
import { AuthModalType } from '../constants';
import { RootState } from '../state/store';
import { logOut } from '../state/slices/authSlice';

const { Header } = Layout;
const { Search } = Input;

interface NavbarProps {
    onOpenAuthModal: (type: AuthModalType) => void;
    isAuthModalOpen: boolean;
    authModalType: AuthModalType;
    onCloseAuthModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal, isAuthModalOpen, authModalType, onCloseAuthModal }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const handleSearch = (value: string) => {
        console.log(value);
        // Implement search functionality here
    };

    const handleLogout = () => {
        dispatch(logOut());
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile">
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="settings">
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

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

                {/* Desktop menu */}
                <div className="hidden lg:flex items-center space-x-6 flex-grow justify-center">
                    <Dropdown overlay={categoryMenu} trigger={['hover']}>
                        <a className="ant-dropdown-link flex items-center cursor-pointer">
                            <MenuOutlined className="mr-2" />
                            Categories
                            <DownOutlined className="ml-2" />
                        </a>
                    </Dropdown>

                    <Search placeholder="Search..." allowClear onSearch={handleSearch} className="w-[32rem] max-w-[40%]" />

                    <Dropdown overlay={pagesMenu} trigger={['hover']}>
                        <a className="ant-dropdown-link flex items-center cursor-pointer">
                            Discover
                            <DownOutlined className="ml-2" />
                        </a>
                    </Dropdown>

                    <Link to="/events" className="text-gray-700 hover:text-indigo-600">
                        Events
                    </Link>
                </div>

                {/* Login and Signup buttons */}
                <div className="hidden lg:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <a className="ant-dropdown-link flex items-center cursor-pointer">
                                <Avatar src={user?.displayImage} icon={<UserOutlined />} />
                                <span className="ml-2">
                                    {user?.firstName} {user?.lastName}
                                </span>
                                <DownOutlined className="ml-2" />
                            </a>
                        </Dropdown>
                    ) : (
                        <>
                            <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => onOpenAuthModal(AuthModalType.LOGIN)}>
                                LOGIN
                            </Button>
                            <Button type="primary" className="bg-gray-600 hover:bg-indigo-700" onClick={() => onOpenAuthModal(AuthModalType.SIGNUP)}>
                                SIGNUP
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile buttons */}
                <div className="flex lg:hidden items-center space-x-4">
                    {isLoggedIn ? (
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <Avatar src={user?.displayImage} icon={<UserOutlined />} />
                        </Dropdown>
                    ) : (
                        <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => onOpenAuthModal(AuthModalType.LOGIN)}>
                            LOGIN
                        </Button>
                    )}
                    <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} />
                </div>
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
                        <Menu.Item key="events">
                            <Link to="/events">Events</Link>
                        </Menu.Item>
                    </Menu>
                    <div className="mt-4 flex space-x-4">
                        <Button type="primary" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                            LOGIN
                        </Button>
                        <Button type="primary" className="flex-1 bg-gray-600 hover:bg-indigo-700">
                            SIGNUP
                        </Button>
                    </div>
                </div>
            </Drawer>

            <AuthModal visible={isAuthModalOpen} onClose={onCloseAuthModal} type={authModalType} onSwitchType={(type) => onOpenAuthModal(type)} />
        </Header>
    );
};

export default Navbar;