import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Typography, Card } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useResetPasswordMutation } from '../api/authApi';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';

const { Title, Text } = Typography;

const PasswordResetPage: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [resetToken, setResetToken] = useState('');
    const [email, setEmail] = useState('');
    const [passwordRequirements, setPasswordRequirements] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        length: false,
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('prst');
        const emailParam = searchParams.get('e');
        if (token && emailParam) {
            setResetToken(token);
            setEmail(decodeURIComponent(emailParam));
        } else {
            message.error('Invalid reset link');
            navigate('/');
        }
    }, [location, navigate]);

    const isValidPassword = (password: string): boolean => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$&*\-^!])[a-zA-Z\d@#$&*\-^!]{6,}$/;
        return passwordRegex.test(password);
    };

    const checkPasswordRequirements = (password: string) => {
        setPasswordRequirements({
            lowercase: /[a-z]/.test(password),
            uppercase: /[A-Z]/.test(password),
            number: /\d/.test(password),
            specialChar: /[@#$&*\-^!]/.test(password),
            length: password.length >= 6,
        });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        checkPasswordRequirements(password);
        form.setFieldsValue({ newPassword: password });
    };

    const renderPasswordRequirement = (met: boolean, text: string) => (
        <div className={`flex items-center ${met ? 'text-green-500' : 'text-red-500'}`}>
            {met ? <CheckCircleFilled /> : <CloseCircleFilled />}
            <span className="ml-2">{text}</span>
        </div>
    );

    const onFinish = async (values: { newPassword: string }) => {
        try {
            await resetPassword({
                resetToken,
                email,
                newPassword: values.newPassword,
            }).unwrap();
            message.success('Password reset successfully');
            navigate('/login');
        } catch (error) {
            message.error('Failed to reset password. Please try again.');
        }
    };

    return (
        <PublicLayout>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <Title level={2} className="text-center mb-6">
                        Reset Your Password
                    </Title>
                    <Form form={form} onFinish={onFinish} layout="vertical">
                        <Form.Item
                            name="newPassword"
                            label="New Password"
                            rules={[
                                { required: true, message: 'Please input your new password!' },
                                {
                                    validator: (_, value) =>
                                        isValidPassword(value) ? Promise.resolve() : Promise.reject('Password does not meet requirements'),
                                },
                            ]}
                        >
                            <Input.Password onChange={handlePasswordChange} />
                        </Form.Item>
                        <div className="mb-4">
                            <Text strong>Password Requirements:</Text>
                            {renderPasswordRequirement(passwordRequirements.lowercase, 'One lowercase letter')}
                            {renderPasswordRequirement(passwordRequirements.uppercase, 'One uppercase letter')}
                            {renderPasswordRequirement(passwordRequirements.number, 'One number')}
                            {renderPasswordRequirement(passwordRequirements.specialChar, 'One special character (@#$&*-^!)')}
                            {renderPasswordRequirement(passwordRequirements.length, 'At least 6 characters long')}
                        </div>
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
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={isLoading} className="w-full">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </PublicLayout>
    );
};

export default PasswordResetPage;
