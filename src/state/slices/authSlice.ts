// src/state/slices/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoFromApi } from "../../api/authApi";

export interface AuthState {
    user: UserInfoFromApi | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    isLoggedIn: !!localStorage.getItem("accessToken"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: UserInfoFromApi; accessToken: string; refreshToken: string }>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isLoggedIn = true;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        updateUser: (state, action: PayloadAction<Partial<UserInfoFromApi>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isLoggedIn = false;
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});

export const { setCredentials, updateUser, logOut } = authSlice.actions;

export default authSlice.reducer;