// src/state/slices/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfoFromApi } from "../../api/authApi";

export interface UserState {
    users: UserInfoFromApi[];
    selectedUser: UserInfoFromApi | null;
}

const initialState: UserState = {
    users: [],
    selectedUser: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserInfoFromApi[]>) => {
            state.users = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<UserInfoFromApi>) => {
            state.selectedUser = action.payload;
        },
        updateUserInList: (state, action: PayloadAction<UserInfoFromApi>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});

export const { setUsers, setSelectedUser, updateUserInList } = userSlice.actions;

export default userSlice.reducer;

