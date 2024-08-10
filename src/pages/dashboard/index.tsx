import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../state/store';

// Dummy data
const dummyCourseStats = {
    totalCourses: 120,
    totalModules: 500,
    totalUsers: 1000,
    userEngagement: [
        { name: 'Course 1', value: 100 },
        { name: 'Course 2', value: 80 },
        { name: 'Course 3', value: 60 },
        { name: 'Course 4', value: 50 },
    ],
    userTypes: [
        { name: 'Students', value: 800 },
        { name: 'Instructors', value: 150 },
        { name: 'Admins', value: 50 },
    ],
};

export const Dashboard = () => {
    const { loggedUser } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    if (!loggedUser) {
        navigate('/login');
    }

    const courseStats = dummyCourseStats;

    return (
        <div className="overflow-x-hidden" style={{ height: '100%' }}>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Header showSearch />
                <div className="flex justify-between py-4">
                    <h4>Course System Stats</h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col justify-center bg-[#000000] rounded-lg p-4 py-6">
                        <div className="user-circle">
                            <img
                                src={
                                    'https://cdn.blkat.io/assets/image/dashboard/profile-2user.svg'
                                }
                                height={20}
                                width={20}
                                alt="profile icon"
                            />
                        </div>
                        <p className="text-2xl text-white">
                            {courseStats.totalCourses}
                        </p>
                        <h6 className="text-white card_subtext">
                            Total number of courses
                        </h6>
                    </div>
                    <div className="flex flex-col justify-center bg-[#E9E9E9] rounded-lg p-4 py-6">
                        <div className="user-circle">
                            <img
                                src={
                                    'https://cdn.blkat.io/assets/image/dashboard/profile.svg'
                                }
                                height={20}
                                width={20}
                                alt="profile icon"
                            />
                        </div>
                        <p className="text-2xl text-dark">
                            {courseStats.totalModules}
                        </p>
                        <h6 className="text-dark card_subtext">
                            Total number of modules
                        </h6>
                    </div>
                    <div className="flex flex-col justify-center bg-[#E9E9E9] rounded-lg p-4 py-6">
                        <div className="user-circle">
                            <img
                                src={
                                    'https://cdn.blkat.io/assets/image/dashboard/profile.svg'
                                }
                                height={20}
                                width={20}
                                alt="profile icon"
                            />
                        </div>
                        <p className="text-2xl text-dark">
                            {courseStats.totalUsers}
                        </p>
                        <h6 className="text-dark card_subtext">
                            Total number of users
                        </h6>
                    </div>
                </div>

                <div className="card">
                    <div className="flex flex-row justify-between mb-3">
                        <div>
                            <h4 className="header">User Engagement</h4>
                            <p className="subtext">Activity by course</p>
                        </div>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={courseStats.userEngagement}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="card bg-[#FBFBFB] flex flex-row items-center justify-center">
                        <div className="flex flex-col items-center">
                            <h4 className="font-semibold text-base">
                                User Types
                            </h4>
                            <PieChart width={250} height={180}>
                                <Pie
                                    data={courseStats.userTypes}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                    label
                                >
                                    {courseStats.userTypes.map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill="#8884d8"
                                            />
                                        ),
                                    )}
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
