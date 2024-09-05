import React, { useEffect, useState } from 'react';
import { Card, Typography, Avatar, Rate, Divider } from 'antd';
import { UserOutlined, StarOutlined, FileTextOutlined } from '@ant-design/icons';
import { CourseDto } from '../api/courseApi';

const { Title, Text, Paragraph } = Typography;

interface CourseCardProps extends CourseDto {
    onClick: (id: string) => void;
    isList?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, title, description, media, price, currency, instructor, stats, onClick, isList = false }) => {
    const [truncateLength, setTruncateLength] = useState(45);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setTruncateLength(60);
            } else {
                setTruncateLength(45);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const formatPrice = (price: number, symbol: string) => {
        return price === 0 ? 'Free' : `${symbol}${price.toFixed(2)}`;
    };

    const truncateDescription = (desc: string, maxLength: number) => {
        return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
    };

    if (isList) {
        return (
            <div
                onClick={() => onClick(id)}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 hover:bg-gray-50 cursor-pointer border-b w-full"
            >
                <div className="w-full sm:w-64 h-40 flex-shrink-0">
                    <img src={media.videoThumbnail || '/placeholder-image.jpg'} alt={title} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex-grow">
                    <Title level={4} className="mb-2 line-clamp-2 h-16 overflow-hidden">
                        {title}
                    </Title>
                    <Paragraph className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</Paragraph>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div className="flex items-center space-x-4">
                            <Avatar src={instructor.info.profilePictureUrl} icon={<UserOutlined />} />
                            <Text className="text-gray-500">{instructor.name}</Text>
                        </div>
                        <Divider type="vertical" className="hidden sm:block h-6" />
                        <div className="flex flex-wrap items-center space-x-4">
                            <span className="flex items-center text-gray-500 text-sm">
                                <FileTextOutlined className="mr-1" />
                                {stats.numberOfModules} modules
                            </span>
                            <Divider type="vertical" className="hidden sm:block h-6" />
                            <span className="flex items-center text-gray-500 text-sm">
                                <UserOutlined className="mr-1" />
                                {stats.numberOfPaidStudents} students
                            </span>
                            <Divider type="vertical" className="hidden sm:block h-6" />
                            <span className="flex items-center text-gray-500 text-sm">
                                <StarOutlined className="mr-1" />
                                {stats.overallRating.toFixed(1)} ({stats.ratingCount} reviews)
                            </span>
                            <Divider type="vertical" className="hidden sm:block h-6" />
                            <Text strong className="text-lg" style={{ color: price === 0 ? '#52c41a' : '#f5222d' }}>
                                {formatPrice(price, currency.symbol)}
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Card
            hoverable
            className="h-full flex flex-col overflow-hidden"
            cover={
                <div className="relative">
                    <img alt={title} src={media.videoThumbnail} className="h-40 w-full object-cover" />
                </div>
            }
            onClick={() => onClick(id)}
            bodyStyle={{ padding: '12px', display: 'flex', flexDirection: 'column', height: 'calc(100% - 160px)' }}
        >
            <div className="flex-grow flex flex-col">
                <div className="flex flex-col items-center -mt-12 mb-4">
                    <Avatar src={instructor.info.profilePictureUrl} icon={<UserOutlined />} className="border-4 border-white" size={64} />
                    <Text className="text-gray-600 mt-2">{instructor.name}</Text>
                </div>
                <Title level={5} className="mb-1 text-xs font-semibold line-clamp-2" style={{ marginTop: 0 }}>
                    {title}
                </Title>
                <Text className="text-gray-500 text-xs mb-2 h-8 overflow-hidden">{truncateDescription(description, truncateLength)}</Text>
                <div className="flex items-center mb-2">
                    <Rate disabled defaultValue={stats.overallRating} className="text-xs mr-1" />
                    <Text className="text-xs text-gray-500">({stats.ratingCount})</Text>
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 text-xs text-gray-500 mb-2 border-t border-gray-200">
                    <div className="flex space-x-4">
                        <span className="flex items-center text-gray-500 text-sm">
                            <FileTextOutlined className="mr-1" />
                            {stats.numberOfModules}
                        </span>
                        <span className="flex items-center text-gray-500 text-sm">
                            <UserOutlined className="mr-1" />
                            {stats.numberOfPaidStudents}
                        </span>
                    </div>
                    <Text strong className="text-sm" style={{ color: price === 0 ? '#52c41a' : '#f5222d' }}>
                        {formatPrice(price, currency.symbol)}
                    </Text>
                </div>
            </div>
        </Card>
    );
};

export default CourseCard;