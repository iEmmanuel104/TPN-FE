import React, { useState } from 'react';
import { Typography, Tabs, Breadcrumb, Spin, Modal, Form, Input, message, Card, Row, Col, Button, Pagination } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery, useAddAttendeeMutation, EventDto, GetAllEventsParams } from '../api/eventApi';
import moment from 'moment-timezone';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const EventsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'concluded'>('upcoming');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<EventDto | null>(null);
    const [form] = Form.useForm();
    const [page, setPage] = useState(1);
    const pageSize = 10; // You can adjust this or make it dynamic if needed

    const queryParams: GetAllEventsParams = {
        page,
        size: pageSize,
        status: activeTab,
    };

    const { data: eventsData, isLoading } = useGetAllEventsQuery(queryParams);
    const [addAttendee] = useAddAttendeeMutation();

    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const events = eventsData?.data?.events || [];
    const totalEvents = eventsData?.data?.count || 0;

    const handleTabChange = (key: string) => {
        setActiveTab(key as 'upcoming' | 'ongoing' | 'concluded');
        setPage(1); // Reset to first page when changing tabs
    };

    const showRegistrationModal = (event: EventDto) => {
        setSelectedEvent(event);
        if (isLoggedIn && user) {
            form.setFieldsValue({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            });
            handleRegistration(event.id);
        } else {
            setIsModalVisible(true);
        }
    };

    const handleRegistration = async (eventId?: string) => {
        try {
            const values = await form.validateFields();
            const id = eventId || selectedEvent?.id;
            if (id) {
                await addAttendee({
                    id,
                    ...values,
                    userId: user?.id,
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

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
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

                <Tabs activeKey={activeTab} centered className="mb-8" onChange={handleTabChange}>
                    <TabPane tab="Upcoming" key="upcoming" />
                    <TabPane tab="Ongoing" key="ongoing" />
                    <TabPane tab="Concluded" key="concluded" />
                </Tabs>

                {isLoading ? (
                    <div className="flex justify-center">
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <div className="space-y-6">
                            {events.map((event) => (
                                <Card key={event.id} className="overflow-hidden">
                                    <Row gutter={16} align="middle">
                                        <Col xs={24} sm={4} className="text-center">
                                            <Text className="text-5xl font-bold text-yellow-400">
                                                {moment(event.start_time_info.date).format('DD')}
                                            </Text>
                                            <Text className="block text-yellow-400">{moment(event.start_time_info.date).format('MMM')}</Text>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Title level={4} className="mb-2">
                                                {event.topic}
                                            </Title>
                                            <div className="text-gray-500 mb-2">
                                                <ClockCircleOutlined className="mr-2" />
                                                <span>
                                                    {moment
                                                        .tz(
                                                            `${event.start_time_info.date} ${event.start_time_info.time}`,
                                                            event.start_time_info.timezone,
                                                        )
                                                        .format('h:mm A')}{' '}
                                                    -{' '}
                                                    {moment
                                                        .tz(
                                                            `${event.start_time_info.date} ${event.start_time_info.time}`,
                                                            event.start_time_info.timezone,
                                                        )
                                                        .add(event.duration, 'minutes')
                                                        .format('h:mm A')}
                                                </span>
                                            </div>
                                            <div className="text-gray-500 mb-2">
                                                <EnvironmentOutlined className="mr-2" />
                                                <span>{event.start_time_info.timezone}</span>
                                            </div>
                                            <Text className="text-gray-600">Duration: {event.duration} minutes</Text>
                                            {!event.is_public && activeTab !== 'concluded' && (
                                                <Button type="primary" onClick={() => showRegistrationModal(event)} className="mt-4">
                                                    Register
                                                </Button>
                                            )}
                                        </Col>
                                        <Col xs={24} sm={8}>
                                            <div style={{ height: '200px', overflow: 'hidden' }}>
                                                <img
                                                    src={event.banner}
                                                    alt={event.topic}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Pagination current={page} pageSize={pageSize} total={totalEvents} onChange={handlePageChange} showSizeChanger={false} />
                        </div>
                    </>
                )}
            </div>

            <Modal title="Register for Event" visible={isModalVisible} onOk={() => handleRegistration()} onCancel={() => setIsModalVisible(false)}>
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
