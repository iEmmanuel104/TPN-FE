import React from 'react';
import { Input, Avatar, Badge } from 'antd';
import {
    UserOutlined,
    BellOutlined,
    SettingOutlined,
    MailOutlined,
} from '@ant-design/icons';

const DashboardHeader: React.FC = () => {
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow">
            <div className="flex items-center space-x-2">
                <Avatar icon={<UserOutlined />} />
                <span className="font-bold text-xl">EDUMIN</span>
            </div>
            <Input.Search placeholder="Search" className="w-1/3" />
            <div className="flex items-center space-x-4">
                <Badge count={76}>
                    <MailOutlined style={{ fontSize: '20px' }} />
                </Badge>
                <Badge count={15}>
                    <BellOutlined style={{ fontSize: '20px' }} />
                </Badge>
                <SettingOutlined style={{ fontSize: '20px' }} />
            </div>
        </div>
    );
};

export default DashboardHeader;
