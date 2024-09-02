// src/hooks/ProtectedRoutes.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store'; // Adjust this import based on your actual store setup

export const ProtectedUserRoute: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export const ProtectedAdminRoute: React.FC = () => {
    const isAdminLoggedIn = useSelector((state: RootState) => state.auth.isAdminLoggedIn);

    if (!isAdminLoggedIn) {
        return <Navigate to="/iadmin/login" replace />;
    }

    return <Outlet />;
};
