import React, { useEffect, useState } from 'react';
import { Breadcrumb, Typography, Row, Col, Button, Rate, Avatar, Card, Affix, Divider, Menu } from 'antd';
import {
    UserOutlined,
    BookOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    TeamOutlined,
    FileTextOutlined,
    FacebookOutlined,
    TwitterOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import { courseData } from '../constants/courseData';

const { Title, Text, Paragraph } = Typography;

const CoursePage: React.FC = () => {
    const [activeSection, setActiveSection] = useState('overview');

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
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
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <PublicLayout>
            <div className="bg-white min-h-screen">
                <Breadcrumb className="container mx-auto px-4 py-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                    <Breadcrumb.Item>Language</Breadcrumb.Item>
                </Breadcrumb>

                <div className="bg-[#333333] text-white w-full py-12">
                    <div className="container mx-auto px-4">
                        <Row gutter={24}>
                            <Col xs={24} lg={16}>
                                <Title level={2} className="text-white mb-4">
                                    {courseData.title}
                                </Title>
                                <Paragraph className="text-gray-300">{courseData.description}</Paragraph>
                                <div className="flex items-center mt-8">
                                    <div className="flex items-center mr-8">
                                        <Avatar size={48} src={courseData.instructor.avatar} icon={<UserOutlined />} />
                                        <div className="ml-4">
                                            <Text className="text-white block">{courseData.instructor.name}</Text>
                                            <Text className="text-gray-400">Teacher</Text>
                                        </div>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4" />
                                    <div className="flex flex-col mr-8">
                                        <Text className="text-white">{courseData.categories.join(', ')}</Text>
                                        <Text className="text-gray-400">Categories</Text>
                                    </div>
                                    <Divider type="vertical" className="h-12 bg-gray-600 mx-4" />
                                    <div className="flex flex-col">
                                        <Rate disabled defaultValue={courseData.rating} className="text-yellow-400" />
                                        <Text className="text-gray-400">Review</Text>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12 relative">
                    <Row gutter={24}>
                        <Col xs={24} lg={16}>
                            <Card id="overview" title="OVERVIEW" className="mb-8 shadow-none border">
                                <Title level={4}>Course Description</Title>
                                <Paragraph>{courseData.description}</Paragraph>
                                <Title level={4}>Certification</Title>
                                <Paragraph>{courseData.description}</Paragraph>
                                <Title level={4}>Learning Outcomes</Title>
                                <ul className="list-disc pl-5">
                                    {courseData.outcomes.map((outcome, index) => (
                                        <li key={index}>{outcome}</li>
                                    ))}
                                </ul>
                            </Card>

                            <Card id="curriculum" title="CURRICULUM" className="mb-8 shadow-none border">
                                <Paragraph>The curriculum is empty</Paragraph>
                            </Card>

                            <Card id="instructor" title="INSTRUCTOR" className="mb-8 shadow-none border">
                                <div className="flex items-start">
                                    <Avatar size={64} src={courseData.instructor.avatar} icon={<UserOutlined />} />
                                    <div className="ml-4">
                                        <Title level={4}>{courseData.instructor.name}</Title>
                                        <Text type="secondary">{courseData.instructor.role}</Text>
                                        <div className="mt-2">
                                            <FacebookOutlined className="mr-2" />
                                            <TwitterOutlined className="mr-2" />
                                            <YoutubeOutlined />
                                        </div>
                                        <Paragraph className="mt-2">{courseData.instructor.bio}</Paragraph>
                                    </div>
                                </div>
                            </Card>

                            <Card id="reviews" title="REVIEWS" className="mb-8 shadow-none border">
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <div className="text-center">
                                            <Title level={1}>{courseData.rating}</Title>
                                            <Rate disabled defaultValue={courseData.rating} />
                                            <Text type="secondary">0 rating</Text>
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <Title level={4}>Detailed Rating</Title>
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div key={star} className="flex items-center">
                                                <Text>{star}</Text>
                                                <div className="w-full bg-gray-200 h-2 mx-2">
                                                    <div className="bg-yellow-400 h-2" style={{ width: '0%' }}></div>
                                                </div>
                                                <Text>0%</Text>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col xs={24} lg={8} className="relative" style={{ marginTop: '-120px' }}>
                            <Affix offsetTop={80}>
                                <Card className="shadow-md border-0" style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}>
                                    <div className="-mx-6 -mt-6 mb-6">
                                        <img src={courseData.image} alt={courseData.title} className="w-full h-48 object-cover" />
                                    </div>
                                    <Text className="block text-3xl font-bold mt-4">{courseData.price}</Text>
                                    <Button
                                        type="primary"
                                        block
                                        size="large"
                                        className="mt-6 bg-purple-600 hover:bg-purple-700 border-none h-12 text-lg"
                                    >
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
                            </Affix>
                        </Col>
                    </Row>
                </div>

                <div className="bg-gray-100 py-12">
                    <div className="container mx-auto px-4">
                        <Title level={3} className="mb-6">
                            YOU MAY LIKE
                        </Title>
                        <Row gutter={[24, 24]} className="max-w-4xl mx-auto">
                            {courseData.relatedCourses.map((course, index) => (
                                <Col xs={24} sm={12} md={8} key={index}>
                                    <Card
                                        cover={<img alt={course.title} src={course.image} className="h-48 object-cover" />}
                                        actions={[
                                            <span>
                                                <BookOutlined /> {course.lessons}
                                            </span>,
                                            <span>
                                                <TeamOutlined /> {course.students}
                                            </span>,
                                            <span className={course.price === 'Free' ? 'text-green-500' : 'text-blue-500'}>{course.price}</span>,
                                        ]}
                                        className="shadow-sm hover:shadow-md transition-shadow duration-300"
                                    >
                                        <Card.Meta
                                            avatar={<Avatar src={course.instructor.avatar} />}
                                            title={course.title}
                                            description={<Text>{course.instructor.name}</Text>}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>

            <Affix offsetBottom={0}>
                <Menu mode="horizontal" selectedKeys={[activeSection]} className="border-t justify-start p-8">
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
        </PublicLayout>
    );
};

export default CoursePage;