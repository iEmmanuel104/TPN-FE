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
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={250} theme="light">
                <Sidebar />
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <DashboardHeader />
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="p-6 space-y-6">
                        {/* Adjust the grid layout here */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-6">
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
                                    title="Total Course"
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
                            <IncomeExpenseReport />
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
