import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    useLoginAdminMutation,
    useVerifyAdminLoginMutation,
} from '../../api/adminApi';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../state/slices/adminSlice';

interface LoginValues {
    email: string;
    otpCode?: string;
}

const AdminLogin: React.FC = () => {
    const [form] = Form.useForm<LoginValues>();
    const [showCodeInput, setShowCodeInput] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginAdmin, { isLoading: isLoginLoading }] = useLoginAdminMutation();
    const [verifyAdminLogin, { isLoading: isVerifyLoading }] =  useVerifyAdminLoginMutation();

    const onFinish = async (values: LoginValues) => {
        try {
            if (!showCodeInput) {
                // Send email for OTP
                await loginAdmin({ email: values.email }).unwrap();
                setShowCodeInput(true);
                message.success('Verification code sent to your email');
            } else if (values.otpCode) {
                // Verify OTP
                const response = await verifyAdminLogin({
                    email: values.email,
                    otpCode: values.otpCode,
                }).unwrap();
                if (response.data && response.data.adminToken) {
                    dispatch(
                        setAdminCredentials({
                            adminToken: response.data.adminToken,
                        }),
                    );
                    message.success('Login successful');
                    navigate('/iadmin/dashboard'); // Adjust this route as needed
                } else {
                    throw new Error('No admin token received');
                }
            }
        } catch (error) {
            message.error((error as Error).message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://res.cloudinary.com/drc6omjqc/image/upload/v1721073067/chain_breaker_lmjc02.webp"
                        alt="EDUMIN"
                    />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admin Login
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <Form
                        form={form}
                        name="admin_login"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a valid email!',
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                placeholder="Admin Email"
                                size="large"
                            />
                        </Form.Item>

                        {showCodeInput && (
                            <Form.Item
                                name="otpCode"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Please input the verification code!',
                                    },
                                    {
                                        len: 6,
                                        message:
                                            'Verification code must be 6 digits!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="6-digit Verification Code"
                                    size="large"
                                />
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white"
                                size="large"
                                loading={isLoginLoading || isVerifyLoading}
                            >
                                {showCodeInput
                                    ? 'Verify & Login'
                                    : 'Send Verification Code'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
