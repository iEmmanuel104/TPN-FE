// src/api/authApi.ts
import { ADMIN_AUTH_SERVER_URL } from '../constants';
import { apiSlice } from './api';

const AUTH_URL = ADMIN_AUTH_SERVER_URL + '/auth';

export interface UserInfoFromApi {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    displayImage?: string;
    status: {
        activated: boolean;
        emailVerified: boolean;
    };
    role: {
        name: string;
    };
    settings: {
        joinDate: string;
        isBlocked: boolean;
        lastLogin: string;
        suggestUpgrade: boolean;
    };
}

interface SignupResponse {
    status: string;
    message: string;
    data: {
        user: UserInfoFromApi;
    };
}

interface LoginResponse {
    status: string;
    message: string;
    data: {
        user: UserInfoFromApi;
        accessToken: string;
        refreshToken: string;
    };
}

interface LogoutResponse {
    status: string;
    message: string;
    data: null;
}

export interface GetLoggedUserResponse {
    status: string;
    message: string;
    data: {
        user: UserInfoFromApi;
    };
}

interface SignupParams {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface VerifyEmailResponse {
    status: string;
    message: string;
    data: {
        user: UserInfoFromApi;
        accessToken: string;
        refreshToken: string;
    };
}

interface ForgotPasswordResponse {
    status: string;
    message: string;
    data: null;
}

interface LoginParams {
    email: string;
    password: string;
}

interface ResetPasswordResponse {
    status: string;
    message: string;
    data: null;
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation<SignupResponse, SignupParams>({
            query: (credentials) => ({
                url: AUTH_URL + '/signup',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        getLoggedUser: builder.query<GetLoggedUserResponse, void>({
            query: () => ({
                url: AUTH_URL + '/loggeduser',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (credentials) => ({
                url: AUTH_URL + '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: AUTH_URL + '/logout',
                method: 'GET',
            }),
            invalidatesTags: ['User'],
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, { email: string; otpCode: string }>({
            query: ({ email, otpCode }) => ({
                url: AUTH_URL + '/verifyemail',
                method: 'POST',
                body: { email, otpCode },
            }),
        }),
        resendVerificationEmail: builder.mutation<ForgotPasswordResponse, { email: string }>({
            query: ({ email }) => ({
                url: AUTH_URL + `/resendverifyemail`,
                method: 'GET',
                params: { email },
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, { email: string }>({
            query: ({ email }) => ({
                url: AUTH_URL + '/forgotpassword',
                method: 'POST',
                body: {
                    email,
                    redirectUrl: 'https://yourwebsite.com/reset-password',
                },
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, { resetToken: string; email: string; newPassword: string }>({
            query: ({ resetToken, email, newPassword }) => ({
                url: AUTH_URL + '/resetpassword',
                method: 'POST',
                body: { resetToken, email, newPassword },
            }),
        }),
        changePassword: builder.mutation<ResetPasswordResponse, { oldPassword: string; newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: AUTH_URL + '/changepassword',
                method: 'POST',
                body: { oldPassword, newPassword },
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useGetLoggedUserQuery,
    useLoginMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useResendVerificationEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useChangePasswordMutation,
} = authApiSlice;