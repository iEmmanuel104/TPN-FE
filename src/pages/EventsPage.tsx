import React from 'react';
import { Typography, Tabs, Divider, Breadcrumb } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import EventImage from '../assets/drugrehab.jpeg';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Event {
    id: number;
    date: { day: number; month: string };
    title: string;
    time: string;
    location: string;
    description: string;
    image: string;
}

const event: Event = {
    id: 1,
    date: { day: 15, month: 'Oct' },
    title: 'Autumn Science Lectures',
    time: '8:00 Am - 5:00 Pm',
    location: 'Venice, Italy',
    description: 'Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris itae erat conuat',
    image: EventImage,
};

const events = Array(3).fill(event);

const EventsPage: React.FC = () => {
    return (
        <PublicLayout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Events</Breadcrumb.Item>
                </Breadcrumb>

                <Tabs defaultActiveKey="1" centered className="mb-8">
                    <TabPane tab="Happening" key="1" />
                    <TabPane tab="Upcoming" key="2" />
                    <TabPane tab="Expired" key="3" />
                </Tabs>

                <div className="space-y-6">
                    {events.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center border overflow-hidden">
                            <div className="flex-shrink-0 w-full sm:w-24 py-4 sm:py-6 flex flex-row sm:flex-col justify-center items-center">
                                <Text className="text-5xl font-bold text-yellow-400 mr-2 sm:mr-0">{item.date.day}</Text>
                                <Text className="text-yellow-400">{item.date.month}</Text>
                            </div>
                            <Divider type="vertical" className="hidden sm:block h-32 self-center mx-4" style={{ borderWidth: 0.5 }} />
                            <div className="flex-grow w-full sm:w-auto py-4 sm:py-6 px-4 sm:pr-6 flex flex-col justify-start">
                                <Title level={4} className="mb-2 text-start">
                                    {item.title}
                                </Title>
                                <div className="text-gray-500 mb-2 text-start">
                                    <ClockCircleOutlined className="mr-2" />
                                    <span>{item.time}</span>
                                    <EnvironmentOutlined className="ml-4 mr-2" />
                                    <span>{item.location}</span>
                                </div>
                                <Text className="text-gray-600 text-start">{item.description}</Text>
                            </div>
                            <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PublicLayout>
    );
};

export default EventsPage;