// src/api/reviewApi.ts
import { ApiResponse, apiSlice } from './api';

export interface IReview {
    id: string;
    comment: string;
    rating: number;
    reviewerId: string;
    courseId?: string | null;
}

export const reviewApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation<ApiResponse<IReview>, Omit<IReview, 'id' | 'reviewerId'>>({
            query: (reviewData) => ({
                url: '/review',
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: ['Review'],
        }),
        deleteReview: builder.mutation<ApiResponse<null>, string>({
            query: (id) => ({
                url: `/review?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review'],
        }),
        getReview: builder.query<ApiResponse<IReview>, string>({
            query: (id) => `/review?id=${id}`,
            providesTags: ['Review'],
        }),
        getReviewsByCourse: builder.query<ApiResponse<IReview[]>, string>({
            query: (courseId) => `/review/course?courseId=${courseId}`,
            providesTags: ['Review'],
        }),
        getReviewsByUser: builder.query<ApiResponse<IReview>[], string | void>({
            query: (userId) => `/review/user${userId ? `?userId=${userId}` : ''}`,
            providesTags: ['Review'],
        }),
    }),
});

export const {
    useAddReviewMutation,
    useDeleteReviewMutation,
    useGetReviewQuery,
    useGetReviewsByCourseQuery,
    useGetReviewsByUserQuery,
} = reviewApiSlice;