import React, { useState, useCallback } from 'react';
import { Table, Button, Space, Modal, Form, Input, DatePicker, InputNumber, Switch, message, Tag, Tooltip } from 'antd';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import DashboardLayout from '../../components/Admin/DashboardLayout';
import { useGetAllEventsQuery, useAddEventMutation, useDeleteEventMutation, EventDto } from '../../api/eventApi';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';

const { confirm } = Modal;

const EventManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bannerUrl, setBannerUrl] = useState<string>('');

    const { data: eventsData, isLoading } = useGetAllEventsQuery({});
    const [addEvent] = useAddEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const { openWidget: openCloudinaryWidget } = useCloudinaryWidget({
        onSuccess: (url: string) => {
            setBannerUrl(url);
            form.setFieldsValue({ banner: url });
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
            const eventData = {
                ...values,
                start_time: values.start_time.toISOString(),
            };
            await addEvent(eventData).unwrap();
            message.success('Event added successfully');
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to add event:', error);
            message.error('Failed to add event');
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
                    } catch (error) {
                        console.error('Failed to delete event:', error);
                        message.error('Failed to delete event');
                    }
                },
            });
        },
        [deleteEvent],
    );

    const columns = [
        {
            title: 'Topic',
            dataIndex: 'topic',
            key: 'topic',
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (time: string) => moment(time).format('YYYY-MM-DD HH:mm'),
        },
        {
            title: 'Duration (minutes)',
            dataIndex: 'duration',
            key: 'duration',
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
                    <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                        Add New Event
                    </Button>
                </div>
                <Table columns={columns} dataSource={events} loading={isLoading} rowKey="id" />
            </div>
            <Modal title="Add New Event" open={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)} width={800}>
                <Form form={form} layout="vertical">
                    <Form.Item name="topic" label="Topic" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="start_time" label="Start Time" rules={[{ required: true }]}>
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item name="duration" label="Duration (minutes)" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name="timezone" label="Timezone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="is_public" label="Public Event" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                    <Form.Item label="Banner">
                        <div className="flex items-center space-x-4">
                            {bannerUrl && <img src={bannerUrl} alt="Event banner" className="w-32 h-32 object-cover" />}
                            <Button onClick={openCloudinaryWidget}>{bannerUrl ? 'Change Banner' : 'Upload Banner'}</Button>
                        </div>
                    </Form.Item>
                    <Form.Item name="banner" hidden>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default EventManagement;
