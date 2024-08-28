import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardLayout from '../../components/DashboardLayout';
import { useGetAllAdminsQuery, useCreateAdminMutation } from '../../api/adminApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const AdminManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const { data: admins, isLoading } = useGetAllAdminsQuery();
    const [createAdmin] = useCreateAdminMutation();
    const currentAdmin = useSelector((state: RootState) => state.auth.admin);

    const showModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await createAdmin(values).unwrap();
            message.success('Admin created successfully');
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to create admin:', error);
            message.error('Failed to create admin');
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Super Admin', dataIndex: 'isSuperAdmin', key: 'isSuperAdmin', render: (isSuperAdmin: boolean) => (isSuperAdmin ? 'Yes' : 'No') },
    ];

    if (!currentAdmin?.isSuperAdmin) {
        return (
            <DashboardLayout>
                <h1>You do not have permission to view this page.</h1>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Admin Management</h1>
                <Button icon={<PlusOutlined />} onClick={showModal} className="mt-2">
                    Add Admin
                </Button>
            </div>
            <Table columns={columns} dataSource={admins?.data} loading={isLoading} rowKey="id" />
            <Modal title="Add Admin" visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!', type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="isSuperAdmin" label="Super Admin" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>
        </DashboardLayout>
    );
};

export default AdminManagement;
