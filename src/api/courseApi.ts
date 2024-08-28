// src/api/courseApi.ts
import { ApiResponse, apiSlice } from './api';
import { InstructorDto } from './instructorApi';
import { ModuleDto } from './moduleApi';
import { IReview } from './reviewApi';

export enum CourseStatus {
    New = 'New',
    Uploaded = 'Uploaded',
    Published = 'Published'
}

export enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    AllLevels = 'AllLevels',
}

export enum UserCourseStatus {
    NotStarted = 'NotStarted',
    Watching = 'Watching',
    TakingQuiz = 'TakingQuiz',
    Completed = 'Completed',
}

export interface CourseDto {
    id: string;
    title: string;
    description: string;
    media: {
        videoThumbnail?: string;
        previewVideo?: string;
        identifier?: string;
    };
    status: CourseStatus;
    category: string[];
    price: number;
    currency: {
        symbol: string;
        code: string;
    };
    level: CourseLevel;
    assessment: {
        benchmark?: number;
        hasAssessment?: boolean;
    };
    instructorId: string;
    instructor: InstructorDto;
    requirements: string[];
    learningOutcome: string[];
    certificateId?: string;
    customStyles?: Record<string, string>;
    createdAt: string;
    updatedAt: string;
    modules: ModuleDto[];
    reviews: IReview[];
    stats: {
        overallRating: number;
        numberOfPaidStudents: number;
        ratingCount: number;
        numberOfModules: number;
    };
}

export interface UserCourseDto {
    id: string;
    userId: string;
    courseId: string;
    paid: boolean;
    progress: {
        moduleId: string;
        currentTime: number;
        episodeNumber: number;
    };
    status: UserCourseStatus;
    certificateUrl: string | null;
    testResults: {
        testScore?: number;
        testPassed?: boolean;
    };
}

export interface GetAllCoursesParams {
    q?: string;
    level?: CourseLevel;
    category?: string[];
    minRating?: number;
    status?: CourseStatus;
    userId?: string;
    page?: number;
    size?: number;
}

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addCourse: builder.mutation<ApiResponse<CourseDto>, Partial<CourseDto>>({
            query: (course) => ({
                url: '/course/',
                method: 'POST',
                body: course,
            }),
            invalidatesTags: ['Course'],
        }),
        getAllCourses: builder.query<ApiResponse<{ courses: CourseDto[] }>, GetAllCoursesParams>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params.q) queryParams.append('q', params.q);
                if (params.level) queryParams.append('level', params.level);
                if (params.category) params.category.forEach(cat => queryParams.append('category', cat));
                if (params.minRating) queryParams.append('minRating', params.minRating.toString());
                if (params.status) queryParams.append('status', params.status);
                if (params.userId) queryParams.append('userId', params.userId);
                if (params.page) queryParams.append('page', params.page.toString());
                if (params.size) queryParams.append('size', params.size.toString());

                return {
                    url: `/course/?${queryParams.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Course'],
        }),
        getSingleCourseInfo: builder.query<ApiResponse<CourseDto>, { id: string }>({
            query: ({ id }) => ({
                url: `/course/info?id=${id}`,
                method: 'GET',
            }),
            providesTags: ['Course'],
        }),
        updateCourse: builder.mutation<ApiResponse<CourseDto>, { id: string; course: Partial<CourseDto> }>({
            query: ({ id, course }) => ({
                url: `/course/?id=${id}`,
                method: 'PATCH',
                body: course,
            }),
            invalidatesTags: ['Course'],
        }),
        deleteCourse: builder.mutation<ApiResponse<null>, { id: string }>({
            query: ({ id }) => ({
                url: `/course/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),
        enrollForCourse: builder.mutation<ApiResponse<UserCourseDto>, { courseId: string }>({
            query: ({ courseId }) => ({
                url: '/course/enroll',
                method: 'POST',
                body: { courseId },
            }),
            invalidatesTags: ['UserCourse'],
        }),
        generateCourseCertificate: builder.mutation<ApiResponse<{ certificateUrl: string }>, { courseId: string }>({
            query: ({ courseId }) => ({
                url: '/course/request-certificate',
                method: 'POST',
                body: { courseId },
            }),
            invalidatesTags: ['UserCourse'],
        }),
        getUserCourses: builder.query<ApiResponse<UserCourseDto[]>, void>({
            query: () => ({
                url: '/course/user-courses',
                method: 'GET',
            }),
            providesTags: ['UserCourse'],
        }),
        updateUserCourseProgress: builder.mutation<ApiResponse<UserCourseDto>, Partial<UserCourseDto>>({
            query: (userCourse) => ({
                url: `/course/user-progress`,
                method: 'PATCH',
                body: userCourse,
            }),
            invalidatesTags: ['UserCourse'],
        }),
    }),
});

export const {
    useAddCourseMutation,
    useGetAllCoursesQuery,
    useGetSingleCourseInfoQuery,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useEnrollForCourseMutation,
    useGenerateCourseCertificateMutation,
    useGetUserCoursesQuery,
    useUpdateUserCourseProgressMutation,
} = courseApiSlice;