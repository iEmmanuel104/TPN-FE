import React, { useState, useMemo } from 'react';
import { Typography, Tabs, Carousel, Spin, Row, Col, Empty } from 'antd';
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
            <Row justify="center" className="py-4">
                <Col xs={24} sm={22} md={20} lg={18} xl={16}>
                    <Title level={2} className="mb-4 px-4">
                        Welcome back, {user?.firstName || 'User'}!
                    </Title>
                    <div className="border overflow-hidden">
                        <div className="p-4 sm:p-6 md:p-8">
                            {inProgressCourses.length > 0 && (
                                <section className="mb-12">
                                    <Title level={3} className="mb-4">
                                        Continue Learning
                                    </Title>
                                    <Carousel autoplay>
                                        {inProgressCourses.map((course) => (
                                            <div key={course.id}>
                                                <CourseCard {...course} isList={true} progress={course.userCourses[0]?.progress} />
                                            </div>
                                        ))}
                                    </Carousel>
                                </section>
                            )}

                            <section className="mb-12">
                                <Title level={3} className="mb-4">
                                    My Courses
                                </Title>
                                <Tabs activeKey={activeTab} onChange={setActiveTab}>
                                    <TabPane tab="All Courses" key="1">
                                        {enrolledCourses.length > 0 ? (
                                            <CourseFrame courses={enrolledCourses} />
                                        ) : (
                                            <Empty description="You haven't enrolled in any courses yet" />
                                        )}
                                    </TabPane>
                                    <TabPane tab="In Progress" key="2">
                                        {inProgressCourses.length > 0 ? (
                                            <CourseFrame courses={inProgressCourses} />
                                        ) : (
                                            <Empty description="You don't have any courses in progress" />
                                        )}
                                    </TabPane>
                                    <TabPane tab="Not Started" key="3">
                                        {notStartedCourses.length > 0 ? (
                                            <CourseFrame courses={notStartedCourses} />
                                        ) : (
                                            <Empty description="You don't have any courses to start" />
                                        )}
                                    </TabPane>
                                    <TabPane tab="Completed" key="4">
                                        {completedCourses.length > 0 ? (
                                            <CourseFrame courses={completedCourses} />
                                        ) : (
                                            <Empty description="You haven't completed any courses yet" />
                                        )}
                                    </TabPane>
                                </Tabs>
                            </section>

                            <section className="mb-12">
                                <Title level={3} className="mb-4">
                                    Recommended Courses
                                </Title>
                                <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
                                    {similarCourses.length > 0 ? (
                                        <Row gutter={[16, 16]} className="flex-nowrap" style={{ margin: 0 }}>
                                            {similarCourses.map((course) => (
                                                <Col key={course.id} xs={20} sm={16} md={12} lg={8} xl={6} style={{ padding: 8 }}>
                                                    <CourseCard {...course} />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <Empty description="No recommended courses available" />
                                    )}
                                </div>
                            </section>

                            <section className="mb-12">
                                <Title level={3} className="mb-4">
                                    Popular Courses
                                </Title>
                                <div className="overflow-x-auto scrollbar-hide -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8">
                                    {popularCourses.length > 0 ? (
                                        <Row gutter={[16, 16]} className="flex-nowrap" style={{ margin: 0 }}>
                                            {popularCourses.map((course) => (
                                                <Col key={course.id} xs={20} sm={16} md={12} lg={8} xl={6} style={{ padding: 8 }}>
                                                    <CourseCard {...course} />
                                                </Col>
                                            ))}
                                        </Row>
                                    ) : (
                                        <Empty description="No popular courses available" />
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>
                </Col>
            </Row>
        </PublicLayout>
    );
};

export default Dashboard;
