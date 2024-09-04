import React from 'react';
import { Breadcrumb, Typography, Row, Col, Button, Rate, Avatar, Card, Affix, Divider } from 'antd';
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

const { Title, Text, Paragraph } = Typography;

import parenting from '../assets/parenting.jpeg';
import Instructor from '../assets/man.jpg';
import CourseImage from '../assets/hero2.jpg';

const CoursePage: React.FC = () => {
    const courseData = {
        title: 'Prenatal Yoga',
        description: 'Build and deploy a few Nodejs, MongoDB & Expressjs apps while watching to lectures by the author of 9 books on JS/Node.',
        instructor: {
            name: 'Keny White',
            avatar: Instructor,
            role: 'Professor',
            bio: 'Lorem ipsum dolor sit amet, Qui incidunt dolores non similique ducimus et debitis mollitiae. Et autem quia eum reprehenderit voluptates est reprehenderi illo est enim perferendis est neque sunt. Nam amet sunt aut vero.',
        },
        categories: ['Health & Fitness', 'Language'],
        rating: 0,
        price: 'Free',
        features: {
            lectures: 0,
            quizzes: 0,
            duration: '33 hours',
            skillLevel: 'All levels',
            language: 'English',
            students: 79,
            assessments: 'Yes',
        },
        image: CourseImage,
        outcomes: [
            'Over 37 lectures and 55.5 hours of content!',
            'LIVE PROJECT End to End Software Testing Training included.',
            'Learn Software Testing and Automation basics from a professional trainer from your own desk.',
            'Information packed practical training starting from basics to advanced testing techniques.',
            'Best suitable for beginners to advanced level users and who learn faster when demonstrated.',
            'Course content designed by considering current software testing technology and the job market.',
            'Practical assignments at the end of every session.',
            'Practical learning experience with live project work and examples.',
        ],
        relatedCourses: [
            {
                title: 'Introduction LearnPress – LMS Plugin',
                instructor: { name: 'Keny White', avatar: Instructor },
                lessons: 6,
                students: 412,
                image: parenting,
                price: 'Free',
            },
            {
                title: 'Introduction LearnPress – LMS Plugin',
                instructor: { name: 'Keny White', avatar: Instructor },
                lessons: 6,
                students: 412,
                image: parenting,
                price: 'Free',
            },
            {
                title: 'Introduction LearnPress – LMS Plugin',
                instructor: { name: 'Keny White', avatar: Instructor },
                lessons: 6,
                students: 412,
                image: parenting,
                price: 'Free',
            },
        ],
    };

    return (
        <PublicLayout>
            <div className="bg-gray-100 min-h-screen">
                <Breadcrumb className="container m-4 mx-auto px-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                    <Breadcrumb.Item>Language</Breadcrumb.Item>
                </Breadcrumb>

                <div className="bg-[#333333] text-white w-full px-12 py-8 ">
                    <Row gutter={24} className="container m-4 mx-auto px-4">
                        <Col xs={24} lg={16}>
                            <Title level={2} className="text-white mb-4">
                                {courseData.title}
                            </Title>
                            <Paragraph className="text-gray-300">{courseData.description}</Paragraph>
                            <div className="flex items-center mt-4">
                                <div className="flex flex-col items-center mr-8">
                                    <Text className="text-gray-400 mb-2">Teacher</Text>
                                    <Avatar size={48} src={courseData.instructor.avatar} icon={<UserOutlined />} />
                                    <Text className="mt-2 text-white">{courseData.instructor.name}</Text>
                                </div>
                                <Divider type="vertical" className="h-16 bg-gray-600" />
                                <div className="flex flex-col mr-8">
                                    <Text className="text-gray-400 mb-2">Categories</Text>
                                    <Text className="text-white">{courseData.categories.join(', ')}</Text>
                                </div>
                                <Divider type="vertical" className="h-16 bg-gray-600" />
                                <div className="flex flex-col">
                                    <Text className="text-gray-400 mb-2">Review</Text>
                                    <Rate disabled defaultValue={courseData.rating} className="text-yellow-400" />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="container mx-auto px-4 py-8 relative">
                    <Row gutter={24}>
                        <Col xs={24} lg={16}>
                            <Card title="OVERVIEW" className="mb-8">
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

                            <Card title="CURRICULUM" className="mb-8">
                                <Paragraph>The curriculum is empty</Paragraph>
                            </Card>

                            <Card title="INSTRUCTOR" className="mb-8">
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

                            <Card title="REVIEWS" className="mb-8">
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

                        <Col xs={24} lg={8}>
                            <Affix offsetTop={20}>
                                <Card className="mb-8 -mt-40">
                                    <img src={courseData.image} alt={courseData.title} className="w-full h-48 object-cover -t-lg mb-4" />
                                    <Text className="block text-2xl font-bold mt-4">{courseData.price}</Text>
                                    <Button type="primary" block size="large" className="mt-2 bg-purple-600 hover:bg-purple-700 border-none">
                                        START NOW
                                    </Button>
                                    <Title level={4} className="mt-4">
                                        Course Features
                                    </Title>
                                    <ul className="space-y-2">
                                        <li>
                                            <BookOutlined className="mr-2" /> Lectures: {courseData.features.lectures}
                                        </li>
                                        <li>
                                            <FileTextOutlined className="mr-2" /> Quizzes: {courseData.features.quizzes}
                                        </li>
                                        <li>
                                            <ClockCircleOutlined className="mr-2" /> Duration: {courseData.features.duration}
                                        </li>
                                        <li>
                                            <UserOutlined className="mr-2" /> Skill level: {courseData.features.skillLevel}
                                        </li>
                                        <li>
                                            <GlobalOutlined className="mr-2" /> Language: {courseData.features.language}
                                        </li>
                                        <li>
                                            <TeamOutlined className="mr-2" /> Students: {courseData.features.students}
                                        </li>
                                        <li>
                                            <FileTextOutlined className="mr-2" /> Assessments: {courseData.features.assessments}
                                        </li>
                                    </ul>
                                </Card>
                            </Affix>
                        </Col>
                    </Row>

                    <Title level={3} className="mt-8 mb-4">
                        YOU MAY LIKE
                    </Title>
                    <Row gutter={[16, 16]}>
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
                                        <span className={course.price === 'Free' ? 'text-green-500' : 'text-red-500'}>{course.price}</span>,
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={<Avatar src={courseData.instructor.avatar} />}
                                        title={course.title}
                                        description={<Text>{course.instructor.name}</Text>}
                                    />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </PublicLayout>
    );
};

export default CoursePage;
