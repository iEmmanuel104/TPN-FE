// src/state/slices/reviewSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IReview } from '../../api/reviewApi';

export interface ReviewState {
    courseReviews: IReview[];
    userReviews: IReview[];
}

const initialState: ReviewState = {
    courseReviews: [],
    userReviews: [],
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setCourseReviews: (state, action: PayloadAction<IReview[]>) => {
            state.courseReviews = action.payload;
        },
        setUserReviews: (state, action: PayloadAction<IReview[]>) => {
            state.userReviews = action.payload;
        },
        addReview: (state, action: PayloadAction<IReview>) => {
            state.courseReviews.push(action.payload);
            state.userReviews.push(action.payload);
        },
        removeReview: (state, action: PayloadAction<string>) => {
            state.courseReviews = state.courseReviews.filter(review => review.id !== action.payload);
            state.userReviews = state.userReviews.filter(review => review.id !== action.payload);
        },
    },
});

export const { setCourseReviews, setUserReviews, addReview, removeReview } = reviewSlice.actions;

export default reviewSlice.reducer;