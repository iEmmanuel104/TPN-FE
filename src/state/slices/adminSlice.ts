// src/state/slices/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AdminState {
    adminToken: string | null;
    isAdminLoggedIn: boolean;
}

const initialState: AdminState = {
    adminToken: localStorage.getItem('adminToken'),
    isAdminLoggedIn: !!localStorage.getItem('adminToken'),
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminCredentials: (state, action: PayloadAction<{ adminToken: string }>) => {
            state.adminToken = action.payload.adminToken;
            state.isAdminLoggedIn = true;
            localStorage.setItem('adminToken', action.payload.adminToken);
        },
        logoutAdmin: (state) => {
            state.adminToken = null;
            state.isAdminLoggedIn = false;
            localStorage.removeItem('adminToken');
        },
    },
});

export const { setAdminCredentials, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;