import React from 'react';
import { Input, Avatar, Badge } from 'antd';
import {
    BellOutlined,
    SettingOutlined,
    SearchOutlined,
} from '@ant-design/icons';

const DashboardHeader: React.FC = () => {
    return (
        <header className="flex justify-between items-center bg-white px-4 py-2">
            <div className="flex items-center space-x-2 bg-[#6366F1] px-4 py-2 ">
                <img
                    src="https://res.cloudinary.com/drc6omjqc/image/upload/v1721073067/chain_breaker_lmjc02.webp"
                    alt="EDUMIN"
                    className="w-8 h-8"
                />
                <span className="text-white font-bold text-xl">EDUMIN</span>
            </div>
            <div className="relative flex-grow max-w-xl mx-4">
                <Input
                    prefix={<SearchOutlined className="text-gray-400" />}
                    placeholder="Search"
                    className="text-gray-600 placeholder-gray-400 border-none rounded-md bg-[#F7F7F7]"
                />
            </div>
            <div className="flex items-center space-x-4">
                <Badge count={76} className="bg-transparent text-blue-600">
                    <BellOutlined className="text-lg text-blue-600" />
                </Badge>
                <Badge count={15} className="bg-transparent text-blue-600">
                    <SettingOutlined className="text-lg text-blue-600" />
                </Badge>
                <Avatar
                    src="https://randomuser.me/api/portraits/thumb/men/1.jpg"
                    size="large"
                />
            </div>
        </header>
    );
};

export default DashboardHeader;
