// src/state/slices/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IQuiz } from '../../api/quizApi';

export interface QuizState {
    currentQuiz: IQuiz[] | null;
    quizResult: {
        grade: number;
        passed: boolean;
    } | null;
}

const initialState: QuizState = {
    currentQuiz: null,
    quizResult: null,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setCurrentQuiz: (state, action: PayloadAction<IQuiz[]>) => {
            state.currentQuiz = action.payload;
        },
        setQuizResult: (state, action: PayloadAction<{ grade: number; passed: boolean }>) => {
            state.quizResult = action.payload;
        },
        clearQuiz: (state) => {
            state.currentQuiz = null;
            state.quizResult = null;
        },
    },
});

export const { setCurrentQuiz, setQuizResult, clearQuiz } = quizSlice.actions;

export default quizSlice.reducer;

