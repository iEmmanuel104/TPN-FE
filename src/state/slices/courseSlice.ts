import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseDto, UserCourseDto } from "../../api/courseApi";

export interface CourseState {
    courses: CourseDto[];
    selectedCourse: CourseDto | null;
    userCourses: UserCourseDto[];
    currentModuleId: string | null;
    currentEpisodeNumber: number | null;
}

const initialState: CourseState = {
    courses: [],
    selectedCourse: null,
    userCourses: [],
    currentModuleId: null,
    currentEpisodeNumber: null,
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<CourseDto[]>) => {
            state.courses = action.payload;
        },
        setSelectedCourse: (state, action: PayloadAction<CourseDto>) => {
            state.selectedCourse = action.payload;
        },
        setUserCourses: (state, action: PayloadAction<UserCourseDto[]>) => {
            state.userCourses = action.payload;
        },
        updateUserCourseProgress: (state, action: PayloadAction<{
            courseId: string;
            moduleId: string;
            currentTime: number;
            episodeNumber: number;
        }>) => {
            const { courseId, moduleId, currentTime, episodeNumber } = action.payload;
            const userCourse = state.userCourses.find(uc => uc.courseId === courseId);
            if (userCourse) {
                userCourse.progress = {
                    moduleId,
                    currentTime,
                    episodeNumber,
                    watchedEps: userCourse.progress.watchedEps || [],
                };
            }
        },
        markModuleAsCompleted: (state, action: PayloadAction<{
            courseId: string;
            moduleId: string;
            episodeNumber: number;
        }>) => {
            const { courseId, moduleId, episodeNumber } = action.payload;
            console.log(courseId, moduleId, episodeNumber);
            const userCourse = state.userCourses.find(uc => uc.courseId === courseId);
            if (userCourse) {
                userCourse.progress.watchedEps = [
                    ...(userCourse.progress.watchedEps || []),
                    episodeNumber
                ];
            }
        },
        setCurrentModule: (state, action: PayloadAction<{
            moduleId: string;
            episodeNumber: number;
        }>) => {
            state.currentModuleId = action.payload.moduleId;
            state.currentEpisodeNumber = action.payload.episodeNumber;
        },
    },
});

export const {
    setCourses,
    setSelectedCourse,
    setUserCourses,
    updateUserCourseProgress,
    markModuleAsCompleted,
    setCurrentModule
} = courseSlice.actions;

export default courseSlice.reducer;