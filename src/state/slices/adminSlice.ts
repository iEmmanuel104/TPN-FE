// // src/state/slices/adminSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Admin } from '../../api/adminApi';

// export interface AdminState {
//     adminToken: string | null;
//     admin: Omit<Admin, 'id'>;
//     isAdminLoggedIn: boolean;
// }

// const initialState: AdminState = {
//     adminToken: localStorage.getItem('adminToken'),
//     admin: localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin') as string) : null,
//     isAdminLoggedIn: !!localStorage.getItem('adminToken'),
// };

// export const adminSlice = createSlice({
//     name: 'admin',
//     initialState,
//     reducers: {
//         setAdminCredentials: (state, action: PayloadAction<{ adminToken: string, admin: Omit<Admin, 'id'> }>) => {
//             state.adminToken = action.payload.adminToken;
//             state.admin = action.payload.admin;
//             state.isAdminLoggedIn = true;
//             localStorage.setItem('adminToken', action.payload.adminToken);
//             localStorage.setItem('admin', JSON.stringify(action.payload.admin));
//         },
//         logoutAdmin: (state) => {
//             state.adminToken = null;
//             state.isAdminLoggedIn = false;
//             localStorage.removeItem('adminToken');
//         },
//     },
// });

// export const { setAdminCredentials, logoutAdmin } = adminSlice.actions;

// export default adminSlice.reducer;