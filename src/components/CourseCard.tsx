import React from 'react';
import { Card, Typography, Avatar, Divider } from 'antd';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

type CourseCardProps = {
    title: string;
    instructor: {
        name: string;
        avatar: string;
    };
    lessons: number;
    students: number;
    image: string;
    price: number | string;
    onClick: () => void;
    isList?: boolean;
    description?: string;
};

const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, lessons, students, image, price, onClick, isList = false, description }) => {
    if (isList) {
        return (
            <div
                onClick={onClick}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 hover:bg-gray-50 cursor-pointer border-b"
            >
                <img src={image} alt={title} className="w-full sm:w-64 h-40 object-cover rounded" />
                <div className="flex-grow">
                    <Title level={4} className="mb-2">
                        {title}
                    </Title>
                    <Paragraph className="text-sm text-gray-600 mb-4">{description}</Paragraph>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <Avatar src={instructor.avatar} icon={<UserOutlined />} />
                            <Text className="text-gray-500">{instructor.name}</Text>
                        </div>
                        <Divider type="vertical" className="hidden sm:block h-6" />
                        <div className="flex flex-wrap items-center space-x-4">
                            <span className="flex items-center text-gray-500 text-sm">
                                <FileTextOutlined className="mr-1" />
                                {lessons} modules
                            </span>
                            <Divider type="vertical" className="hidden sm:block h-6" />
                            <span className="flex items-center text-gray-500 text-sm">
                                <UserOutlined className="mr-1" />
                                {students} students
                            </span>
                            <Divider type="vertical" className="hidden sm:block h-6" />
                            <Text strong className="text-lg" style={{ color: price === 'Free' ? '#52c41a' : '#f5222d' }}>
                                {price}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Grid view card remains unchanged
    return (
        <Card
            hoverable
            className="course-card flex flex-col h-full overflow-hidden"
            cover={
                <div className="relative">
                    <img alt={title} src={image} className="w-full h-48 object-cover" />
                </div>
            }
            onClick={onClick}
        >
            <div className="card-content">
                <div className="flex flex-col items-center -mt-12 mb-4">
                    <Avatar src={instructor.avatar} icon={<UserOutlined />} className="border-4 border-white" size={64} />
                    <Text className="text-gray-600 mt-2">{instructor.name}</Text>
                </div>
                <Text strong className="text-lg mb-4 line-clamp-2 text-center" style={{ height: '3.5rem' }}>
                    {title}
                </Text>
                <div className="flex justify-between items-center mt-auto">
                    <div className="flex space-x-4">
                        <span className="flex items-center text-gray-500 text-sm">
                            <FileTextOutlined className="mr-1" />
                            {lessons}
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                            <UserOutlined className="mr-1" />
                            {students}
                        </span>
                    </div>
                    <Text strong className="text-lg" style={{ color: price === 'Free' ? '#52c41a' : '#f5222d' }}>
                        {price}
                    </Text>
                </div>
            </div>
            <div className="card-footer"></div>
        </Card>
    );
};

export default CourseCard;