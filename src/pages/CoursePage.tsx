import React, { useEffect, useState, useRef } from 'react';
import { Breadcrumb, Typography, Row, Col, Button, Rate, Avatar, Card, Affix, Divider, Menu, Drawer } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    TeamOutlined,
    FileTextOutlined,
    TwitterOutlined,
    LinkedinOutlined,
} from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import { courseData } from '../constants/courseData';
import CourseFrame from '../components/CourseFrame';

const { Title, Text, Paragraph } = Typography;

const CoursePage: React.FC = () => {
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

    const CourseInfo = () => (
        <Card className="border w-full max-w-sm mx-auto lg:mx-0">
            <div className="-mx-6 -mt-6 mb-6 border-0">
                <img src={courseData.image} alt={courseData.title} className="w-full h-48 object-cover" />
            </div>
            <Text className="block text-3xl font-bold mt-4">{courseData.price}</Text>
            <Button type="primary" block size="large" className="mt-6 bg-purple-600 hover:bg-purple-700 border-none h-12 text-lg">
                START NOW
            </Button>
            <Title level={4} className="mt-8 mb-4">
                Course Features
            </Title>
            <ul className="space-y-3">
                <li className="flex items-center">
                    <BookOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Lectures</span>
                    <span className="font-semibold">{courseData.features.lectures}</span>
                </li>
                <li className="flex items-center">
                    <FileTextOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Quizzes</span>
                    <span className="font-semibold">{courseData.features.quizzes}</span>
                </li>
                <li className="flex items-center">
                    <ClockCircleOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Duration</span>
                    <span className="font-semibold">{courseData.features.duration}</span>
                </li>
                <li className="flex items-center">
                    <UserOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Skill level</span>
                    <span className="font-semibold">{courseData.features.skillLevel}</span>
                </li>
                <li className="flex items-center">
                    <GlobalOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Language</span>
                    <span className="font-semibold">{courseData.features.language}</span>
                </li>
                <li className="flex items-center">
                    <TeamOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Students</span>
                    <span className="font-semibold">{courseData.features.students}</span>
                </li>
                <li className="flex items-center">
                    <FileTextOutlined className="mr-3 text-gray-500" />
                    <span className="flex-grow">Assessments</span>
                    <span className="font-semibold">{courseData.features.assessments}</span>
                </li>
            </ul>
        </Card>
    );

    return (
        <PublicLayout>
            <div className="bg-white min-h-screen">
                <Breadcrumb className="container mx-auto px-4 py-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                    <Breadcrumb.Item>Language</Breadcrumb.Item>
                </Breadcrumb>

                <div className="bg-[#333333] text-white w-full py-12 lg:py-24">
                    <div className="container mx-auto px-4 lg:px-12">
                        <Row gutter={24} align="middle">
                            <Col xs={24} lg={16}>
                                <Title level={2} className="text-white mb-6 lg:mb-12" style={{ color: 'white' }}>
                                    {courseData.title}
                                </Title>
                                <Paragraph className="text-gray-300 mb-8">{courseData.description}</Paragraph>
                                <div className="flex flex-wrap items-center mt-8">
                                    <div className="flex items-center mr-8 mb-4">
                                        <Avatar size={48} src={courseData.instructor.avatar} icon={<UserOutlined />} />
                                        <div className="ml-4">
                                            <Text className="text-gray-400">Teacher</Text>
                                            <Text className="text-white block">{courseData.instructor.name}</Text>
                                        </div>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4 hidden lg:block" />
                                    <div className="flex flex-col mr-8 mb-4">
                                        <Text className="text-gray-400">Categories</Text>
                                        <Text className="text-white">{courseData.categories.join(', ')}</Text>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4 hidden lg:block" />
                                    <div className="flex flex-col mb-4">
                                        <Text className="text-gray-400">Review</Text>
                                        <Rate
                                            disabled
                                            defaultValue={courseData.rating}
                                            className="text-2xl"
                                            character={() => <span className="text-yellow-400">&#9734;</span>}
                                        />
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
                                    <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                                    <Paragraph>{courseData.description}</Paragraph>
                                    <h3 className="text-lg font-semibold mb-2">Certification</h3>
                                    <Paragraph>{courseData.description}</Paragraph>
                                    <h3 className="text-lg font-semibold mb-2">Learning Outcomes</h3>
                                    <ul className="list-disc pl-5 text-gray-600">
                                        {courseData.outcomes.map((outcome, index) => (
                                            <li key={index}>{outcome}</li>
                                        ))}
                                    </ul>
                                </Card>
                            </div>

                            <Card id="curriculum" className="mb-8">
                                <SectionTitle title="CURRICULUM" />
                                <Paragraph>The curriculum is empty</Paragraph>
                            </Card>

                            <Card id="instructor" className="mb-8">
                                <SectionTitle title="INSTRUCTOR" />
                                <div className="flex flex-col md:flex-row items-start">
                                    <img
                                        src={courseData.instructor.avatar}
                                        alt={courseData.instructor.name}
                                        className="w-16 h-16 rounded-full object-cover mr-4 mb-4 md:mb-0"
                                    />
                                    <div>
                                        <Title level={4} className="mb-0">
                                            {courseData.instructor.name}
                                        </Title>
                                        <Text type="secondary">{courseData.instructor.role}</Text>
                                        <div className="mt-2 mb-2">
                                            <TwitterOutlined className="mr-2 text-blue-400" />
                                            <LinkedinOutlined className="text-blue-800" />
                                        </div>
                                        <Paragraph className="text-gray-600">{courseData.instructor.bio}</Paragraph>
                                    </div>
                                </div>
                            </Card>

                            <Card id="reviews" className="mb-8">
                                <Title level={3} className="mb-4 pb-2 border-b border-gray-200">
                                    REVIEWS
                                </Title>
                                <Row gutter={[24, 24]} className="items-stretch">
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
                                        <div className="border p-4 h-full flex flex-col justify-center items-center">
                                            <Title level={1} className="mb-0 text-6xl">
                                                0
                                            </Title>
                                            <Rate
                                                disabled
                                                defaultValue={0}
                                                className="text-2xl my-2"
                                                character={() => <span className="text-yellow-400">&#9734;</span>}
                                            />
                                            <Text type="secondary" className="block mt-2">
                                                0 rating
                                            </Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} md={16}>
                                        <div className="border p-4 h-full">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center mb-4">
                                                    <Text className="mr-2 w-4">{star}</Text>
                                                    <div className="w-full bg-gray-200 h-6 flex-grow">
                                                        <div className="bg-yellow-400 h-6 w-0"></div>
                                                    </div>
                                                    <Text className="ml-2 w-8 text-right">0%</Text>
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
                            <CourseFrame courses={courseData.relatedCourses} columns={3} />
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
