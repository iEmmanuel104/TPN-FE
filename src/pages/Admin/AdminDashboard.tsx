// pages/AdminDashboard.tsx
import React from 'react';
import { Spin } from 'antd';
import DashboardLayout from '../../components/DashboardLayout';
import StatsCard from '../../components/StatsCard';
import IncomeExpenseReport from '../../components/IncomeExpenseReport';
import InstructorsList from '../../components/InstructorList';
import TopCoursesList from '../../components/TopCoursesList';
import {
    useGetUserStatsQuery,
} from '../../api/adminApi';


const AdminDashboard: React.FC = () => {
    const { data: userStats, isLoading: userStatsLoading } =
        useGetUserStatsQuery();

    if (userStatsLoading) {
        return <Spin size="large" />;
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <StatsCard
                            title="User Statistics"
                            stats={[
                                {
                                    label: 'Total/Enrolled Users',
                                    value: `${userStats?.data.totalUsers ?? 0} (${userStats?.data.enrolledUsers ?? 0})`,
                                },
                                {
                                    label: 'New Users This Month',
                                    value:
                                        userStats?.data.newUsersThisMonth ?? 0,
                                },
                            ]}
                            progress={userStats?.data.userIncrease ?? 0}
                            color="blue"
                        />
                        <StatsCard
                            title="Course Statistics"
                            stats={[
                                {
                                    label: 'Total Courses',
                                    value: userStats?.data.totalCourses ?? 0,
                                },
                                {
                                    label: 'New Courses This Month',
                                    value:
                                        userStats?.data.newCoursesThisMonth ??
                                        0,
                                },
                            ]}
                            progress={userStats?.data.courseIncrease ?? 0}
                            color="green"
                        />
                        <StatsCard
                            title="Revenue Statistics"
                            stats={[
                                {
                                    label: 'Total Revenue',
                                    value: `$${userStats?.data.totalRevenue?.toFixed(2) ?? '0'}`,
                                },
                                {
                                    label: 'Revenue This Month',
                                    value: `$${userStats?.data.revenueThisMonth?.toFixed(2) ?? '0'}`,
                                },
                            ]}
                            progress={userStats?.data.revenueIncrease ?? 0}
                            color="yellow"
                        />
                        <StatsCard
                            title="Users by Status"
                            stats={
                                userStats?.data.usersByStatus.map((status) => ({
                                    label: status.status,
                                    value: status.count,
                                })) ?? []
                            }
                            color="red"
                        />
                    </div>
                    <IncomeExpenseReport />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <InstructorsList />
                    </div>
                    <div className="md:col-span-2">
                        <TopCoursesList />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
