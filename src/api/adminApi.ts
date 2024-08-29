// src/api/adminApi.ts
import { apiSlice } from './api';

const URL_PREFIX = '/iamtpn';

// Types based on your models and API responses
export interface Admin {
    id: string;
    name: string;
    email: string;
    isSuperAdmin: boolean;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

// Specific response interfaces
interface AdminTokenResponse {
    adminToken: string;
    admin: Omit<Admin, 'id'>;
}

interface UserStatsResponse {
    totalUsers: number;
    enrolledUsers: number;
    newUsersThisMonth: number,
    totalCourses: number,
    newCoursesThisMonth: number,
    totalRevenue: number,
    revenueThisMonth: number,
    userIncrease: number,
    revenueIncrease: number,
    courseIncrease: number,
    usersByStatus: { status: string; count: string }[];
}

interface CourseStatsResponse {
    totalCourses: number;
    publishedCourses: number;
    totalEnrollments: number;
    completedCourses: number;
    completionRate: number;
    coursesByLevel: { level: string; count: string }[];
}

interface InstructorStatsResponse {
    totalInstructors: number;
    instructorsWithCourses: number;
    topInstructors: {
        id: string;
        name: string;
        instructorImage: string;
        courseCount: string;
        averageRating: number;
    }[];
}

interface TopCoursesResponse {
    id: string;
    title: string;
    enrollments: number;
    rating: number;
    instructorName: string;
    instructorImage: string;
    level: string;
    price: number;
    previewImage: string;
    instructorId: string;
}

interface RevenueStatsResponse {
    totalRevenue: number;
    stats: {
        period: string;
        revenue: number;
        enrollments: number;
        currency: {
            code: string;
            symbol: string;
        };
    }[];
}

// Refactored API slice using interfaces
export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginAdmin: builder.mutation<ApiResponse<null>, { email: string }>({
            query: (credentials) => ({
                url: URL_PREFIX + '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyAdminLogin: builder.mutation<ApiResponse<AdminTokenResponse>, { email: string; otpCode: string }>({
            query: (credentials) => ({
                url: URL_PREFIX + '/verify',
                method: 'POST',
                body: credentials,
            }),
        }),
        createAdmin: builder.mutation<ApiResponse<Admin>, Omit<Admin, 'id'>>({
            query: (adminData) => ({
                url: URL_PREFIX + '/create',
                method: 'POST',
                body: adminData,
            }),
        }),
        deleteAdmin: builder.mutation<ApiResponse<null>, { id: string }>({
            query: ({ id }) => ({
                url: URL_PREFIX + `/delete?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Admin'],
        }),
        getAllAdmins: builder.query<ApiResponse<Admin[]>, void>({
            query: () => URL_PREFIX + '/admins',
        }),
        getUserStats: builder.query<ApiResponse<UserStatsResponse>, void>({
            query: () => URL_PREFIX + '/user-stats',
        }),
        getCourseStats: builder.query<ApiResponse<CourseStatsResponse>, void>({
            query: () => URL_PREFIX + '/course-stats',
        }),
        getInstructorStats: builder.query<ApiResponse<InstructorStatsResponse>, void>({
            query: () => URL_PREFIX + '/instructor-stats',
        }),
        getTopCourses: builder.query<ApiResponse<TopCoursesResponse[]>, { limit?: number }>({
            query: ({ limit = 10 }) => URL_PREFIX + `/top-courses?limit=${limit}`,
        }),
        getRevenueStats: builder.query<ApiResponse<RevenueStatsResponse>, { timeFrame?: string; courseId?: string }>({
            query: ({ timeFrame, courseId }) => URL_PREFIX + `/revenue-stats?timeFrame=${timeFrame || ''}&courseId=${courseId || ''}`,
        }),
        blockUser: builder.mutation<ApiResponse<null>, { id: string; status: string; reason: string }>({
            query: ({ id, status, reason }) => ({
                url: `${URL_PREFIX}/block-user?id=${id}&status=${status}`,
                method: 'POST',
                body: {
                    reason,
                },
            }),
        }),
        deactivateUser: builder.mutation<ApiResponse<null>, { userId: string; isDeactivated: string }>({
            query: ({ userId, isDeactivated }) => ({
                url: `${URL_PREFIX}/deactivate-user?id=${userId}&isDeactivated=${isDeactivated}`,
                method: 'POST',
            }),
        }),

    }),
});

export const {
    useLoginAdminMutation,
    useVerifyAdminLoginMutation,
    useCreateAdminMutation,
    useDeleteAdminMutation,
    useGetAllAdminsQuery,
    useGetUserStatsQuery,
    useGetCourseStatsQuery,
    useGetInstructorStatsQuery,
    useGetTopCoursesQuery,
    useGetRevenueStatsQuery,
    useBlockUserMutation,
    useDeactivateUserMutation,
} = adminApiSlice;
