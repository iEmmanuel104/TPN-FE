import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Form, Input, message, Avatar, Space, Tooltip, Card, Row, Col, Statistic, Typography, Popconfirm, Tag } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UploadOutlined,
    BookOutlined,
    UserOutlined,
    MailOutlined,
    TeamOutlined,
    SearchOutlined,
    TwitterOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';
import {
    useGetAllInstructorsQuery,
    useAddInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
    useGetInstructorCoursesQuery,
    InstructorDto,
} from '../../api/instructorApi';
import { useGetUserStatsQuery } from '../../api/adminApi';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DashboardLayout from '../../components/Admin/DashboardLayout';
import { RootState } from '../../state/store';
import { setTotalUsers } from '../../state/slices/adminSlice';
import { CourseDto } from '../../api/courseApi';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const InstructorManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCoursesModalVisible, setIsCoursesModalVisible] = useState(false);
    const [editingInstructor, setEditingInstructor] = useState<InstructorDto | null>(null);
    const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch();
    const totalUsers = useSelector((state: RootState) => state.admin.totalUsers);

    const navigate = useNavigate();

    const { data: instructorsData, isLoading } = useGetAllInstructorsQuery();
    const { data: userStats } = useGetUserStatsQuery();
    const { data: instructorCoursesData, isLoading: isCoursesLoading } = useGetInstructorCoursesQuery(
        { id: selectedInstructorId || '' },
        { skip: !selectedInstructorId },
    );
    const [addInstructor] = useAddInstructorMutation();
    const [updateInstructor] = useUpdateInstructorMutation();
    const [deleteInstructor] = useDeleteInstructorMutation();

    const instructors = instructorsData?.data || [];
    const instructorCourses = instructorCoursesData?.data || [];

    useEffect(() => {
        if (userStats?.data?.totalUsers) {
            dispatch(setTotalUsers(userStats.data.totalUsers));
        }
    }, [userStats, dispatch]);

    const { openWidget: openCloudinaryWidget } = useCloudinaryWidget({
        onSuccess: (url: string) => {
            setProfilePictureUrl(url);
            form.setFieldsValue({ info: { ...form.getFieldValue('info'), profilePictureUrl: url } });
        },
    });

    const showModal = (instructor?: InstructorDto) => {
        if (instructor) {
            setEditingInstructor(instructor);
            form.setFieldsValue({
                ...instructor,
                socials: {
                    x: instructor.socials?.x || '',
                    linkedin: instructor.socials?.linkedin || '',
                },
            });
            setProfilePictureUrl(instructor.info?.profilePictureUrl || null);
        } else {
            setEditingInstructor(null);
            form.resetFields();
            setProfilePictureUrl(null);
        }
        setIsModalVisible(true);
    };

    const showCoursesModal = (instructorId: string) => {
        console.log({ instructorId });
        setSelectedInstructorId(instructorId);
        setIsCoursesModalVisible(true);
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
            render: (url: string) => <Avatar src={url} icon={<UserOutlined />} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: InstructorDto, b: InstructorDto) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: InstructorDto, b: InstructorDto) => a.email.localeCompare(b.email),
        },
        {
            title: 'Socials',
            key: 'socials',
            render: (_: unknown, record: InstructorDto) => (
                <Space>
                    {record.socials?.x && (
                        <a href={record.socials.x} target="_blank" rel="noopener noreferrer" title="Visit Twitter">
                            <TwitterOutlined />
                        </a>
                    )}
                    {record.socials?.linkedin && (
                        <a href={record.socials.linkedin} target="_blank" rel="noopener noreferrer" title="Visit LinkedIn">
                            <LinkedinOutlined />
                        </a>
                    )}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: InstructorDto) => (
                <Space size="middle">
                    <Tooltip title="Edit">
                        <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    </Tooltip>
                    <Tooltip title="View Courses">
                        <Button icon={<BookOutlined />} onClick={() => showCoursesModal(record.id)} className="relative">
                            {record.courseCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-center rounded-full w-3 h-3 flex items-center justify-center text-[9px] leading-none">
                                    {record.courseCount}
                                </span>
                            )}
                        </Button>
                    </Tooltip>
                    <Popconfirm
                        title="Are you sure you want to delete this instructor?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Tooltip title="Delete">
                            <Button icon={<DeleteOutlined />} danger />
                        </Tooltip>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const courseColumns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => (
                <Tooltip title={description}>
                    <span>{description.length > 50 ? `${description.substring(0, 50)}...` : description}</span>
                </Tooltip>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => <Tag color={status === 'PUBLISHED' ? 'green' : 'orange'}>{status}</Tag>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number, record: CourseDto) => `${record.currency.symbol}${price}`,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
    ];

    const filteredInstructors = instructors.filter(
        (instructor: InstructorDto) =>
            instructor.name.toLowerCase().includes(searchText.toLowerCase()) || instructor.email.toLowerCase().includes(searchText.toLowerCase()),
    );

    return (
        <DashboardLayout>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={2}>Instructor Management</Title>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Total Instructors" value={instructors.length || 0} prefix={<UserOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Card>
                        <Statistic title="Total Users" value={totalUsers || 0} prefix={<TeamOutlined />} />
                    </Card>
                </Col>
            </Row>
            <Card style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Input placeholder="Search instructors" prefix={<SearchOutlined />} onChange={(e) => setSearchText(e.target.value)} />
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                            Add Instructor
                        </Button>
                    </Col>
                </Row>
                <Table columns={columns} dataSource={filteredInstructors} loading={isLoading} rowKey="id" style={{ marginTop: 16 }} />
            </Card>
            <Modal
                title={editingInstructor ? 'Edit Instructor' : 'Add Instructor'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Profile Picture">
                        <div className="flex items-center space-x-4">
                            <Avatar size={64} src={profilePictureUrl} icon={<UserOutlined />} />
                            <Button icon={<UploadOutlined />} onClick={openCloudinaryWidget}>
                                {profilePictureUrl ? 'Change Picture' : 'Upload Picture'}
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}>
                        <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item name="bio" label="Bio" rules={[{ required: true, message: 'Please input the bio!' }]}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item name={['socials', 'x']} label="Twitter URL">
                        <Input prefix={<TwitterOutlined />} />
                    </Form.Item>
                    <Form.Item name={['socials', 'linkedin']} label="LinkedIn URL">
                        <Input prefix={<LinkedinOutlined />} />
                    </Form.Item>
                    <Form.Item name={['info', 'profilePictureUrl']} hidden>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Instructor Courses"
                open={isCoursesModalVisible}
                onCancel={() => setIsCoursesModalVisible(false)}
                footer={null}
                width={1000}
            >
                <Table
                    columns={courseColumns}
                    dataSource={instructorCourses}
                    loading={isCoursesLoading}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => {
                            navigate(`/iadmin/courses/${record.id}`); // Adjust this path as needed
                        },
                        style: { cursor: 'pointer' },
                    })}
                />
            </Modal>
        </DashboardLayout>
    );
};

export default InstructorManagement;
