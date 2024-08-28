import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Avatar, Space, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, BookOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/DashboardLayout';
import {
    useGetAllInstructorsQuery,
    useAddInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
    InstructorDto,
} from '../../api/instructorApi';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CourseDto } from '../../api/courseApi';

const InstructorManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<InstructorDto | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

    const { data: instructors, isLoading } = useGetAllInstructorsQuery();
    const [addInstructor] = useAddInstructorMutation();
    const [updateInstructor] = useUpdateInstructorMutation();
    const [deleteInstructor] = useDeleteInstructorMutation();

    const { openWidget: openCloudinaryWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            setProfilePictureUrl(url);
            form.setFieldsValue({ info: { ...form.getFieldValue('info'), profilePictureUrl: url } });
        },
    });

    const showModal = (instructor?: InstructorDto) => {
        if (instructor) {
            setEditingInstructor(instructor);
            form.setFieldsValue(instructor);
            setProfilePictureUrl(instructor.info?.profilePictureUrl || null);
        } else {
            setEditingInstructor(null);
            form.resetFields();
            setProfilePictureUrl(null);
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (editingInstructor) {
                await updateInstructor({ id: editingInstructor.id, instructor: values }).unwrap();
                message.success('Instructor updated successfully');
            } else {
                await addInstructor(values).unwrap();
                message.success('Instructor added successfully');
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to save instructor:', error);
            message.error('Failed to save instructor');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteInstructor({ id }).unwrap();
            message.success('Instructor deleted successfully');
        } catch (error) {
            console.error('Failed to delete instructor:', error);
            message.error('Failed to delete instructor');
        }
    };

    const columns = [
        {
            title: 'Avatar',
            dataIndex: ['info', 'profilePictureUrl'],
            key: 'avatar',
            render: (url: string) => <Avatar src={url} />,
        },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Bio',
            dataIndex: 'bio',
            key: 'bio',
            render: (bio: string) => <div dangerouslySetInnerHTML={{ __html: bio }} />,
        },
        {
            title: 'Courses',
            dataIndex: 'courses',
            key: 'courses',
            render: (courses: CourseDto[], record: InstructorDto) => (
                <Space direction="vertical">
                    <Tag color="blue">{record.courseCount} course(s)</Tag>
                    {courses && courses.length > 0 && (
                        <Tooltip title={courses.map((course) => course.title).join(', ')}>
                            <Button icon={<BookOutlined />}>View Courses</Button>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: InstructorDto) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </Space>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Instructor Management</h1>
                <Button icon={<PlusOutlined />} onClick={() => showModal()} className="mt-2">
                    Add Instructor
                </Button>
            </div>
            <Table columns={columns} dataSource={instructors?.data} loading={isLoading} rowKey="id" />
            <Modal
                title={editingInstructor ? 'Edit Instructor' : 'Add Instructor'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Profile Picture">
                        <div className="flex items-center space-x-4">
                            <Avatar size={64} src={profilePictureUrl} />
                            <Button icon={<UploadOutlined />} onClick={openCloudinaryWidget}>
                                {profilePictureUrl ? 'Change Picture' : 'Upload Picture'}
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="bio" label="Bio" rules={[{ required: true, message: 'Please input the bio!' }]}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item name={['info', 'profilePictureUrl']} hidden>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default InstructorManagement;
