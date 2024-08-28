import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
    totalUsers: number;
}

const initialState: AdminState = {
    totalUsers: 0,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setTotalUsers: (state, action: PayloadAction<number>) => {
            state.totalUsers = action.payload;
        },
    },
});

export const { setTotalUsers } = adminSlice.actions;

export default adminSlice.reducer;