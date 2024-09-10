import React, { useState } from 'react';
import { Typography, Tabs, Divider, Breadcrumb, Spin, Modal, Form, Input, message } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery, useAddAttendeeMutation, EventDto } from '../api/eventApi';
import moment from 'moment';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const EventsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'concluded'>('upcoming');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
    const [form] = Form.useForm();

    const { data: eventsData, isLoading } = useGetAllEventsQuery({ status: activeTab });
    const [addAttendee] = useAddAttendeeMutation();

    const events = eventsData?.data?.events || [];

    const handleTabChange = (key: string) => {
        setActiveTab(key as 'upcoming' | 'ongoing' | 'concluded');
    };

    const showRegistrationModal = (event: EventDto) => {
        setSelectedEvent(event);
        setIsModalVisible(true);
    };

    const handleRegistration = async () => {
        try {
            const values = await form.validateFields();
            if (selectedEvent) {
                await addAttendee({
                    id: selectedEvent.id,
                    ...values,
                }).unwrap();
                message.success('Successfully registered for the event!');
                setIsModalVisible(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Failed to register:', error);
            message.error('Failed to register for the event');
        }
    };

    return (
        <PublicLayout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Events</Breadcrumb.Item>
                </Breadcrumb>

                <Tabs defaultActiveKey="upcoming" centered className="mb-8" onChange={handleTabChange}>
                    <TabPane tab="Upcoming" key="upcoming" />
                    <TabPane tab="Ongoing" key="ongoing" />
                    <TabPane tab="Concluded" key="concluded" />
                </Tabs>

                {isLoading ? (
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {events.map((event) => (
                            <div key={event.id} className="flex flex-col sm:flex-row items-center border overflow-hidden">
                                <div className="flex-shrink-0 w-full sm:w-24 py-4 sm:py-6 flex flex-row sm:flex-col justify-center items-center">
                                    <Text className="text-5xl font-bold text-yellow-400 mr-2 sm:mr-0">
                                        {moment(event.start_time_info.date).format('DD')}
                                    </Text>
                                    <Text className="text-yellow-400">{moment(event.start_time_info.date).format('MMM')}</Text>
                                </div>
                                <Divider type="vertical" className="hidden sm:block h-32 self-center mx-4" style={{ borderWidth: 0.5 }} />
                                <div className="flex-grow w-full sm:w-auto py-4 sm:py-6 px-4 sm:pr-6 flex flex-col justify-start">
                                    <Title level={4} className="mb-2 text-start">
                                        {event.topic}
                                    </Title>
                                    <div className="text-gray-500 mb-2 text-start">
                                        <ClockCircleOutlined className="mr-2" />
                                        <span>
                                            {moment
                                                .tz(`${event.start_time_info.date} ${event.start_time_info.time}`, event.start_time_info.timezone)
                                                .format('h:mm A')}{' '}
                                            -{' '}
                                            {moment
                                                .tz(`${event.start_time_info.date} ${event.start_time_info.time}`, event.start_time_info.timezone)
                                                .add(event.duration, 'minutes')
                                                .format('h:mm A')}
                                        </span>
                                        <EnvironmentOutlined className="ml-4 mr-2" />
                                        <span>{event.start_time_info.timezone}</span>
                                    </div>
                                    <Text className="text-gray-600 text-start mb-4">Duration: {event.duration} minutes</Text>
                                    <button
                                        onClick={() => showRegistrationModal(event)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 self-start"
                                    >
                                        Register
                                    </button>
                                </div>
                                <div className="w-full sm:w-1/3 h-48 sm:h-auto">
                                    <img src={event.banner} alt={event.topic} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Modal title="Register for Event" visible={isModalVisible} onOk={handleRegistration} onCancel={() => setIsModalVisible(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </PublicLayout>
    );
};

export default EventsPage;
