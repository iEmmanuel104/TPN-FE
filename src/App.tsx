import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ScrollToTop from './ScrollToTop';

function App() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer position="top-center" limit={2} />
                <Routes>
                    <Route path="/login" element={<AdminLogin />} />
                    <Route path="/" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
