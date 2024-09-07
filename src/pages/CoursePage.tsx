import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb, Typography, Row, Col, Button, Rate, Avatar, Card, Affix, Divider, Menu, Drawer, Spin, Collapse, List } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    TeamOutlined,
    FileTextOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    PlayCircleOutlined,
} from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseFrame from '../components/CourseFrame';
import { useGetSingleCourseInfoQuery, useGetAllSimilarOrPopularCoursesQuery } from '../api/courseApi';
import VideoPlayer from '../components/VideoPlayer';
import { formatVideoLength } from '../utils/formatVideoLength';
import CourseEnrollmentProgress from '../components/CourseEnrollmentProgress';

const { Panel } = Collapse;

const { Title, Text, Paragraph } = Typography;

interface StarRatingProps {
    rating: number;
}

const CoursePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: courseData, isLoading, isError } = useGetSingleCourseInfoQuery({ id: (id as string) ?? '' });
    const { data: similarCoursesData } = useGetAllSimilarOrPopularCoursesQuery({ id });

    const [activeSection, setActiveSection] = useState('overview');
    const [showBottomNav, setShowBottomNav] = useState(false);
    const [affixBottom, setAffixBottom] = useState<number | undefined>(undefined);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const SimilarCoursesRef = useRef<HTMLDivElement>(null);
    const overviewRef = useRef<HTMLDivElement>(null);
    const courseInfoRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsDrawerVisible(false);
    };

    const course = courseData?.data;

    const reviews = course?.reviews || [];
    const overallRating = course?.stats?.overallRating || 0;
    const ratingCount = course?.stats?.ratingCount || 0;

    const calculateRatingPercentage = (star: number) => {
        if (ratingCount === 0) return 0;
        const count = reviews.filter((review) => Math.round(review.rating) === star).length;
        return (count / ratingCount) * 100;
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'curriculum', 'instructor', 'reviews'];
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element && window.scrollY >= element.offsetTop - 100) {
                    setActiveSection(section);
                    break;
                }
            }

            if (overviewRef.current) {
                setShowBottomNav(window.scrollY > overviewRef.current.offsetTop);
            }

            if (SimilarCoursesRef.current && courseInfoRef.current && window.innerWidth >= 1024) {
                const youMayLikeTop = SimilarCoursesRef.current.offsetTop;
                const courseInfoHeight = courseInfoRef.current.offsetHeight;
                const scrollPosition = window.scrollY + window.innerHeight;

                if (scrollPosition > youMayLikeTop + courseInfoHeight) {
                    setAffixBottom(window.innerHeight - (scrollPosition - (youMayLikeTop + courseInfoHeight)));
                } else if (scrollPosition > youMayLikeTop) {
                    setAffixBottom(0);
                } else {
                    setAffixBottom(undefined);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const SectionTitle = ({ title }: { title: string }) => <h2 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">{title}</h2>;

    const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
        <Rate
            disabled
            defaultValue={rating}
            className="text-sm"
            character={(props) => {
                const index = props.index ?? 0;
                return <span style={{ color: index < Math.floor(rating) ? '#fadb14' : '#e8e8e8' }}>&#9733;</span>;
            }}
        />
    );

    const CourseInfo = () => {
        if (!courseData) return null;
        const course = courseData?.data;
        const userCourse = course?.userCourses[0];
        const totalDuration = course?.modules.reduce((acc, module) => acc + (module.videoInfo?.length || 0), 0) || 0;

        return (
            <Card className="border w-full max-w-sm mx-auto lg:mx-0">
                <div className="-mx-6 -mt-6 mb-6 border-0">
                    <img src={course?.media.videoThumbnail} alt={course?.title} className="w-full h-48 object-cover" />
                </div>
                <Text className="block text-3xl font-bold mt-4">{`${course?.currency.symbol}${course?.price}`}</Text>
                {course && <CourseEnrollmentProgress course={course} userCourse={userCourse} />}
                <Title level={4} className="mt-8 mb-4">
                    Course Features
                </Title>
                <ul className="space-y-3">
                    <li className="flex items-center">
                        <BookOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Lectures</span>
                        <span className="font-semibold">{course?.modules.length}</span>
                    </li>
                    <li className="flex items-center">
                        <FileTextOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Assessment</span>
                        <span className="font-semibold">
                            {course?.assessment?.hasAssessment === true
                                ? 'Yes'
                                : course?.assessment?.hasAssessment === false
                                  ? 'No'
                                  : 'Not specified'}
                        </span>{' '}
                    </li>
                    <li className="flex items-center">
                        <ClockCircleOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Duration</span>
                        <span className="font-semibold">{formatVideoLength(totalDuration)}</span>
                    </li>
                    <li className="flex items-center">
                        <UserOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Skill level</span>
                        <span className="font-semibold">{course?.level}</span>
                    </li>
                    <li className="flex items-center">
                        <GlobalOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Language</span>
                        <span className="font-semibold">{/* Add language to CourseDto if needed */}</span>
                    </li>
                    <li className="flex items-center">
                        <TeamOutlined className="mr-3 text-gray-500" />
                        <span className="flex-grow">Students</span>
                        <span className="font-semibold">{course?.stats.numberOfPaidStudents}</span>
                    </li>
                </ul>
            </Card>
        );
    };

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </PublicLayout>
        );
    }

    if (isError || !courseData) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Text>Error loading course data. Please try again later.</Text>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout>
            <div className="bg-white min-h-screen">
                <Breadcrumb className="container mx-auto px-4 py-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                    <Breadcrumb.Item>{course?.category[0] ?? ''}</Breadcrumb.Item>
                </Breadcrumb>

                <div className="bg-[#333333] text-white w-full py-8 lg:py-16">
                    <div className="container mx-auto px-4 lg:px-12">
                        <Row gutter={24} align="middle">
                            <Col xs={24} lg={16}>
                                <Title level={2} className="text-white mb-4 lg:mb-8" style={{ color: 'white' }}>
                                    {course?.title}
                                </Title>
                                <Paragraph className="text-gray-300 mb-6">{course?.description}</Paragraph>
                                <div className="flex flex-wrap items-center mt-6">
                                    <div className="flex items-center mr-8 mb-4">
                                        <Avatar size={48} src={course?.instructor.info.profilePictureUrl} icon={<UserOutlined />} />
                                        <div className="ml-4">
                                            <Text className="text-gray-400">Teacher</Text>
                                            <Text className="text-white block">{course?.instructor.name}</Text>
                                        </div>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4 hidden lg:block" />
                                    <div className="flex flex-col mr-8 mb-4">
                                        <Text className="text-gray-400">Categories</Text>
                                        <Text className="text-white">{course?.category.join(', ')}</Text>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4 hidden lg:block" />
                                    <div className="flex flex-col mb-4">
                                        <Text className="text-gray-400">Review</Text>
                                        <StarRating rating={overallRating} />
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} lg={8} className="lg:hidden mt-8">
                                <Button
                                    type="primary"
                                    block
                                    size="large"
                                    onClick={() => setIsDrawerVisible(true)}
                                    className="bg-purple-600 hover:bg-purple-700 border-none h-12 text-lg"
                                >
                                    View Course Details
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="container mx-auto px-4 lg:px-12 py-12 relative">
                    <Row gutter={24}>
                        <Col xs={24} lg={16}>
                            <div ref={overviewRef}>
                                <Card id="overview" className="mb-8">
                                    <SectionTitle title="OVERVIEW" />
                                    <h3 className="text-sm font-semibold mb-2">Course Description</h3>
                                    <Paragraph>{course?.description}</Paragraph>
                                    <h3 className="text-sm font-semibold pt-2 mb-2">Course Requirements</h3>
                                    <ul className="list-disc pl-5 py-2 text-gray-400">
                                        {course?.requirements.map((requirement, index) => <li key={index}>{requirement}</li>)}
                                    </ul>
                                    <h3 className="text-sm font-semibold pt-2 mb-2">Learning Outcomes</h3>
                                    <ul className="list-disc pl-5 text-gray-400">
                                        {course?.learningOutcome.map((outcome, index) => <li key={index}>{outcome}</li>)}
                                    </ul>
                                </Card>
                            </div>

                            <Card id="curriculum" className="mb-8">
                                <SectionTitle title="CURRICULUM" />
                                <Collapse accordion className="mb-4">
                                    {course?.modules
                                        .slice()
                                        .sort((a, b) => a.episodeNumber - b.episodeNumber)
                                        .map((module) => {
                                            const userCourse = course.userCourses[0];
                                            const isEnrolledAndPaid = userCourse && userCourse.paid;
                                            return (
                                                <Panel
                                                    header={
                                                        <div className="flex justify-between items-center">
                                                            <Text strong>{`Module ${module.episodeNumber}: ${module.title}`}</Text>
                                                            <Text className="text-gray-500">{formatVideoLength(module.videoInfo?.length || 0)}</Text>
                                                        </div>
                                                    }
                                                    key={module.id}
                                                >
                                                    <Paragraph className="text-sm mb-2">{module.description}</Paragraph>
                                                    {isEnrolledAndPaid && (
                                                        <VideoPlayer
                                                            url={module.url}
                                                            videoId={module.id}
                                                            moduleId={isEnrolledAndPaid ? module.id : undefined}
                                                            frames={module.frames}
                                                            className="mb-4"
                                                            initialProgress={
                                                                userCourse.progress.moduleId === module.id
                                                                    ? {
                                                                          currentTime: userCourse.progress.currentTime,
                                                                          episodeNumber: userCourse.progress.episodeNumber,
                                                                      }
                                                                    : undefined
                                                            }
                                                            onVideoWatched={(videoId) => {
                                                                // Handle video watched event if needed
                                                                console.log(`Video ${videoId} has been watched`);
                                                            }}
                                                        />
                                                    )}
                                                    <List
                                                        size="small"
                                                        dataSource={[
                                                            {
                                                                icon: <PlayCircleOutlined />,
                                                                text: 'Video Lecture',
                                                                duration: formatVideoLength(module.videoInfo?.length || 0),
                                                            },
                                                            {
                                                                icon: <FileTextOutlined />,
                                                                text: 'Reading Material',
                                                                duration: '10 mins',
                                                            },
                                                        ]}
                                                        renderItem={(item) => (
                                                            <List.Item>
                                                                <List.Item.Meta avatar={item.icon} title={item.text} description={item.duration} />
                                                            </List.Item>
                                                        )}
                                                    />
                                                </Panel>
                                            );
                                        })}
                                </Collapse>
                            </Card>

                            <Card id="instructor" className="mb-8">
                                <SectionTitle title="INSTRUCTOR" />
                                <div className="flex flex-col md:flex-row items-start">
                                    <img
                                        src={course?.instructor.info.profilePictureUrl}
                                        alt={course?.instructor.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 mb-4 md:mb-0"
                                    />
                                    <div>
                                        <Title level={4} className="mb-0">
                                            {course?.instructor.name}
                                        </Title>
                                        {/* <Text type="secondary">{course?.instructor.info.title}</Text> */}
                                        <div className="mt-2 mb-2">
                                            <TwitterOutlined className="mr-2 text-blue-400" />
                                            <LinkedinOutlined className="text-blue-800" />
                                        </div>
                                        <Paragraph className="text-gray-600">{course?.instructor.bio}</Paragraph>
                                    </div>
                                </div>
                            </Card>

                            <Card id="reviews" className="mb-8">
                                <Title level={4} className="mb-4 pb-2 border-b border-gray-200">
                                    REVIEWS
                                </Title>
                                <Row gutter={[16, 16]} className="items-stretch">
                                    <Col span={24}>
                                        <Row gutter={24}>
                                            <Col span={8}>
                                                <Text className="text-sm">Average Rating</Text>
                                            </Col>
                                            <Col span={16}>
                                                <Text className="text-sm">Detailed Rating</Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xs={24} md={8}>
                                        <div className="border p-3 h-full flex flex-col justify-center items-center">
                                            <Title level={2} className="mb-0">
                                                {overallRating.toFixed(1)}
                                            </Title>
                                            <StarRating rating={overallRating} />
                                            <Text type="secondary" className="block mt-1 text-xs">
                                                {ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'}
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <div className="border p-3 h-full">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center mb-1">
                                                    <Text className="mr-2 w-3 text-xs">{star}</Text>
                                                    <div className="w-full bg-gray-200 h-2 flex-grow">
                                                        <div
                                                            className="bg-yellow-400 h-2"
                                                            style={{
                                                                width: `${calculateRatingPercentage(star)}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <Text className="ml-2 w-8 text-right text-xs">{calculateRatingPercentage(star).toFixed(0)}%</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col xs={24} lg={8} className="relative hidden lg:block" style={{ marginTop: '-280px' }}>
                            <Affix offsetTop={80} offsetBottom={affixBottom}>
                                <div ref={courseInfoRef}>
                                    <CourseInfo />
                                </div>
                            </Affix>
                        </Col>
                    </Row>
                </div>

                <div className="container mx-auto px-4 lg:px-12 py-12 relative" ref={SimilarCoursesRef}>
                    <Row gutter={24}>
                        <Col xs={24} lg={16}>
                            <Title level={3} className="mb-6">
                                Similar Courses
                            </Title>
                            {similarCoursesData?.data && <CourseFrame courses={similarCoursesData.data} columns={3} />}
                        </Col>
                    </Row>
                </div>
            </div>

            {showBottomNav && (
                <Affix offsetBottom={0}>
                    <Menu mode="horizontal" selectedKeys={[activeSection]} className="border-t justify-start p-4">
                        <Menu.Item key="overview" onClick={() => scrollToSection('overview')}>
                            Overview
                        </Menu.Item>
                        <Menu.Item key="curriculum" onClick={() => scrollToSection('curriculum')}>
                            Curriculum
                        </Menu.Item>
                        <Menu.Item key="instructor" onClick={() => scrollToSection('instructor')}>
                            Instructor
                        </Menu.Item>
                        <Menu.Item key="reviews" onClick={() => scrollToSection('reviews')}>
                            Reviews
                        </Menu.Item>
                    </Menu>
                </Affix>
            )}

            <Drawer
                title="Course Details"
                placement="right"
                closable={true}
                onClose={() => setIsDrawerVisible(false)}
                open={isDrawerVisible}
                width={320}
            >
                <CourseInfo />
            </Drawer>
        </PublicLayout>
    );
};

export default CoursePage;
