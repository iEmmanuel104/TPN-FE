import React, { useState } from 'react';
import { Layout, Drawer, Button, Spin } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';
import StatsCard from '../../components/StatsCard';
import IncomeExpenseReport from '../../components/IncomeExpenseReport';
import InstructorsList from '../../components/InstructorList';
import TopCoursesList from '../../components/TopCoursesList';
import {
    useGetUserStatsQuery,
} from '../../api/adminApi';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

      const { data: userStats, isLoading: userStatsLoading } =
          useGetUserStatsQuery();



    const toggleMobileDrawer = () => {
        setMobileDrawerVisible(!mobileDrawerVisible);
    };

    if (userStatsLoading ) {
        return <Spin size="large" />;
    }

    return (
        <Layout className="min-h-screen">
            <Header
                style={{
                    background: '#fff',
                    padding: 0,
                    width: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                    height: '64px', // Explicitly set header height
                }}
            >
                <div className="flex items-center h-full">
                    <Button
                        type="text"
                        icon={<MenuOutlined />}
                        onClick={toggleMobileDrawer}
                        className="ml-4 lg:hidden"
                    />
                    <DashboardHeader />
                </div>
            </Header>
            <Layout>
                {/* Desktop Sidebar */}
                <Sider
                    width={250}
                    theme="light"
                    className="hidden lg:block"
                    style={{ marginTop: '64px' }}
                >
                    <Sidebar />
                </Sider>

                {/* Mobile Drawer */}
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={toggleMobileDrawer}
                    open={mobileDrawerVisible}
                    className="lg:hidden"
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar mobile={true} />
                </Drawer>

                <Content
                    style={{
                        marginTop: '64px',
                        padding: '24px',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
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
                                            value: userStats?.data.newUsersThisMonth ?? 0,
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
                                            value: userStats?.data.newCoursesThisMonth ?? 0,
                                        },
                                    ]}
                                    progress={
                                        userStats?.data.courseIncrease ?? 0
                                    }
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
                                    progress={
                                        userStats?.data.revenueIncrease ?? 0
                                    }
                                    color="yellow"
                                />
                                <StatsCard
                                    title="Users by Status"
                                    stats={
                                        userStats?.data.usersByStatus.map(
                                            (status) => ({
                                                label: status.status,
                                                value: status.count,
                                            }),
                                        ) ?? []
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
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
