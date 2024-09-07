import React, { useState } from 'react';
import { Avatar, Badge, Dropdown, Menu, Modal } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined, LogoutOutlined, MailOutlined, IdcardOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../state/store';
import { logOut } from '../../state/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const DashboardHeader: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const admin = useSelector((state: RootState) => state.auth.admin);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/iadmin/login');
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" icon={<UserOutlined />} onClick={showModal}>
                Profile
            </Menu.Item>
            <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className="flex-grow flex justify-between items-center bg-white px-4 py-2 w-full">
                <div className="flex items-center space-x-2 bg-[#6366F1] px-4 py-2">
                    <img
                        src="https://res.cloudinary.com/drc6omjqc/image/upload/v1721073067/chain_breaker_lmjc02.webp"
                        alt="EDUMIN"
                        className="w-8 h-8"
                    />
                    <span className="text-white font-bold text-sm">Texas Prevention Network</span>
                </div>
                {/* <div className="relative flex-grow max-w-xl mx-4 hidden md:block">
                    <Input
                        prefix={<SearchOutlined className="text-gray-400" />}
                        placeholder="Search"
                        className="text-gray-600 placeholder-gray-400 border-none rounded-md bg-[#F7F7F7]"
                    />
                </div> */}
                <div className="flex items-center space-x-4">
                    <Badge count={5} className="bg-transparent text-blue-600">
                        <BellOutlined className="text-lg text-blue-600" />
                    </Badge>
                    <Badge count={2} className="bg-transparent text-blue-600">
                        <SettingOutlined className="text-lg text-blue-600" />
                    </Badge>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Avatar size={32} icon={<UserOutlined />} />
                            <span className="text-sm font-medium">{admin?.name || 'Admin'}</span>
                        </div>
                    </Dropdown>
                </div>
            </div>

            <Modal title="Admin Profile" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <div className="flex flex-col items-center space-y-4">
                    <Avatar size={100} icon={<UserOutlined />} />
                    <h2 className="text-2xl font-bold">{admin?.name || 'Admin'}</h2>
                    <div className="w-full space-y-2">
                        <p className="flex items-center">
                            <MailOutlined className="mr-2" /> {admin?.email || 'N/A'}
                        </p>
                        <p className="flex items-center">
                            <IdcardOutlined className="mr-2" /> {admin?.isSuperAdmin ? 'Super Admin' : 'Admin'}
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DashboardHeader;
