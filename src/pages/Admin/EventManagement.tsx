import React, { useState, useCallback } from 'react';
import { Table, Button, Space, Modal, Form, Input, DatePicker, Switch, message, Tag, Tooltip, Row, Col, Select, TimePicker } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, UserAddOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
import DashboardLayout from '../../components/Admin/DashboardLayout';
import {
    useGetAllEventsQuery,
    useAddEventMutation,
    useDeleteEventMutation,
    useAddAttendeeMutation,
    EventDto,
    GetAllEventsParams,
} from '../../api/eventApi';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';

const { confirm } = Modal;
const { Option } = Select;

const EventManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [attendeeForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAttendeeModalVisible, setIsAttendeeModalVisible] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<GetAllEventsParams['status']>('all');
    const [isBannerUploading, setIsBannerUploading] = useState(false);

    const { data: eventsData, isLoading: isEventsLoading, refetch: refetchEvents } = useGetAllEventsQuery({ status: statusFilter });
    const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();
    const [deleteEvent] = useDeleteEventMutation();
    const [addAttendee] = useAddAttendeeMutation();

    const { openWidget: openCloudinaryWidget } = useCloudinaryWidget({
        onSuccess: (url: string) => {
            setBannerUrl(url);
            form.setFieldsValue({ banner: url });
            setIsBannerUploading(false);
        },
        onError: () => {
            setIsBannerUploading(false);
            message.error('Failed to upload banner');
        },
    });

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
        setBannerUrl('');
    };

    const showAttendeeModal = (eventId: string) => {
        setSelectedEventId(eventId);
        setIsAttendeeModalVisible(true);
        attendeeForm.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const eventData = {
                ...values,
                start_time_info: {
                    date: moment(values.start_time_info.date).format('YYYY-MM-DD'),
                    time: moment(values.start_time_info.time).format('HH:mm'),
                    timezone: values.start_time_info.timezone,
                },
            };

            await addEvent(eventData).unwrap();
            message.success('Event added successfully');
            setIsModalVisible(false);
            refetchEvents();
        } catch (error) {
            console.error('Failed to add event:', error);
            message.error('Failed to add event');
        }
    };

    const handleAddAttendee = async () => {
        try {
            const values = await attendeeForm.validateFields();
            if (selectedEventId) {
                await addAttendee({ id: selectedEventId, ...values }).unwrap();
                message.success('Attendee added successfully');
                setIsAttendeeModalVisible(false);
                refetchEvents();
            }
        } catch (error) {
            console.error('Failed to add attendee:', error);
            message.error('Failed to add attendee');
        }
    };

    const handleDelete = useCallback(
        (id: string) => {
            confirm({
                title: 'Are you sure you want to delete this event?',
                onOk: async () => {
                    try {
                        await deleteEvent(id).unwrap();
                        message.success('Event deleted successfully');
                        refetchEvents();
                    } catch (error) {
                        console.error('Failed to delete event:', error);
                        message.error('Failed to delete event');
                    }
                },
            });
        },
        [deleteEvent, refetchEvents],
    );

    const getEventStatus = (event: EventDto): 'upcoming' | 'ongoing' | 'concluded' => {
        const now = moment();
        const { date, time, timezone } = event.start_time_info;
        const startTime = moment.tz(`${date} ${time}`, timezone);
        const endTime = startTime.clone().add(event.duration, 'minutes');

        if (now.isBefore(startTime)) {
            return 'upcoming';
        } else if (now.isAfter(endTime)) {
            return 'concluded';
        } else {
            return 'ongoing';
        }
    };

    const handleBannerUpload = () => {
        setIsBannerUploading(true);
        openCloudinaryWidget();
    };

    const columns = [
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Start Time',
            key: 'start_time',
            render: (_: unknown, record: EventDto) => {
                const { date, time, timezone } = record.start_time_info;
                return moment.tz(`${date} ${time}`, timezone).format('YYYY-MM-DD HH:mm z');
            },
        },
        {
            title: 'Duration (minutes)',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Timezone',
            dataIndex: 'timezone',
            key: 'timezone',
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: unknown, record: EventDto) => {
                const status = getEventStatus(record);
                const colorMap = {
                    upcoming: 'blue',
                    ongoing: 'green',
                    concluded: 'gray',
                };
                return <Tag color={colorMap[status]}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Public',
            dataIndex: 'is_public',
            key: 'is_public',
            render: (isPublic: boolean) => <Tag color={isPublic ? 'green' : 'red'}>{isPublic ? 'Public' : 'Private'}</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: EventDto) => (
                <Space size="middle">
                    <Tooltip title="View Event">
                        <Button icon={<EyeOutlined />} onClick={() => window.open(record.zoom_join_url, '_blank')} />
                    </Tooltip>
                    <Tooltip title="Add Attendee">
                        <Button icon={<UserAddOutlined />} onClick={() => showAttendeeModal(record.id)} />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const events = eventsData?.data?.events || [];

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Event Management</h1>
                    <Space>
                        <Select
                            defaultValue="all"
                            style={{ width: 120 }}
                            onChange={(value) => setStatusFilter(value as GetAllEventsParams['status'])}
                        >
                            <Option value="all">All Events</Option>
                            <Option value="upcoming">Upcoming</Option>
                            <Option value="ongoing">Ongoing</Option>
                            <Option value="concluded">Concluded</Option>
                        </Select>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                            Add New Event
                        </Button>
                    </Space>
                </div>
                <Table columns={columns} dataSource={events} loading={isEventsLoading} rowKey="id" />
            </div>
            <Modal
                title="Add New Event"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                confirmLoading={isAddingEvent}
                maskClosable={false}
                closable={true}
                closeIcon={<CloseOutlined />}
            >
                <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name={['start_time_info', 'date']} label="Date" rules={[{ required: true }]}>
                                <DatePicker className="w-full" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={['start_time_info', 'time']} label="Time" rules={[{ required: true }]}>
                                <TimePicker format="HH:mm" className="w-full" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}>
                                <Input type="number" min={1} max={1440} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name={['start_time_info', 'timezone']} label="Timezone" rules={[{ required: true }]}>
                                <Select
                                    showSearch
                                    className="w-full"
                                    placeholder="Select a timezone"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        ((option?.children ?? '') as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {moment.tz.names().map((tz) => (
                                        <Option key={tz} value={tz}>
                                            {tz}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="is_public" label="Public Event" valuePropName="checked">
                                <Switch />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="banner" label="Banner" rules={[{ required: true, message: 'Please upload a banner' }]}>
                                <div className="flex items-center space-x-4">
                                    <Button icon={<UploadOutlined />} onClick={handleBannerUpload} loading={isBannerUploading}>
                                        {bannerUrl ? 'Change Banner' : 'Upload Banner'}
                                    </Button>
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            {bannerUrl && (
                                <div className="mt-4">
                                    <p className="mb-2 font-semibold">Banner Preview:</p>
                                    <img src={bannerUrl} alt="Event banner" className="w-full h-40 object-cover rounded" />
                                </div>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Modal>
            <Modal title="Add Attendee" open={isAttendeeModalVisible} onOk={handleAddAttendee} onCancel={() => setIsAttendeeModalVisible(false)}>
                <Form form={attendeeForm} layout="vertical">
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
        </DashboardLayout>
    );
};

export default EventManagement;
