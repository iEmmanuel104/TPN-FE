// src/api/quizApi.ts
import { ApiResponse, apiSlice } from './api';
import { UserCourseDto } from './courseApi';

export interface IQuiz {
    id: number;
    courseId: string;
    question: string;
    options: { text: string; option: string }[];
    answer?: string;
}

export interface IAnswer {
    questionId: string;
    optionId: string;
}

export interface IGradeQuizResponse {
    userCourse: UserCourseDto;
    grade: number;
    passed: boolean;
}

export const quizApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createQuiz: builder.mutation<ApiResponse<IQuiz[]>, { courseId: string; questions: IQuiz[]; benchmark?: number }>({
            query: (quizData) => ({
                url: '/quiz',
                method: 'POST',
                body: quizData,
            }),
            invalidatesTags: ['Quiz'],
        }),
        updateQuiz: builder.mutation<ApiResponse<IQuiz>, { id: string; quizData: Partial<IQuiz> }>({
            query: ({ id, quizData }) => ({
                url: `/quiz?id=${id}`,
                method: 'PATCH',
                body: quizData,
            }),
            invalidatesTags: ['Quiz'],
        }),
        gradeQuiz: builder.mutation<ApiResponse<IGradeQuizResponse>, { courseId: string; answers: IAnswer[] }>({
            query: (gradeData) => ({
                url: '/quiz/grade',
                method: 'POST',
                body: gradeData,
            }),
            invalidatesTags: ['Quiz', 'UserCourse'],
        }),
        requestQuiz: builder.query<ApiResponse<IQuiz[]>, string>({
            query: (courseId) => `/quiz?courseId=${courseId}`,
            providesTags: ['Quiz'],
        }),
        getCourseQuiz: builder.query<ApiResponse<IQuiz[]>, string>({
            query: (courseId) => `/quiz/info?courseId=${courseId}`,
            providesTags: ['Quiz'],
        }),
        deleteQuiz: builder.mutation<ApiResponse<null>, { id: number }>({
            query: ({ id }) => ({
                url: `/quiz/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quiz'],
        }),
    }),
});

export const {
    useCreateQuizMutation,
    useUpdateQuizMutation,
    useGradeQuizMutation,
    useRequestQuizQuery,
    useLazyRequestQuizQuery,  // Add this line
    useGetCourseQuizQuery,
    useDeleteQuizMutation,
} = quizApiSlice;