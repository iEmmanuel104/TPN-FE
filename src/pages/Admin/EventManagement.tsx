import React, { useState, useCallback } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Tag, Tooltip, Row, Col, Select } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined, UploadOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment-timezone';
import DashboardLayout from '../../components/Admin/DashboardLayout';
import { useGetAllEventsQuery, useAddEventMutation, useDeleteEventMutation, EventDto, GetAllEventsParams } from '../../api/eventApi';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const EventManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<GetAllEventsParams['status']>('all');
    const [isBannerUploading, setIsBannerUploading] = useState(false);

    const { data: eventsData, isLoading: isEventsLoading, refetch: refetchEvents } = useGetAllEventsQuery({ status: statusFilter });
    const [addEvent, { isLoading: isAddingEvent }] = useAddEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

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
        onClose: () => {
            setIsBannerUploading(false);
        },
    });

    const showModal = () => {
        setIsModalVisible(true);
        form.resetFields();
        setBannerUrl('');
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const { year, month, day } = values.start_time_info.date;
            const formattedDate = `${year}-${month}-${day}`;

            console.log({formattedDate, month});

            const eventDate = moment(formattedDate);
            const currentDate = moment().startOf('day');

            if (eventDate.isSameOrBefore(currentDate)) {
                message.error('Event date must be in the future');
                return;
            }

            const eventData = {
                ...values,
                start_time_info: {
                    ...values.start_time_info,
                    date: formattedDate,
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

    const generateYearOptions = () => {
        const currentYear = moment().year();
        return Array.from({ length: 1 }, (_, index) => currentYear + index).map((year) => (
            <Option key={year} value={year.toString()}>
                {year}
            </Option>
        ));
    };

    const generateMonthOptions = () => {
        return Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
            <Option key={month} value={month.toString().padStart(2, '0')}>
                {month.toString().padStart(2, '0')}
            </Option>
        ));
    };

    const generateDayOptions = () => {
        return Array.from({ length: 31 }, (_, index) => index + 1).map((day) => (
            <Option key={day} value={day.toString().padStart(2, '0')}>
                {day.toString().padStart(2, '0')}
            </Option>
        ));
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
            title: 'Duration',
            dataIndex: 'duration',
            key: 'duration',
            render: (duration: number) => `${duration} mins`,
        },
        {
            title: 'Timezone',
            dataIndex: ['start_time_info', 'timezone'],
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
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: EventDto) => (
                <Space size="middle">
                    <Tooltip title="View Event">
                        <Button icon={<EyeOutlined />} onClick={() => window.open(record.zoom_join_url, '_blank')} />
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
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold mb-4 sm:mb-0">Event Management</h1>
                    <Space className="w-full sm:w-auto" direction="horizontal" size="middle" style={{ display: 'flex' }}>
                        <Select
                            defaultValue="all"
                            style={{ width: '100%' }}
                            onChange={(value) => setStatusFilter(value as GetAllEventsParams['status'])}
                        >
                            <Option value="all">All Events</Option>
                            <Option value="upcoming">Upcoming</Option>
                            <Option value="ongoing">Ongoing</Option>
                            <Option value="concluded">Concluded</Option>
                        </Select>
                        <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ width: '100%' }}>
                            Add New Event
                        </Button>
                    </Space>
                </div>
                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={events}
                        loading={isEventsLoading}
                        rowKey="id"
                        scroll={{ x: 'max-content' }}
                        className="min-w-full"
                    />
                </div>
            </div>
            <Modal
                title="Add New Event"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width="100%"
                style={{ maxWidth: '600px' }}
                confirmLoading={isAddingEvent}
                maskClosable={false}
                closable={true}
                closeIcon={<CloseOutlined />}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Please input the event description' },
                            { max: 300, message: 'Description cannot exceed 300 characters' },
                        ]}
                    >
                        <TextArea rows={4} maxLength={300} showCount />
                    </Form.Item>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item label="Date" required>
                                <Input.Group compact>
                                    <Form.Item
                                        name={['start_time_info', 'date', 'year']}
                                        noStyle
                                        rules={[{ required: true, message: 'Year is required' }]}
                                        initialValue={moment().year().toString()}
                                    >
                                        <Select style={{ width: '33%' }} placeholder="YYYY">
                                            {generateYearOptions()}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={['start_time_info', 'date', 'month']}
                                        noStyle
                                        rules={[{ required: true, message: 'Month is required' }]}
                                    >
                                        <Select style={{ width: '34%' }} placeholder="MM">
                                            {generateMonthOptions()}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        name={['start_time_info', 'date', 'day']}
                                        noStyle
                                        rules={[{ required: true, message: 'Day is required' }]}
                                    >
                                        <Select style={{ width: '33%' }} placeholder="DD">
                                            {generateDayOptions()}
                                        </Select>
                                    </Form.Item>
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name={['start_time_info', 'time']}
                                label="Time"
                                rules={[
                                    { required: true, message: 'Please input the time' },
                                    {
                                        pattern: /^([01]\d|2[0-3]):([0-5]\d)$/,
                                        message: 'HH:mm format',
                                    },
                                ]}
                            >
                                <Input placeholder="HH:mm" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                            <Form.Item name="duration" label="Duration (min)" rules={[{ required: true }]}>
                                <Input type="number" min={1} max={1440} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item name={['start_time_info', 'timezone']} label="Timezone" rules={[{ required: true }]}>
                                <Select
                                    showSearch
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
                    <Form.Item name="banner" label="Banner" rules={[{ required: true, message: 'Please upload a banner' }]}>
                        <Button
                            icon={<UploadOutlined />}
                            onClick={handleBannerUpload}
                            loading={isBannerUploading}
                            disabled={isBannerUploading || !!bannerUrl}
                        >
                            {bannerUrl ? 'Banner Uploaded' : 'Upload Banner'}
                        </Button>
                    </Form.Item>
                    {bannerUrl && (
                        <div className="mt-2 w-full">
                            <img src={bannerUrl} alt="Event banner" className="w-full h-32 object-cover rounded" />
                        </div>
                    )}
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default EventManagement;
