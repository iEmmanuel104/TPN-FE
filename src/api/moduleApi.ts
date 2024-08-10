// src/api/moduleApi.ts
import { ApiResponse, apiSlice } from './api';

export interface ModuleDto {
    id: string;
    title: string;
    description: string;
    url: string;
    frames: { title: string; timestamp: number }[];
    courseId: string;
    episodeNumber: number;
    videoInfo: {
        length?: number;
        identifier?: string;
    };
    instructorId: string;
}

export const moduleApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addModule: builder.mutation<ApiResponse<ModuleDto>, Partial<ModuleDto>>({
            query: (module) => ({
                url: '/module/',
                method: 'POST',
                body: module,
            }),
            invalidatesTags: ['Module'],
        }),
        updateModule: builder.mutation<ApiResponse<ModuleDto>, { id: string; module: Partial<ModuleDto> }>({
            query: ({ id, module }) => ({
                url: `/module/?id=${id}`,
                method: 'PATCH',
                body: module,
            }),
            invalidatesTags: ['Module'],
        }),
        deleteModule: builder.mutation<ApiResponse<null>, { id: string }>({
            query: ({ id }) => ({
                url: `/module/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Module'],
        }),
        getModule: builder.query<ApiResponse<ModuleDto>, { id: string }>({
            query: ({ id }) => `/module/?id=${id}`,
            providesTags: ['Module'],
        }),
        getModulesByCourse: builder.query<ApiResponse<ModuleDto[]>, { courseId: string }>({
            query: ({ courseId }) => `/module/course-modules/?courseId=${courseId}`,
            providesTags: ['Module'],
        }),
    }),
});

export const {
    useAddModuleMutation,
    useUpdateModuleMutation,
    useDeleteModuleMutation,
    useGetModuleQuery,
    useGetModulesByCourseQuery,
} = moduleApiSlice;
