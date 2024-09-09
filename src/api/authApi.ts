// src/api/authApi.ts
import { apiSlice } from './api';

const URL_PREFIX = '/auth';

export interface UserInfoFromApi {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    displayImage?: string;
    gender?: string;
    status: {
        activated: boolean;
        emailVerified: boolean;
    };
    settings: Usersettings;
    enrolledCoursesCount: number;
    isDeactivated: boolean;
}

export interface Usersettings {
    id: string
    userId: string;
    lastLogin?: Date;
    joinDate: string;
    isBlocked?: boolean;
    isDeactivated?: boolean;
    meta?: IBlockMeta | null;
}

interface IBlockUnblockEntry {
    [date: string]: string; // Key is the date in YYYY-MM-DD format, value is the reason
}

export interface IBlockMeta {
    blockHistory: IBlockUnblockEntry[];
    unblockHistory: IBlockUnblockEntry[];
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

interface RefreshTokenResponse {
    status: string;
    message: string;
    data: {
        accessToken: string;
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
                url: URL_PREFIX + '/signup',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        getLoggedUser: builder.query<GetLoggedUserResponse, void>({
            query: () => ({
                url: URL_PREFIX + '/loggeduser',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        login: builder.mutation<LoginResponse, LoginParams>({
            query: (credentials) => ({
                url: URL_PREFIX + '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['User'],
        }),
        refreshToken: builder.query<RefreshTokenResponse, void>({
            query: () => ({
                url: '/authtoken',
                method: 'GET',
            }),
        }),
        logout: builder.mutation<LogoutResponse, void>({
            query: () => ({
                url: URL_PREFIX + '/logout',
                method: 'GET',
            }),
            invalidatesTags: ['User'],
        }),
        verifyEmail: builder.mutation<VerifyEmailResponse, { email: string; otpCode: string }>({
            query: ({ email, otpCode }) => ({
                url: URL_PREFIX + '/verifyemail',
                method: 'POST',
                body: { email, otpCode },
            }),
        }),
        resendVerificationEmail: builder.mutation<ForgotPasswordResponse, { email: string }>({
            query: ({ email }) => ({
                url: URL_PREFIX + `/resendverifyemail`,
                method: 'GET',
                params: { email },
            }),
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, { email: string }>({
            query: ({ email }) => ({
                url: URL_PREFIX + '/forgotpassword',
                method: 'POST',
                body: { email },
            }),
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, { resetToken: string; email: string; newPassword: string }>({
            query: ({ resetToken, email, newPassword }) => ({
                url: URL_PREFIX + '/resetpassword',
                method: 'POST',
                body: { resetToken, email, newPassword },
            }),
        }),
        changePassword: builder.mutation<ResetPasswordResponse, { oldPassword: string; newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: URL_PREFIX + '/changepassword',
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