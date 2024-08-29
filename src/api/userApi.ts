// src/api/userApi.ts
import { ApiResponse, apiSlice } from './api';
import { UserInfoFromApi } from './authApi';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponse<{ users: UserInfoFromApi[], count: number, totalPages: number }>, { page?: number; size?: number; q: string; isBlocked?: boolean; isDeactivated?: boolean }>({
            query: ({ page, size, q, isBlocked, isDeactivated }) => {
                const params = new URLSearchParams();
                if (page !== undefined) params.append('page', String(page));
                if (size !== undefined) params.append('size', String(size));
                if (q !== undefined) params.append('q', String(q));
                if (isBlocked !== undefined) params.append('isBlocked', String(isBlocked));
                if (isDeactivated !== undefined) params.append('isDeactivated', String(isDeactivated));

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
