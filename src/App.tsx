import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// import { ActivityLog } from './pages/activity_log';
// import { ChangePassword } from './pages/change_password';
// import { CreateAccount } from './pages/create_account';
// import { Dashboard } from './pages/dashboard';
// import { EnterName } from './pages/enter_name';
// import Masterclass from './pages/masterclass';
// import { Messages } from './pages/messages';
// import { Questionaires } from './pages/questionaires';
// import { SetPassword } from './pages/set_password';
// import { SetUserName } from './pages/set_username';
// import { Settings } from './pages/settings';
// import { Support } from './pages/support';
// import { SupportDetails } from './pages/support_details';
// import { UserDetails } from './pages/user_details';
// import { Users } from './pages/users';
// import { VerifyAccount } from './pages/verify_account';
import { WelcomeBack } from './pages/welcomeBack';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ScrollToTop from './ScrollToTop';

function App() {
    return (
        <div className="flex flex-col justify-between h-screen">
            <BrowserRouter>
                <ScrollToTop />
                <ToastContainer position="top-center" limit={2} />
                <Routes>
                    <Route path="/login" element={<WelcomeBack />} />
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/" element={<WelcomeBack />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    {/* <Route path="/create_acc" element={<CreateAccount />} />
                    <Route path="/name" element={<EnterName />} />
                    <Route path="/password" element={<SetPassword />} />
                    <Route path="/username" element={<SetUserName />} />
                    <Route path="/verify" element={<VerifyAccount />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/support" element={<Support />} />
                    <Route
                        path="/change_password"
                        element={<ChangePassword />}
                    />
                    <Route
                        path="/support_details"
                        element={<SupportDetails />}
                    />
                    <Route path="/users" element={<Users />} />
                    <Route path="/user_details" element={<UserDetails />} />
                    <Route path="/activity_log" element={<ActivityLog />} />
                    <Route
                        path="/questionaire_log"
                        element={<Questionaires />}
                    />
                    <Route path="/masterclass" element={<Masterclass />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/settings" element={<Settings />} /> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
