import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCard from '../components/StatsCard';
import IncomeExpenseReport from '../components/IncomeExpenseReport';
import ProfessorsList from '../components/ProfessorList';
import StudentList from '../components/StudentList';

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-64 bg-white">
                <Sidebar />
            </div>
            <div className="flex-grow">
                <DashboardHeader />
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-3 gap-6">
                        <StatsCard
                            title="Total Students"
                            value="3280"
                            progress={80}
                            color="blue"
                        />
                        <StatsCard
                            title="New Students"
                            value="245"
                            progress={50}
                            color="red"
                        />
                        <StatsCard
                            title="Fees Collection"
                            value="25160$"
                            progress={30}
                            color="green"
                        />
                        <StatsCard
                            title="Total Course"
                            value="28"
                            progress={76}
                            color="red"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <IncomeExpenseReport />
                        <div>
                            <ProfessorsList />
                            <StudentList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
