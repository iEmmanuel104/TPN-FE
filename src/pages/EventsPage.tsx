import React, { useState } from 'react';
import { Typography, Tabs, Breadcrumb, Spin, Card, Row, Col, Pagination, Button } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import { Link } from 'react-router-dom';
import { useGetAllEventsQuery, GetAllEventsParams, EventDto } from '../api/eventApi';
import moment from 'moment-timezone';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const EventsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'ongoing' | 'concluded'>('upcoming');
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const queryParams: GetAllEventsParams = {
        page,
        size: pageSize,
        status: activeTab,
    };

    const { data: eventsData, isLoading } = useGetAllEventsQuery(queryParams);

    const events = eventsData?.data?.events || [];
    const totalEvents = eventsData?.data?.count || 0;

    const handleTabChange = (key: string) => {
        setActiveTab(key as 'upcoming' | 'ongoing' | 'concluded');
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const isEventOngoing = (event: EventDto) => {
        const now = moment();
        const startTime = moment.tz(`${event.start_time_info.date} ${event.start_time_info.time}`, event.start_time_info.timezone);
        const endTime = startTime.clone().add(event.duration, 'minutes');
        return now.isBetween(startTime, endTime);
    };

    const handleJoinEvent = (zoomJoinUrl: string) => {
        window.open(zoomJoinUrl, '_blank');
    };

    return (
        <PublicLayout>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Breadcrumb className="mb-2">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Events</Breadcrumb.Item>
                </Breadcrumb>

                <Tabs activeKey={activeTab} centered className="mb-4" onChange={handleTabChange}>
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
                        <div className="space-y-4">
                            {events.map((event) => (
                                <Card key={event.id} className="overflow-hidden" bodyStyle={{ padding: '12px' }}>
                                    <Row gutter={16} align="middle">
                                        <Col xs={24} sm={4} className="text-center">
                                            <Text className="text-4xl font-bold text-yellow-400">
                                                {moment(event.start_time_info.date).format('DD')}
                                            </Text>
                                            <Text className="block text-yellow-400">{moment(event.start_time_info.date).format('MMM')}</Text>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Title level={5} className="mb-1 leading-tight">
                                                {event.topic}
                                            </Title>
                                            <Paragraph className="text-gray-600 mb-2 text-sm" ellipsis={{ rows: 2 }}>
                                                {event.description}
                                            </Paragraph>
                                            <div className="text-gray-500 mb-1 text-xs">
                                                <ClockCircleOutlined className="mr-1" />
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
                                            <div className="text-gray-500 mb-1 text-xs">
                                                <EnvironmentOutlined className="mr-1" />
                                                <span>{event.start_time_info.timezone}</span>
                                            </div>
                                            <Text className="text-gray-600 text-xs">Duration: {event.duration} minutes</Text>
                                            {isEventOngoing(event) && (
                                                <Button
                                                    size="small"
                                                    type="primary"
                                                    className="mt-2"
                                                    onClick={() => handleJoinEvent(event.zoom_join_url)}
                                                >
                                                    Join Event
                                                </Button>
                                            )}
                                        </Col>
                                        <Col xs={24} sm={8}>
                                            <div style={{ height: '120px', overflow: 'hidden' }}>
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
                        <div className="mt-4 flex justify-center">
                            <Pagination current={page} pageSize={pageSize} total={totalEvents} onChange={handlePageChange} showSizeChanger={false} />
                        </div>
                    </>
                )}
            </div>
        </PublicLayout>
    );
};

export default EventsPage;
