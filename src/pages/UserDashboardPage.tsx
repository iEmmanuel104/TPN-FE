import React, { useState } from 'react';
import { Typography, Tabs, Carousel, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useGetAllCoursesQuery, useGetAllSimilarOrPopularCoursesQuery, UserCourseStatus } from '../api/courseApi';
import { RootState } from '../state/store';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';
import CourseFrame from '../components/CourseFrame';

const { Title } = Typography;
const { TabPane } = Tabs;

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('1');
    const { user } = useSelector((state: RootState) => state.auth);
    const { data: enrolledCoursesData, isLoading: isLoadingEnrolledCourses } = useGetAllCoursesQuery({ userId: user?.id });
    const { data: popularCoursesData, isLoading: isLoadingPopularCourses } = useGetAllSimilarOrPopularCoursesQuery({});

    const enrolledCourses = enrolledCoursesData?.data?.courses ?? [];
    const popularCourses = popularCoursesData?.data ?? [];

    const inProgressCourses = enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.Watching);
    const notStartedCourses = enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.NotStarted);
    const completedCourses = enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.Completed);

    if (isLoadingEnrolledCourses || isLoadingPopularCourses) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8">
                <Title level={2} className="mb-8">
                    Welcome back, {user?.firstName || 'User'}!
                </Title>

                <section className="mb-12">
                    <Title level={3} className="mb-4">
                        Continue Learning
                    </Title>
                    <Carousel autoplay>
                        {inProgressCourses.map((course) => (
                            <div key={course.id} className="px-4">
                                <CourseCard {...course} isList={true} progress={course.userCourses[0]?.progress} />
                            </div>
                        ))}
                    </Carousel>
                </section>

                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                    <TabPane tab="All Courses" key="1">
                        <CourseFrame courses={enrolledCourses} />
                    </TabPane>
                    <TabPane tab="In Progress" key="2">
                        <CourseFrame courses={inProgressCourses} />
                    </TabPane>
                    <TabPane tab="Not Started" key="3">
                        <CourseFrame courses={notStartedCourses} />
                    </TabPane>
                    <TabPane tab="Completed" key="4">
                        <CourseFrame courses={completedCourses} />
                    </TabPane>
                    <TabPane tab="Popular Courses" key="5">
                        <CourseFrame courses={popularCourses} />
                    </TabPane>
                </Tabs>
            </div>
        </PublicLayout>
    );
};

export default Dashboard;
