import { ApiResponse, apiSlice } from './api';
import { UserInfoFromApi } from './authApi';

export enum BlogStatus {
    Draft = 'Draft',
    Published = 'Published',
    Archived = 'Archived',
}

export interface BlogAuthorDto {
    name: string;
    email: string;
    image?: string;
    bio?: string;
}

export interface BlogMediaDto {
    images?: string[];
    videos?: string[];
}

export interface BlogDto {
    id: string;
    title: string;
    content: string;
    media?: BlogMediaDto;
    status: BlogStatus;
    tags?: string[];
    author: BlogAuthorDto;
    createdAt: string;
    updatedAt: string;
    activities: BlogActivityDto[];
}

export interface BlogActivityDto {
    userId: string;
    blogId: string;
    liked: boolean;
    comment: string | null;
    user: UserInfoFromApi;
}

export interface GetAllBlogsParams {
    page?: number;
    size?: number;
    status?: BlogStatus;
    q?: string;
    tag?: string;
}

export const blogApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addBlog: builder.mutation<ApiResponse<BlogDto>, Partial<BlogDto>>({
            query: (blog) => ({
                url: '/blog/',
                method: 'POST',
                body: blog,
            }),
            invalidatesTags: ['Blog'],
        }),
        getAllBlogs: builder.query<ApiResponse<{ blogs: BlogDto[], count: number, totalPages: number }>, GetAllBlogsParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.q) queryParams.append('q', params.q);
                if (params.status) queryParams.append('status', params.status);
                if (params.tag) queryParams.append('tag', params.tag);
                if (params.page) queryParams.append('page', params.page.toString());
                if (params.size) queryParams.append('size', params.size.toString());

                return {
                    url: `/blog/?${queryParams.toString()}`,
                };
            },
            providesTags: ['Blog'],
        }),
        getBlog: builder.query<ApiResponse<BlogDto>, string>({
            query: (id) => ({
                url: `/blog/?id=${id}`,
            }),
            providesTags: ['Blog'],
        }),
        updateBlog: builder.mutation<ApiResponse<BlogDto>, Partial<BlogDto> & { id: string }>({
            query: ({ id, ...blog }) => ({
                url: `/blog/?id=${id}`,
                method: 'PATCH',
                body: blog,
            }),
            invalidatesTags: ['Blog'],
        }),
        deleteBlog: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: `/blog/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),
        engageWithBlog: builder.mutation<ApiResponse<BlogActivityDto>, { id: string; action: 'like' | 'comment'; comment?: string }>({
            query: ({ id, action, comment }) => ({
                url: `/blog/engage?id=${id}`,
                method: 'POST',
                body: { action, comment },
            }),
            invalidatesTags: ['Blog'],
        }),
        getBlogActivities: builder.query<ApiResponse<BlogActivityDto[]>, { id: string; type?: 'like' | 'comment' }>({
            query: ({ id, type }) => ({
                url: `/blog/activities?id=${id}&type=${type}`,
            }),
            providesTags: ['Blog'],
        }),
    }),
});

export const {
    useAddBlogMutation,
    useGetAllBlogsQuery,
    useGetBlogQuery,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useEngageWithBlogMutation,
    useGetBlogActivitiesQuery,
} = blogApiSlice;
