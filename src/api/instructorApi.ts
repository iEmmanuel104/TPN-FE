
// src/api/instructorApi.ts
import { ApiResponse, apiSlice } from './api';

export interface InstructorDto {
    id: string;
    name: string;
    email: string;
    bio: string;
    info: {
        profilePictureUrl: string;
        identifier: string;
    };
    socials: Record<string, string>;
    courseCount: number;
}

export const instructorApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addInstructor: builder.mutation<ApiResponse<InstructorDto>, Partial<InstructorDto>>({
            query: (instructor) => ({
                url: '/instructor/',
                method: 'POST',
                body: instructor,
            }),
            invalidatesTags: ['Instructor'],
        }),
        updateInstructor: builder.mutation<ApiResponse<InstructorDto>, { id: string; instructor: Partial<InstructorDto> }>({
            query: ({ id, instructor }) => ({
                url: `/instructor/?id=${id}`,
                method: 'PATCH',
                body: instructor,
            }),
            invalidatesTags: ['Instructor'],
        }),
        deleteInstructor: builder.mutation<ApiResponse<null>, { id: string }>({
            query: ({ id }) => ({
                url: `/instructor/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Instructor'],
        }),
        getInstructor: builder.query<ApiResponse<InstructorDto>, { id: string }>({
            query: ({ id }) => `/instructor/?id=${id}`,
            providesTags: ['Instructor'],
        }),
        getAllInstructors: builder.query<ApiResponse<InstructorDto[]>, void>({
            query: () => '/instructor/',
            providesTags: ['Instructor'],
        }),
    }),
});

export const {
    useAddInstructorMutation,
    useUpdateInstructorMutation,
    useDeleteInstructorMutation,
    useGetInstructorQuery,
    useGetAllInstructorsQuery,
} = instructorApiSlice;