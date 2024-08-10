// src/state/slices/courseSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CourseDto, UserCourseDto } from "../../api/courseApi";

export interface CourseState {
    courses: CourseDto[];
    selectedCourse: CourseDto | null;
    userCourses: UserCourseDto[];
}

const initialState: CourseState = {
    courses: [],
    selectedCourse: null,
    userCourses: [],
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
        updateUserCourseProgress: (state, action: PayloadAction<Partial<UserCourseDto>>) => {
            const index = state.userCourses.findIndex(uc => uc.id === action.payload.id);
            if (index !== -1) {
                state.userCourses[index] = { ...state.userCourses[index], ...action.payload };
            }
        },
    },
});

export const { setCourses, setSelectedCourse, setUserCourses, updateUserCourseProgress } = courseSlice.actions;

export default courseSlice.reducer;