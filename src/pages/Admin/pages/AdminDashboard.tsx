import React, { useState } from 'react';
import { Layout, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCard from '../components/StatsCard';
import IncomeExpenseReport from '../components/IncomeExpenseReport';
import InstructorsList from '../components/InstructorList';
import TopCoursesList from '../components/TopCoursesList';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);

    const toggleMobileDrawer = () => {
        setMobileDrawerVisible(!mobileDrawerVisible);
    };

    return (
        <Layout className="min-h-screen">
            <Header
                className="bg-white p-0 w-full fixed z-10 flex items-center"
                style={{ height: 'auto' }}
            >
                <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={toggleMobileDrawer}
                    className="ml-4 lg:hidden"
                />
                <DashboardHeader />
            </Header>
            <Layout style={{ marginTop: '64px' }}>
                {/* Desktop Sidebar */}
                <Sider width={250} theme="light" className="hidden lg:block">
                    <Sidebar />
                </Sider>

                {/* Mobile Drawer */}
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={toggleMobileDrawer}
                    visible={mobileDrawerVisible}
                    className="lg:hidden"
                    bodyStyle={{ padding: 0 }}
                >
                    <Sidebar />
                </Drawer>

                <Content className="m-4 lg:m-6 overflow-auto">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                title="Total Courses"
                                value="28"
                                progress={76}
                                color="red"
                            />
                            <StatsCard
                                title="Fees Collection"
                                value="25160$"
                                progress={30}
                                color="green"
                            />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <IncomeExpenseReport />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                                <InstructorsList />
                                <div className="md:col-span-2 lg:col-span-1">
                                    <TopCoursesList />
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
