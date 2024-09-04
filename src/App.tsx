// src/App.tsx
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider, ThemeConfig } from 'antd';
import NotFound from './components/NotFound';
import { ProtectedAdminRoute, ProtectedUserRoute } from './hooks/ProtectedRoutes';

// admin pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CourseList from './pages/Admin/course/CourseList';
import AddCourse from './pages/Admin/course/AddCourse';
import EditCourse from './pages/Admin/course/EditCourse';
import CourseView from './pages/Admin/course/CourseView';
import InstructorManagement from './pages/Admin/InstructorManagement';
import AdminManagement from './pages/Admin/AdminManagement';
import StudentManagement from './pages/Admin/StudentManagement';
import BlogManagement from './pages/Admin/BlogManagement';

// public pages
import LandingPage from './pages/LandingPage';

// Ant Design theme configuration
const theme: ThemeConfig = {
  token: {
    fontFamily: '"Roboto Slab", serif',
  },
};

function App() {
    return (
        <ConfigProvider theme={theme}>
            <div className="flex flex-col justify-between h-screen">
                <BrowserRouter>
                    <ToastContainer position="top-center" limit={2} />
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        {/* Admin Routes */}
                        <Route path="/iadmin/login" element={<AdminLogin />} />
                        <Route path="/iadmin" element={<ProtectedAdminRoute />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="courses">
                                <Route index element={<CourseList />} />
                                <Route path="add" element={<AddCourse />} />
                                <Route path=":id">
                                    <Route index element={<CourseView />} />
                                    <Route path="edit" element={<EditCourse />} />
                                </Route>
                            </Route>
                            <Route path="instructors" element={<InstructorManagement />} />
                            <Route path="admins" element={<AdminManagement />} />
                            <Route path="students" element={<StudentManagement />} />
                            <Route path="blogs" element={<BlogManagement />} />
                        </Route>

                        {/* Add protected user routes here */}

                        <Route path="/user" element={<ProtectedUserRoute />}>
                            {/* Add your user routes here */}
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}

export default App;
