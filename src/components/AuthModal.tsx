import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import {
    useSignupMutation,
    useLoginMutation,
    useVerifyEmailMutation,
    useResendVerificationEmailMutation,
    useForgotPasswordMutation,
} from '../api/authApi';
import { setUserCredentials } from '../state/slices/authSlice';
import { AuthModalType } from '../constants';

interface AuthModalProps {
    visible: boolean;
    onClose: () => void;
    type: AuthModalType;
    onSwitchType: (type: AuthModalType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose, type, onSwitchType }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [signup] = useSignupMutation();
    const [login] = useLoginMutation();
    const [verifyEmail] = useVerifyEmailMutation();
    const [resendVerificationEmail] = useResendVerificationEmailMutation();
    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async (values: any) => {
        try {
            switch (type) {
                case AuthModalType.SIGNUP: {
                    const signupResponse = await signup(values).unwrap();
                    dispatch(
                        setUserCredentials({
                            user: signupResponse.data.user,
                            accessToken: '',
                            refreshToken: '',
                        }),
                    );
                    message.success('Signup successful! Please check your email for verification.');
                    onSwitchType(AuthModalType.VERIFY_EMAIL);
                    break;
                }
                case AuthModalType.LOGIN: {
                    const loginResponse = await login(values).unwrap();
                    dispatch(
                        setUserCredentials({
                            user: loginResponse.data.user,
                            accessToken: loginResponse.data.accessToken,
                            refreshToken: loginResponse.data.refreshToken,
                        }),
                    );
                    message.success('Login successful!');
                    onClose();
                    break;
                }
                case AuthModalType.VERIFY_EMAIL:
                    await verifyEmail(values).unwrap();
                    message.success('Email verified successfully!');
                    onSwitchType(AuthModalType.LOGIN);
                    break;
                case AuthModalType.FORGOT_PASSWORD:
                    await forgotPassword(values).unwrap();
                    message.success('Password reset link sent to your email!');
                    onSwitchType(AuthModalType.LOGIN);
                    break;
            }
        } catch (error) {
            message.error('Action failed. Please try again.');
        }
    };

    const handleResendVerificationEmail = async () => {
        try {
            const email = form.getFieldValue('email');
            await resendVerificationEmail({ email }).unwrap();
            message.success('Verification email resent successfully!');
        } catch (error) {
            message.error('Failed to resend verification email. Please try again.');
        }
    };

    const renderForm = () => {
        switch (type) {
            case AuthModalType.SIGNUP:
                return (
                    <>
                        <Form.Item name="firstName" label="First Name" rules={[{ required: true, message: 'Please input your first name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="lastName" label="Last Name" rules={[{ required: true, message: 'Please input your last name!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </>
                );
            case AuthModalType.LOGIN:
                return (
                    <>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </>
                );
            case AuthModalType.VERIFY_EMAIL:
                return (
                    <>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input your email!' },
                                { type: 'email', message: 'Please enter a valid email!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="otpCode"
                            label="Verification Code"
                            rules={[{ required: true, message: 'Please input the verification code!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button onClick={handleResendVerificationEmail}>Resend Verification Email</Button>
                    </>
                );
            case AuthModalType.FORGOT_PASSWORD:
                return (
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                );
        }
    };

    return (
        <Modal
            title={type.charAt(0).toUpperCase() + type.slice(1)}
            visible={visible}
            onCancel={onClose}
            footer={null}
            className="bg-white rounded-lg shadow-xl"
        >
            <Form form={form} onFinish={handleSubmit} layout="vertical">
                {renderForm()}
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                        {type === AuthModalType.LOGIN
                            ? AuthModalType.LOGIN
                            : type === AuthModalType.SIGNUP
                              ? AuthModalType.SIGNUP
                              : type === AuthModalType.VERIFY_EMAIL
                                ? AuthModalType.VERIFY_EMAIL
                                : AuthModalType.FORGOT_PASSWORD}
                    </Button>
                </Form.Item>
            </Form>
            <div className="text-center mt-4">
                {type === AuthModalType.LOGIN && (
                    <>
                        <p>
                            Don't have an account? <a onClick={() => onSwitchType(AuthModalType.SIGNUP)}>Sign up</a>
                        </p>
                        <p>
                            <a onClick={() => onSwitchType(AuthModalType.FORGOT_PASSWORD)}>Forgot password?</a>
                        </p>
                    </>
                )}
                {type === AuthModalType.SIGNUP && (
                    <p>
                        Already have an account? <a onClick={() => onSwitchType(AuthModalType.LOGIN)}>Login</a>
                    </p>
                )}
                {(type === AuthModalType.VERIFY_EMAIL || type === AuthModalType.FORGOT_PASSWORD) && (
                    <p>
                        <a onClick={() => onSwitchType(AuthModalType.LOGIN)}>Back to login</a>
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default AuthModal;
