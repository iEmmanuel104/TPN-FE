import { Card, Typography, Avatar, Divider } from 'antd';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

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
};

const CourseCard = ({ title, instructor, lessons, students, image, price, onClick }: CourseCardProps) => (
    <Card
        hoverable
        className="flex flex-col h-full overflow-hidden"
        bodyStyle={{ padding: '16px' }}
        cover={
            <div className="relative">
                <img alt={title} src={image} className="w-full h-48 object-cover" />
            </div>
        }
        onClick={onClick}
    >
        <div className="flex flex-col items-center -mt-8">
            <Avatar size={64} src={instructor.avatar} icon={<UserOutlined />} className="border-4 border-white shadow-md" />
        </div>
        <div className="flex flex-col items-center mt-2">
            <Text className="text-gray-600">{instructor.name}</Text>
            <Title level={5} className="mb-2 text-center mt-2">
                {title}
            </Title>
        </div>
        <Divider className="my-2" />
        <div className="flex justify-between items-center">
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
            <Text strong className="text-green-500">
                {price}
            </Text>
        </div>
    </Card>
);

export default CourseCard;