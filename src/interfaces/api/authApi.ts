/* eslint-disable @typescript-eslint/no-explicit-any */
interface UserDataInResponse {
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    _id: string;
    id: string;
    createdAt: string;
    updatedAt: string;
}

interface SuccessResponse {
    success: true;
    message: string;
    data: any;
}

export interface UserLoginData {
    email: string;
    password: string;
}
export interface LoginResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse;
        access_token: string;
        refresh_token: string;
    };
}

export interface UserSignupData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
export interface SignupResponse extends SuccessResponse {
    data: {
        user: UserDataInResponse;
        access_token: string;
    };
}

export interface ForgotPasswordRequestParams {
    email: string;
}
export interface ForgotPasswordResponse extends SuccessResponse {
    data: {
        user: null;
        access_token: string;
    };
}

export interface ResetPasswordRequestParams {
    password_reset_code: number;
    new_password: string;
    access_token: string
}
export interface ResetPasswordResponse extends SuccessResponse {
    data: {
        user: null;
    };
}
