// src/api/api.ts
import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';
import { message } from 'antd';
import { SERVER_URL } from '../constants';
// import { NavigateFunction } from 'react-router-dom';

export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    error?: boolean;
}

// let navigate: NavigateFunction | undefined;

// export const injectNavigate = (_navigate: NavigateFunction) => {
//     navigate = _navigate;
// };

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
        baseUrl: SERVER_URL,
        ...api,
    })(args, api, extraOptions);

    if (result.error) {
        const errorData = result.error.data as ApiResponse<null>;
        console.log({
            APIERROR: errorData,
            APISTATUS: result.error.status,
        });
        // if (result.error.status === 404 && errorData.message === 'Not Found') {
        //     if (navigate) {
        //         navigate('/not-found');
        //     } else {
        //         console.error('Navigation function not available');
        //     }
        // } else {
            message.error(errorData.message);
        // }
        return {
            error: {
                status: result.error.status,
                data: errorData,
            } as FetchBaseQueryError,
        };
    }

    // For successful responses, you might want to show a success message
    const successData = result.data as ApiResponse<unknown>;
    // if (successData.message) {
    //     message.success(successData.message);
    // }

    return { data: successData };
};

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['User', 'Course', 'Module', 'Instructor', 'Quiz', 'Review', 'Admin', 'UserCourse', 'Certificate'],
    endpoints: () => ({}),
});