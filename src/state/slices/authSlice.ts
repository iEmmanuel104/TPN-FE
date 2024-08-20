// src/state/slices/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserInfoFromApi } from "../../api/authApi";
import { Admin } from "../../api/adminApi";

export interface AuthState {
    user: UserInfoFromApi | null;
    admin: Omit<Admin, 'id'> | null;
    accessToken: string | null;
    refreshToken: string | null;
    adminToken: string | null;
    isLoggedIn: boolean;
    isAdminLoggedIn: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    admin: JSON.parse(localStorage.getItem("admin") || "null"),
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    adminToken: localStorage.getItem("adminToken"),
    isLoggedIn: !!localStorage.getItem("accessToken"),
    isAdminLoggedIn: !!localStorage.getItem("adminToken"),
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserCredentials: (state, action: PayloadAction<{ user: UserInfoFromApi; accessToken: string; refreshToken: string }>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.admin = null;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.adminToken = null;
            state.isLoggedIn = true;
            state.isAdminLoggedIn = false;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.removeItem("admin");
            localStorage.removeItem("adminToken");
        },
        setAdminCredentials: (state, action: PayloadAction<{ admin: Omit<Admin, 'id'>; adminToken: string }>) => {
            const { admin, adminToken } = action.payload;
            state.admin = admin;
            state.user = null;
            state.adminToken = adminToken;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAdminLoggedIn = true;
            state.isLoggedIn = false;
            localStorage.setItem("admin", JSON.stringify(admin));
            localStorage.setItem("adminToken", adminToken);
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        updateUser: (state, action: PayloadAction<Partial<UserInfoFromApi>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
        updateTokens: (state, action: PayloadAction<{ accessToken: string; }>) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
            localStorage.setItem("accessToken", accessToken);
        },
        logOut: (state) => {
            state.user = null;
            state.admin = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.adminToken = null;
            state.isLoggedIn = false;
            state.isAdminLoggedIn = false;
            localStorage.removeItem("user");
            localStorage.removeItem("admin");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("adminToken");
        },
    },
});

export const { setUserCredentials, setAdminCredentials, updateUser, updateTokens, logOut } = authSlice.actions;

export default authSlice.reducer;