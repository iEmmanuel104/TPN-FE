// src/api/userApi.ts
import { apiSlice } from './api';
import { UserInfoFromApi } from './authApi';

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    otherName?: string;
    displayImage?: string;
    gender?: string;
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<UserInfoFromApi[], { page?: number; size?: number }>({
            query: ({ page, size }) => ({
                url: '/user',
                method: 'GET',
                params: { page, size },
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<UserInfoFromApi, UpdateUserDto>({
            query: (userData) => ({
                url: '/user/update',
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['User'],
        }),
        searchUsers: builder.query<UserInfoFromApi[], string>({
            query: (searchTerm) => ({
                url: '/user/search',
                method: 'GET',
                params: { q: searchTerm },
            }),
        }),
        uploadUserImage: builder.mutation<{ url: string }, FormData>({
            query: (formData) => ({
                url: '/user/upload/data',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useSearchUsersQuery,
    useUploadUserImageMutation,
} = userApiSlice;