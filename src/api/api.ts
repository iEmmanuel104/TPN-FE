// src/api/api.ts
import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { message } from 'antd';
import { SERVER_URL } from '../constants';
import { RootState } from '../state/store';
import { updateTokens, logOut } from '../state/slices/authSlice';

export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    error?: boolean;
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: SERVER_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const { isAdminLoggedIn, adminToken, accessToken } = state.auth;

            if (isAdminLoggedIn && adminToken) {
                headers.set('Authorization', `Bearer ${adminToken}`);
                headers.set('X-iAdmin-Access', 'true');
            } else if (accessToken) {
                headers.set('Authorization', `Bearer ${accessToken}`);
            }

            return headers;
        },
    })(args, api, extraOptions);

    const state = api.getState() as RootState;
    const { isAdminLoggedIn } = state.auth;

    if (!isAdminLoggedIn && result.error && result.error.status === 401 && (result.error.data as ApiResponse<unknown>).message === 'Token expired') {
        // Token has expired, try to refresh
        const refreshResult = await fetchBaseQuery({
            baseUrl: SERVER_URL,
            prepareHeaders: (headers, { getState }) => {
                const state = getState() as RootState;
                const { refreshToken } = state.auth;
                headers.set('Authorization', `Bearer ${refreshToken}`);
                return headers;
            },
        })({ url: '/authtoken', method: 'GET' }, api, extraOptions);

        if (refreshResult.data) {
            const refreshData = refreshResult.data as ApiResponse<{ accessToken: string; refreshToken: string }>;
            api.dispatch(updateTokens(refreshData.data!));

            // Retry the original query with new access token
            return baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
            message.error('Session expired. Please log in again.');
            return { error: { status: 401, data: 'Session expired. Please log in again.' } };
        }
    }

    if (result.error) {
        const errorData = result.error.data as ApiResponse<null>;
        console.log({
            APIERROR: errorData,
            APISTATUS: result.error.status,
        });
        message.error(errorData.message);
        return {
            error: {
                status: result.error.status,
                data: errorData,
            } as FetchBaseQueryError,
        };
    }

    const successData = result.data as ApiResponse<unknown>;
    console.log({
        APISUCCESS: successData,
    });

    return { data: successData };
};

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User', 'Course', 'Module', 'Instructor', 'Quiz', 'Review', 'Admin', 'UserCourse', 'Certificate', 'Blog'],
    endpoints: () => ({}),
});