// src/state/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/api';
import { authSlice } from './slices/authSlice';
import { courseSlice } from './slices/courseSlice';
import { moduleSlice } from './slices/moduleSlice';
import { instructorSlice } from './slices/instructorSlice';
import { userSlice } from './slices/userSlice';
import { certificateSlice } from './slices/certificateSlice';
import { quizSlice } from './slices/quizSlice';
import { reviewSlice } from './slices/reviewSlice';

import type { AuthState } from './slices/authSlice';
import type { CourseState } from './slices/courseSlice';
import type { ModuleState } from './slices/moduleSlice';
import type { InstructorState } from './slices/instructorSlice';
import type { UserState } from './slices/userSlice';
import type { CertificateState } from './slices/certificateSlice';
import type { QuizState } from './slices/quizSlice';
import type { ReviewState } from './slices/reviewSlice';


export interface RootState {
    auth: AuthState;
    course: CourseState;
    module: ModuleState;
    instructor: InstructorState;
    user: UserState;
    certificate: CertificateState;
    quiz: QuizState;
    review: ReviewState;
    [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
}

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        course: courseSlice.reducer,
        module: moduleSlice.reducer,
        instructor: instructorSlice.reducer,
        user: userSlice.reducer,
        certificate: certificateSlice.reducer,
        quiz: quizSlice.reducer,
        review: reviewSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;