import React, { useState } from 'react';
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
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

interface AuthModalProps {
    visible: boolean;
    onClose: () => void;
    type: AuthModalType;
    onSwitchType: (type: AuthModalType) => void;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    otpCode: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose, type, onSwitchType }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [signup] = useSignupMutation();
    const [login] = useLoginMutation();
    const [verifyEmail] = useVerifyEmailMutation();
    const [resendVerificationEmail] = useResendVerificationEmailMutation();
    const [forgotPassword] = useForgotPasswordMutation();
    const [passwordRequirements, setPasswordRequirements] = useState({
        lowercase: false,
        uppercase: false,
        number: false,
        specialChar: false,
        length: false,
    });

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
        form.setFieldsValue({ password });
    };

    const renderPasswordRequirement = (met: boolean, text: string) => (
        <div className={`flex items-center ${met ? 'text-green-500' : 'text-red-500'}`}>
            {met ? <CheckCircleFilled /> : <CloseCircleFilled />}
            <span className="ml-2">{text}</span>
        </div>
    );

    const handleSubmit = async (values: FormValues) => {
        try {
            switch (type) {
                case AuthModalType.SIGNUP: {
                    if (!isValidPassword(values.password)) {
                        message.error('Password does not meet all requirements');
                        return;
                    }
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
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                { required: true, message: 'Please input your password!' },
                                {
                                    validator: (_, value) =>
                                        isValidPassword(value) ? Promise.resolve() : Promise.reject('Password does not meet requirements'),
                                },
                            ]}
                        >
                            <Input.Password onChange={handlePasswordChange} />
                        </Form.Item>
                        <div className="mb-4">
                            <p className="text-sm font-semibold mb-2">Password Requirements:</p>
                            {renderPasswordRequirement(passwordRequirements.lowercase, 'One lowercase letter')}
                            {renderPasswordRequirement(passwordRequirements.uppercase, 'One uppercase letter')}
                            {renderPasswordRequirement(passwordRequirements.number, 'One number')}
                            {renderPasswordRequirement(passwordRequirements.specialChar, 'One special character (@#$&*-^!)')}
                            {renderPasswordRequirement(passwordRequirements.length, 'At least 6 characters long')}
                        </div>
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
                            ? 'Login'
                            : type === AuthModalType.SIGNUP
                              ? 'Sign Up'
                              : type === AuthModalType.VERIFY_EMAIL
                                ? 'Verify Email'
                                : 'Forgot Password'}
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
