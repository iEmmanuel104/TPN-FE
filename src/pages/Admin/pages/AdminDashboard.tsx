import React from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsCard from '../components/StatsCard';
import IncomeExpenseReport from '../components/IncomeExpenseReport';
import ProfessorsList from '../components/ProfessorList';
import StudentList from '../components/StudentList';

const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
    return (
        <Layout className="min-h-screen">
            <Header
                style={{
                    background: '#fff',
                    padding: 0,
                    width: '100%',
                    position: 'fixed',
                    zIndex: 1000,
                }}
            >
                <DashboardHeader />
            </Header>
            <Layout style={{ marginTop: '64px' }}>
                {' '}
                {/* This margin-top ensures the sidebar starts below the header */}
                <Sider width={250} theme="light">
                    <Sidebar />
                </Sider>
                <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="grid grid-cols-2 gap-6">
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
                            <div>
                                <IncomeExpenseReport />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <ProfessorsList />
                            <StudentList />
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;
