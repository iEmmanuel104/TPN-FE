import React, { useState, CSSProperties, useEffect } from 'react';
import { Layout, Menu, Input, Button, Drawer, Dropdown, Avatar, AutoComplete } from 'antd';
import {
    MenuOutlined,
    DownOutlined,
    CloseOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    StarOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthModal from './AuthModal';
import { AuthModalType } from '../constants';
import { RootState } from '../state/store';
import { logOut } from '../state/slices/authSlice';
import { useGetAllCoursesQuery } from '../api/courseApi';
import { CourseDto } from '../api/courseApi';
import categories from '../constants/categories.json';


const { Header } = Layout;
const { Search } = Input;

interface NavbarProps {
    onOpenAuthModal: (type: AuthModalType) => void;
    isAuthModalOpen: boolean;
    authModalType: AuthModalType;
    onCloseAuthModal: () => void;
}

const CourseSearchResult: React.FC<{ course: CourseDto }> = ({ course }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <div onClick={handleClick} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer">
            <img src={course.media.videoThumbnail || '/placeholder-image.jpg'} alt={course.title} className="w-16 h-16 object-cover rounded mr-4" />
            <div className="flex-grow">
                <h4 className="text-sm font-semibold mb-1">{course.title}</h4>
                <p className="text-xs text-gray-500 mb-1">{course.instructor.name}</p>
                <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center mr-2">
                        <StarOutlined className="mr-1" />
                        {course.stats.overallRating.toFixed(1)} ({course.stats.ratingCount})
                    </span>
                    <span className="flex items-center mr-2">
                        <FileTextOutlined className="mr-1" />
                        {course.stats.numberOfModules} modules
                    </span>
                    <span className="flex items-center">
                        <UserOutlined className="mr-1" />
                        {course.stats.numberOfPaidStudents} students
                    </span>
                </div>
            </div>
            <div className="text-sm font-semibold">{course.level}</div>
        </div>
    );
};

const Navbar: React.FC<NavbarProps> = ({ onOpenAuthModal, isAuthModalOpen, authModalType, onCloseAuthModal }) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const { data: coursesData } = useGetAllCoursesQuery({ q: searchValue, page: 1, size: 5 });

    const isCoursePage = location.pathname === '/courses';

    const handleCategoryClick = (category: string) => {
        if (isCoursePage) {
            // If already on the course page, use the existing filter mechanism
            // This assumes you have a function to update filters on the course page
            // You might need to implement this using context or state management
            // For now, we'll just log it
            console.log(`Filter courses by category: ${category}`);
        } else {
            // Redirect to the course page with the category as a query parameter
            navigate(`/courses?category=${encodeURIComponent(category)}`);
        }
    };

    useEffect(() => {
        if (isLoggedIn && location.pathname === '/') {
            navigate('/dashboard');
        }
    }, [isLoggedIn, location.pathname, navigate]);

    const handleSearch = (value: string) => {
        navigate(`/courses?search=${encodeURIComponent(value)}`);
    };

    const handleLogout = () => {
        dispatch(logOut());
        setDrawerVisible(false);
    };

    const handleNavigation = (path: string) => {
        if (path.startsWith('#')) {
            if (location.pathname === '/') {
                // If we're already on the home page, just scroll to the section
                const element = document.querySelector(path);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // If we're on a different page, navigate to home and then scroll
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(path);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        } else {
            navigate(path);
        }
        setDrawerVisible(false);
    };

    const userMenu = (
        <Menu>
            <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/dashboard/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                <Link to="/dashboard/profile?tab=settings">Settings</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

     const categoryMenu = (
         <Menu>
             {categories.slice(0, 10).map((category, index) => (
                 <Menu.Item key={index} onClick={() => handleCategoryClick(category)}>
                     {category}
                 </Menu.Item>
             ))}
         </Menu>
     );
    const pagesMenu = (
        <Menu>
            <Menu.Item key="1" onClick={() => handleNavigation('/courses')}>
                Courses
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleNavigation('/blogs')}>
                Blog
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleNavigation('/#about-us')}>
                About Us
            </Menu.Item>
            <Menu.Item key="4" onClick={() => handleNavigation('/contact')}>
                Contact
            </Menu.Item>
            <Menu.Item key="5" onClick={() => handleNavigation('/#faq')}>
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
                <Link to={isLoggedIn ? '/dashboard' : '/'} className="text-2xl font-bold text-indigo-700">
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

                    <AutoComplete
                        popupClassName="certain-category-search-dropdown"
                        popupMatchSelectWidth={500}
                        style={{ width: 500 }}
                        options={coursesData?.data?.courses.map((course) => ({
                            value: course.id,
                            label: <CourseSearchResult course={course} />,
                        }))}
                        onSelect={(value) => navigate(`/course/${value}`)}
                    >
                        <Search
                            placeholder="Search for courses..."
                            allowClear
                            onSearch={handleSearch}
                            onChange={(e) => setSearchValue(e.target.value)}
                            style={{
                                backgroundColor: '#f0f0f0',
                                overflow: 'hidden',
                            }}
                            className="w-full custom-search-input"
                        />
                    </AutoComplete>

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
                            <Link to="/dashboard" className="ant-dropdown-link flex items-center cursor-pointer">
                                <Avatar src={user?.displayImage} icon={<UserOutlined />} />
                                <span className="ml-2">
                                    {user?.firstName} {user?.lastName}
                                </span>
                                <DownOutlined className="ml-2" />
                            </Link>
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
                    {isLoggedIn && (
                        <Link to="/dashboard">
                            <Avatar src={user?.displayImage} icon={<UserOutlined />} />
                        </Link>
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
                    <AutoComplete
                        popupClassName="certain-category-search-dropdown"
                        popupMatchSelectWidth={300}
                        style={{ width: '100%' }}
                        options={coursesData?.data?.courses.map((course) => ({
                            value: course.id,
                            label: <CourseSearchResult course={course} />,
                        }))}
                        onSelect={(value) => {
                            navigate(`/course/${value}`);
                            setDrawerVisible(false);
                        }}
                    >
                        <Search
                            placeholder="Search for courses..."
                            allowClear
                            onSearch={(value) => {
                                handleSearch(value);
                                setDrawerVisible(false);
                            }}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-full mb-4"
                        />
                    </AutoComplete>
                    <Menu mode="inline" className="w-full border-r-0">
                        <Menu.SubMenu key="categories" title="Categories" icon={<MenuOutlined />}>
                            {categories.map((category, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => {
                                        handleCategoryClick(category);
                                        setDrawerVisible(false);
                                    }}
                                >
                                    {category}
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                        <Menu.SubMenu key="pages" title="Page" icon={<DownOutlined />}>
                            {pagesMenu.props.children}
                        </Menu.SubMenu>
                        <Menu.Item key="events" onClick={() => handleNavigation('/events')}>
                            Events
                        </Menu.Item>
                    </Menu>
                    {isLoggedIn ? (
                        <div className="mt-auto">
                            <Menu mode="inline" className="w-full border-r-0">
                                <Menu.Item key="profile" icon={<UserOutlined />}>
                                    <Link to="/dashboard/profile" onClick={() => setDrawerVisible(false)}>
                                        Profile
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="settings" icon={<SettingOutlined />}>
                                    <Link to="/dashboard/profile?tab=settings" onClick={() => setDrawerVisible(false)}>
                                        Settings
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        </div>
                    ) : (
                        <div className="mt-auto">
                            <Button
                                type="primary"
                                block
                                className="mb-2 bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => {
                                    onOpenAuthModal(AuthModalType.LOGIN);
                                    setDrawerVisible(false);
                                }}
                            >
                                LOGIN
                            </Button>
                            <Button
                                type="primary"
                                block
                                className="bg-gray-600 hover:bg-indigo-700"
                                onClick={() => {
                                    onOpenAuthModal(AuthModalType.SIGNUP);
                                    setDrawerVisible(false);
                                }}
                            >
                                SIGNUP
                            </Button>
                        </div>
                    )}
                </div>
            </Drawer>

            <AuthModal visible={isAuthModalOpen} onClose={onCloseAuthModal} type={authModalType} onSwitchType={(type) => onOpenAuthModal(type)} />
        </Header>
    );
};

export default Navbar;
