import React, { useState, useMemo } from 'react';
import { Typography, Tabs, Carousel, Spin, Row, Col } from 'antd';
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

    const enrolledCourses = useMemo(() => enrolledCoursesData?.data?.courses ?? [], [enrolledCoursesData]);
    const popularCourses = useMemo(() => popularCoursesData?.data ?? [], [popularCoursesData]);

    const inProgressCourses = useMemo(
        () => enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.Watching),
        [enrolledCourses],
    );
    const notStartedCourses = useMemo(
        () => enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.NotStarted),
        [enrolledCourses],
    );
    const completedCourses = useMemo(
        () => enrolledCourses.filter((course) => course.userCourses[0]?.status === UserCourseStatus.Completed),
        [enrolledCourses],
    );

    const courseIds = useMemo(() => enrolledCourses.slice(0, 5).map((course) => course.id), [enrolledCourses]);

    const { data: similarCoursesData, isLoading: isLoadingSimilarCourses } = useGetAllSimilarOrPopularCoursesQuery(
        { id: courseIds },
        { skip: courseIds.length === 0 },
    );

    const similarCourses = useMemo(() => similarCoursesData?.data ?? [], [similarCoursesData]);

    if (isLoadingEnrolledCourses || isLoadingPopularCourses || isLoadingSimilarCourses) {
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

                <section className="mb-12">
                    <Title level={3} className="mb-4">
                        My Courses
                    </Title>
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
                    </Tabs>
                </section>

                <section className="mb-12">
                    <Title level={3} className="mb-4">
                        Popular Courses
                    </Title>
                    <div className="overflow-x-auto whitespace-nowrap pb-4">
                        <Row gutter={16} className="flex-nowrap">
                            {popularCourses.map((course) => (
                                <Col key={course.id} className="w-64 flex-shrink-0">
                                    <CourseCard {...course} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>

                <section className="mb-12">
                    <Title level={3} className="mb-4">
                        Similar Courses
                    </Title>
                    <div className="overflow-x-auto whitespace-nowrap pb-4">
                        <Row gutter={16} className="flex-nowrap">
                            {similarCourses.map((course) => (
                                <Col key={course.id} className="w-64 flex-shrink-0">
                                    <CourseCard {...course} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </section>
            </div>
        </PublicLayout>
    );
};

export default Dashboard;
