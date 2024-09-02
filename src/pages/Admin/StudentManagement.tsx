import React, { useState, useEffect } from 'react';
import { Table, Tabs, Input, Button, Space, Modal, message, Form, Avatar, Tooltip } from 'antd';
import {
    SearchOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    LockOutlined,
    UnlockOutlined,
    StopOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { useGetAllUsersQuery } from '../../api/userApi';
import { useBlockUserMutation, useDeactivateUserMutation } from '../../api/adminApi';
import DashboardLayout from '../../components/Admin/DashboardLayout';
import { UserInfoFromApi } from '../../api/authApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { ColumnType } from 'antd/es/table';

const { TabPane } = Tabs;
const { confirm } = Modal;

const StudentManagement: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [blockModalVisible, setBlockModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<UserInfoFromApi | null>(null);
    const [blockReason, setBlockReason] = useState<string>('');

    const currentAdmin = useSelector((state: RootState) => state.auth.admin);

    const {
        data: usersData,
        isLoading,
        refetch,
    } = useGetAllUsersQuery({
        page: currentPage,
        size: pageSize,
        q: searchQuery,
        isBlocked: currentTab === 'blocked' ? true : undefined,
        isDeactivated: currentTab === 'deactivated' ? true : undefined,
    });

    const [blockUser] = useBlockUserMutation();
    const [deactivateUser] = useDeactivateUserMutation();

    useEffect(() => {
        refetch();
    }, [currentTab, searchQuery, currentPage, pageSize, refetch]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleTabChange = (key: string) => {
        setCurrentTab(key);
        setCurrentPage(1);
    };

    const showBlockModal = (user: UserInfoFromApi) => {
        setSelectedUser(user);
        setBlockModalVisible(true);
    };

    const handleBlockUser = async () => {
        if (!selectedUser) return;

        try {
            await blockUser({
                id: selectedUser.id,
                status: selectedUser.settings?.isBlocked ? 'false' : 'true',
                reason: blockReason,
            }).unwrap();
            message.success(`User ${selectedUser.settings?.isBlocked ? 'unblocked' : 'blocked'} successfully`);
            setBlockModalVisible(false);
            setBlockReason('');
            refetch();
        } catch (error) {
            message.error('Failed to update user block status');
        }
    };

    const showDeactivateConfirm = (id: string, isDeactivated: boolean) => {
        confirm({
            title: `Are you sure you want to ${isDeactivated ? 'activate' : 'deactivate'} this user?`,
            icon: <ExclamationCircleOutlined />,
            content: isDeactivated ? "This action will reactivate the user's account." : "This action will deactivate the user's account.",
            onOk() {
                handleDeactivateUser(id, !isDeactivated);
            },
        });
    };

    const handleDeactivateUser = async (id: string, isDeactivated: boolean) => {
        try {
            await deactivateUser({ id, isDeactivated: isDeactivated ? 'true' : 'false' }).unwrap();
            message.success(`User ${isDeactivated ? 'deactivated' : 'activated'} successfully`);
            refetch();
        } catch (error) {
            message.error('Failed to update user activation status');
        }
    };

    const columns: ColumnType<UserInfoFromApi>[] = [
        {
            title: 'Avatar',
            dataIndex: 'displayImage',
            key: 'avatar',
            render: (image: string | null, record: UserInfoFromApi) => (
                <Avatar src={image} icon={<UserOutlined />} alt={`${record.firstName} ${record.lastName}`} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'name',
            render: (_: unknown, record: UserInfoFromApi) => `${record.firstName} ${record.lastName}`,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Join Date',
            dataIndex: ['settings', 'joinDate'],
            key: 'joinDate',
            render: (joinDate: string) => new Date(joinDate).toLocaleDateString(),
            responsive: ['lg'],
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            responsive: ['xl'],
        },
        {
            title: 'Enrolled Courses',
            dataIndex: 'enrolledCoursesCount',
            key: 'enrolledCoursesCount',
            responsive: ['xl'],
        },
        {
            title: 'Status',
            key: 'status',
            render: (_: unknown, record: UserInfoFromApi) => (
                <Space>
                    {record.settings?.isBlocked && <span className="text-red-500">Blocked</span>}
                    {!record.status.activated && <span className="text-yellow-500">Inactive</span>}
                    {!record.settings?.isBlocked && record.status.activated && <span className="text-green-500">Active</span>}
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: UserInfoFromApi) => (
                <Space size="middle">
                    {currentAdmin?.isSuperAdmin && (
                        <Tooltip title={record.settings?.isBlocked ? 'Unblock User' : 'Block User'}>
                            <Button
                                onClick={() => showBlockModal(record)}
                                icon={record.settings?.isBlocked ? <UnlockOutlined /> : <LockOutlined />}
                                type={record.settings?.isBlocked ? 'primary' : 'default'}
                            />
                        </Tooltip>
                    )}
                    <Tooltip title={!record.status.activated ? 'Activate User' : 'Deactivate User'}>
                        <Button
                            onClick={() => showDeactivateConfirm(record.id, !record.settings?.isDeactivated)}
                            icon={!record.settings?.isDeactivated ? <PoweroffOutlined /> : <StopOutlined />}
                            type={!record.settings?.isDeactivated ? 'default' : 'primary'}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const usersInfo = usersData?.data || { users: [], count: 0 };

    return (
        <DashboardLayout>
            <div className="p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl font-bold mb-4">Student Management</h1>
                <Tabs activeKey={currentTab} onChange={handleTabChange}>
                    <TabPane tab="All Students" key="all">
                        <div className="mb-4">
                            <Input placeholder="Search students" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={usersInfo.users}
                            rowKey="id"
                            loading={isLoading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: usersInfo.count,
                                onChange: (page, pageSize) => {
                                    setCurrentPage(page);
                                    setPageSize(pageSize || 10);
                                },
                            }}
                            scroll={{ x: true }}
                        />
                    </TabPane>
                    <TabPane tab="Blocked Students" key="blocked">
                        <div className="mb-4">
                            <Input placeholder="Search blocked students" prefix={<SearchOutlined />} onChange={(e) => handleSearch(e.target.value)} />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={usersInfo.users}
                            rowKey="id"
                            loading={isLoading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: usersInfo.count,
                                onChange: (page, pageSize) => {
                                    setCurrentPage(page);
                                    setPageSize(pageSize || 10);
                                },
                            }}
                            scroll={{ x: true }}
                        />
                    </TabPane>
                    <TabPane tab="Deactivated Students" key="deactivated">
                        <div className="mb-4">
                            <Input
                                placeholder="Search deactivated students"
                                prefix={<SearchOutlined />}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </div>
                        <Table
                            columns={columns}
                            dataSource={usersInfo.users}
                            rowKey="id"
                            loading={isLoading}
                            pagination={{
                                current: currentPage,
                                pageSize: pageSize,
                                total: usersInfo.count,
                                onChange: (page, pageSize) => {
                                    setCurrentPage(page);
                                    setPageSize(pageSize || 10);
                                },
                            }}
                            scroll={{ x: true }}
                        />
                    </TabPane>
                </Tabs>
            </div>
            <Modal
                title={`${selectedUser?.settings?.isBlocked ? 'Unblock' : 'Block'} User`}
                visible={blockModalVisible}
                onOk={handleBlockUser}
                onCancel={() => setBlockModalVisible(false)}
            >
                <Form layout="vertical">
                    <Form.Item label="Reason">
                        <Input.TextArea value={blockReason} onChange={(e) => setBlockReason(e.target.value)} rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default StudentManagement;
