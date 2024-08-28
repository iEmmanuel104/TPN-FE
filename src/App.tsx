// src/App.tsx
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from './ScrollToTop';
import NotFound from './components/NotFound';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CourseList from './pages/Admin/course/CourseList';
import AddCourse from './pages/Admin/course/AddCourse';
import EditCourse from './pages/Admin/course/EditCourse';
import CourseView from './pages/Admin/course/CourseView';
import InstructorManagement from './pages/Admin/InstructorManagement';
import AdminManagement from './pages/Admin/AdminManagement';

function App() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer position="top-center" limit={2} />
                <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/" element={<AdminLogin />} />
                    <Route path="/iadmin">
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
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;