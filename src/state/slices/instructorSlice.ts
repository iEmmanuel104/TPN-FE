// src/state/slices/instructorSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InstructorDto } from "../../api/instructorApi";

export interface InstructorState {
    instructors: InstructorDto[];
    selectedInstructor: InstructorDto | null;
}

const initialState: InstructorState = {
    instructors: [],
    selectedInstructor: null,
};

export const instructorSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {
        setInstructors: (state, action: PayloadAction<InstructorDto[]>) => {
            state.instructors = action.payload;
        },
        setSelectedInstructor: (state, action: PayloadAction<InstructorDto>) => {
            state.selectedInstructor = action.payload;
        },
    },
});

export const { setInstructors, setSelectedInstructor } = instructorSlice.actions;

export default instructorSlice.reducer;