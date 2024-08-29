// src/api/userApi.ts
import { ApiResponse, apiSlice } from './api';
import { UserInfoFromApi } from './authApi';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponse<UserInfoFromApi[]>, { page?: number; size?: number; includeCourses?: boolean }>({
            query: ({ page, size, includeCourses }) => {
                const params = new URLSearchParams();
                if (page !== undefined) params.append('page', String(page));
                if (size !== undefined) params.append('size', String(size));
                if (includeCourses) params.append('includeCourses', 'true');

                return {
                    url: `/user?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['User'],
        }),
        getUser: builder.query<ApiResponse<UserInfoFromApi>, { id: string; ongoing?: 'true' | 'false' }>({
            query: ({ id, ongoing }) => {
                const params = new URLSearchParams();
                params.append('id', id);
                if (ongoing !== undefined) params.append('ongoing', ongoing);

                return {
                    url: `/user/info?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<ApiResponse<UserInfoFromApi>, Partial<UserInfoFromApi>>({
            query: (userData) => ({
                url: '/user/update',
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} = userApiSlice;
