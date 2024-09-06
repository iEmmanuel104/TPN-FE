import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Form, Input, Button, message, Tabs, Avatar, Spin, Card, Row, Col, Select, Modal, Alert, Divider } from 'antd';
import { UserOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useGetLoggedUserQuery, useChangePasswordMutation, UserInfoFromApi } from '../api/authApi';
import { useUpdateUserMutation } from '../api/userApi';
import PublicLayout from '../components/PublicLayout';
import { useCloudinaryWidget } from '../hooks/useCloudinaryWidget';
import { updateUser, logOut } from '../state/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { confirm } = Modal;

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
        .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .replace(/(\d+)(?=(st|nd|rd|th))/, '$1');
};

const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: userData, isLoading, isError } = useGetLoggedUserQuery();
    const [updateUserMutation] = useUpdateUserMutation();
    const [changePassword] = useChangePasswordMutation();

    const [form] = Form.useForm();
    const [passwordForm] = Form.useForm();

    const [isEditing, setIsEditing] = useState(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
    const [isProfilePictureLoading, setIsProfilePictureLoading] = useState(false);
    const [isDeactivationModalVisible, setIsDeactivationModalVisible] = useState(false);

    const { openWidget: openProfilePictureWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            setProfilePictureUrl(url);
            form.setFieldsValue({ displayImage: url });
            setIsProfilePictureLoading(false);
            handleSubmit({ displayImage: url });
        },
        onClose: () => {
            setIsProfilePictureLoading(false);
        },
    });

    const handleOpenProfilePictureWidget = () => {
        setIsProfilePictureLoading(true);
        openProfilePictureWidget();
    };

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </PublicLayout>
        );
    }

    if (isError || !userData) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Text>Error loading user data. Please try again later.</Text>
                </div>
            </PublicLayout>
        );
    }

    const handleSubmit = async (values: Partial<UserInfoFromApi>) => {
        try {
            const updatedUser = await updateUserMutation(values).unwrap();
            if (updatedUser && updatedUser.data) {
                dispatch(updateUser(updatedUser.data));
            }
            message.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            message.error('Failed to update profile');
        }
    };

    const handlePasswordChange = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
        try {
            await changePassword(values).unwrap();
            message.success('Password changed successfully');
            passwordForm.resetFields();
        } catch (error) {
            message.error('Failed to change password');
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue(userData.data.user);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const showDeactivationModal = () => {
        setIsDeactivationModalVisible(true);
    };

    const handleDeactivationCancel = () => {
        setIsDeactivationModalVisible(false);
    };

    const handleDeactivationConfirm = () => {
        confirm({
            title: 'Are you sure you want to deactivate your account?',
            icon: <ExclamationCircleOutlined />,
            content:
                'This action will deactivate your account. You can reactivate it by logging in within 90 days. After 90 days, your account will be permanently deleted.',
            okText: 'Yes, deactivate my account',
            okType: 'danger',
            cancelText: 'No, keep my account active',
            onOk() {
                deactivateAccount();
            },
        });
    };

    const deactivateAccount = async () => {
        try {
            await updateUserMutation({ isDeactivated: true }).unwrap();
            message.success('Your account has been deactivated. You will be logged out now.');
            dispatch(logOut());
            navigate('/');
        } catch (error) {
            message.error('Failed to deactivate account. Please try again.');
        }
    };


    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Title level={2} className="mb-8">
                    User Profile
                </Title>
                <Card>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Personal Information" key="1">
                            <div className="flex items-center mb-8">
                                <div className="relative">
                                    <Avatar size={100} icon={<UserOutlined />} src={profilePictureUrl || userData.data.user.displayImage} />
                                    <Button
                                        icon={<EditOutlined />}
                                        onClick={handleOpenProfilePictureWidget}
                                        loading={isProfilePictureLoading}
                                        className="absolute bottom-0 right-0 bg-white border-0 shadow-md rounded-full w-8 h-8 flex items-center justify-center"
                                        size="small"
                                    />
                                </div>
                                <div className="ml-4">
                                    <Title level={4}>{`${userData.data.user.firstName} ${userData.data.user.lastName}`}</Title>
                                    <Text type="secondary">{userData.data.user.email}</Text>
                                </div>
                            </div>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleSubmit}
                                initialValues={userData.data.user}
                                className="bg-white rounded-lg"
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="firstName" label="First Name">
                                            <Input disabled={!isEditing} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="lastName" label="Last Name">
                                            <Input disabled={!isEditing} size="small" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="otherName" label="Other Name">
                                            <Input disabled={!isEditing} size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name="gender" label="Gender">
                                            <Select disabled={!isEditing} size="small">
                                                <Option value="male">Male</Option>
                                                <Option value="female">Female</Option>
                                                <Option value="other">Other</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item name="email" label="Email">
                                    <Input disabled size="small" />
                                </Form.Item>
                                <Form.Item name="displayImage" hidden>
                                    <Input />
                                </Form.Item>
                                {isEditing ? (
                                    <div>
                                        <Button type="primary" htmlType="submit" size="small" className="mr-2">
                                            Save Changes
                                        </Button>
                                        <Button onClick={handleCancelEdit} size="small">
                                            Cancel
                                        </Button>
                                    </div>
                                ) : (
                                    <Button onClick={handleEdit} size="small">
                                        Edit Profile
                                    </Button>
                                )}
                            </Form>
                        </TabPane>
                        <TabPane tab="Account Settings" key="2">
                            <Card className="bg-white rounded-lg" size="small">
                                <Title level={4} className="mb-4">
                                    Account Information
                                </Title>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Text strong>Join Date:</Text>
                                        <Text className="ml-2">{formatDate(userData.data.user.settings.joinDate)}</Text>
                                    </Col>
                                    <Col span={12}>
                                        <Text strong>Last Login:</Text>
                                        <Text className="ml-2">
                                            {userData.data.user.settings.lastLogin
                                                ? new Date(userData.data.user.settings.lastLogin).toLocaleString()
                                                : 'N/A'}
                                        </Text>
                                    </Col>
                                    <Col span={12}>
                                        <Text strong>Enrolled Courses:</Text>
                                        <Text className="ml-2">{userData.data.user.enrolledCoursesCount}</Text>
                                    </Col>
                                    <Col span={12}>
                                        <Text strong>Account Status:</Text>
                                        <Text className="ml-2">{userData.data.user.status.activated ? 'Activated' : 'Not Activated'}</Text>
                                    </Col>
                                    <Col span={12}>
                                        <Text strong>Email Verified:</Text>
                                        <Text className="ml-2">{userData.data.user.status.emailVerified ? 'Yes' : 'No'}</Text>
                                    </Col>
                                </Row>
                                <Divider />
                                <Title level={4} className="mb-4">
                                    Account Deactivation
                                </Title>
                                <Paragraph>
                                    Deactivating your account will temporarily disable it. You can reactivate it by contacting support within 90 days. After
                                    90 days, your account will be permanently deleted.
                                </Paragraph>
                                <Button danger onClick={showDeactivationModal}>
                                    Deactivate Account
                                </Button>
                            </Card>
                        </TabPane>
                        <TabPane tab="Change Password" key="3">
                            <Form form={passwordForm} layout="vertical" onFinish={handlePasswordChange} className="bg-white rounded-lg">
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="oldPassword"
                                            label="Current Password"
                                            rules={[{ required: true, message: 'Please input your current password!' }]}
                                        >
                                            <Input.Password size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="newPassword"
                                            label="New Password"
                                            rules={[
                                                { required: true, message: 'Please input your new password!' },
                                                { min: 8, message: 'Password must be at least 8 characters long' },
                                            ]}
                                        >
                                            <Input.Password size="small" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="confirmPassword"
                                            label="Confirm New Password"
                                            dependencies={['newPassword']}
                                            rules={[
                                                { required: true, message: 'Please confirm your new password!' },
                                                ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                        if (!value || getFieldValue('newPassword') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject(new Error('The two passwords do not match!'));
                                                    },
                                                }),
                                            ]}
                                        >
                                            <Input.Password size="small" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" size="small">
                                        Change Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>
            <Modal
                title="Account Deactivation"
                visible={isDeactivationModalVisible}
                onCancel={handleDeactivationCancel}
                footer={[
                    <Button key="back" onClick={handleDeactivationCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" danger onClick={handleDeactivationConfirm}>
                        Deactivate Account
                    </Button>,
                ]}
            >
                <Alert
                    message="Warning"
                    description="Deactivating your account will temporarily disable it. You can reactivate it by contacting support within 90 days. After 90 days, your account will be permanently deleted."
                    type="warning"
                    showIcon
                    className="mb-4"
                />
                <Paragraph>Are you sure you want to deactivate your account? This action will:</Paragraph>
                <ul className="list-disc list-inside mb-4">
                    <li>Disable your access to the platform</li>
                    <li>Hide your profile from other users</li>
                    <li>Pause all your ongoing courses and activities</li>
                </ul>
                <Paragraph strong>To proceed with account deactivation, click the "Deactivate Account" button below.</Paragraph>
            </Modal>
        </PublicLayout>
    );
};

export default UserProfilePage;
