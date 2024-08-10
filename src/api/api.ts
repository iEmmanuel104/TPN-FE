// src/api/api.ts
import {
    createApi,
    fetchBaseQuery,
    BaseQueryFn,
    FetchBaseQueryError,
    FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { ADMIN_SERVER_URL } from '../constants';

export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    error?: boolean;
}

const baseQuery: BaseQueryFn< string | FetchArgs, unknown, FetchBaseQueryError
    > = async (args, api, extraOptions) => {
        const result = await fetchBaseQuery({
            baseUrl: ADMIN_SERVER_URL,
            ...api,
        })(args, api, extraOptions);

        if (result.error) {
            // Handle error responses
            const errorData = result.error.data as ApiResponse<null>;
            return {
                error: {
                    status: result.error.status,
                    data: errorData,
                } as FetchBaseQueryError,
            };
        }

        // Handle successful responses
        return { data: result.data as ApiResponse<unknown> };
    };

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User', 'Course', 'Module', 'Instructor', 'Quiz', 'Review', 'Admin', 'UserCourse', 'Certificate'],
    endpoints: () => ({}),
});