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
import EventManagement from './pages/Admin/EventManagement'; 

// public pages
import LandingPage from './pages/LandingPage';
import CourseOverView from './pages/CourseOverview';
import CoursePage from './pages/CoursePage';
import EventsPage from './pages/EventsPage';
import BlogOverview from './pages/BlogOverview';
import BlogPage from './pages/BlogPage';
import PaymentResult from './pages/PaymentResult';
import ContactPage from './pages/ContatcUsPage';

// user pages
import UserProfilePage from './pages/UserProfilePage';
import UserDashboard from './pages/UserDashboardPage'; // Import the new UserDashboard component
import PasswordResetPage from './pages/PasswordResetpage';

// Ant Design theme configuration
const theme: ThemeConfig = {
    token: {
        fontFamily: '"Roboto Slab", serif',
        borderRadius: 0,
    },
};

function App() {
    return (
        <ConfigProvider theme={theme}>
            <div className="flex flex-col justify-between h-screen">
                <BrowserRouter>
                    <ToastContainer position="top-center" limit={2} />
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/courses" element={<CourseOverView />} />
                        <Route path="/course/:id" element={<CoursePage />} />
                        <Route path="course-payment/success/:id" element={<PaymentResult isSuccess={true} />} />
                        <Route path="course-payment/cancel/:id" element={<PaymentResult isSuccess={false} />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/blogs" element={<BlogOverview />} />
                        <Route path="/blog/:id" element={<BlogPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/reset-password" element={<PasswordResetPage />} />

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
                            <Route path="events" element={<EventManagement />} />
                        </Route>

                        {/* User Routes */}
                        <Route path="/dashboard" element={<ProtectedUserRoute />}>
                            <Route index element={<UserDashboard />} /> {/* Add this line */}
                            <Route path="profile" element={<UserProfilePage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </ConfigProvider>
    );
}

export default App;
