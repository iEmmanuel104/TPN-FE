import React from 'react';
import { Typography, Row, Col, Breadcrumb, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';

const { Title, Text } = Typography;
const { Option } = Select;

import parenting from '../assets/parenting.jpeg';
import Instructor from '../assets/man.jpg';

const CourseOverview: React.FC = () => {
    const singleCourse = {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: parenting,
        price: 'Free',
    };

    // Create an array of 9 courses by duplicating the single course
    const courses = Array(9).fill(singleCourse);

    const handleCourseClick = (courseTitle: string) => {
        console.log(`Clicked on course: ${courseTitle}`);
        // Add navigation logic here
    };

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
                </Breadcrumb>

                <Title level={1} className="mb-8">
                    Courses
                </Title>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={6}>
                        <div className=" p-6">
                            <Title level={3} className="mb-4">
                                Categories
                            </Title>
                            {[
                                'Photography & Video',
                                'Business',
                                'Design',
                                'Language',
                                'Health & Fitness',
                                'Marketing',
                                'Lifestyle',
                                'IT & Software',
                            ].map((category, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input type="checkbox" id={`category-${index}`} className="mr-2" />
                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </div>
                            ))}

                            <Title level={3} className="mt-8 mb-4">
                                Author
                            </Title>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" id="author-keny" className="mr-2" />
                                <label htmlFor="author-keny">Keny White (18)</label>
                            </div>

                            <Title level={3} className="mt-8 mb-4">
                                Price
                            </Title>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" id="price-free" className="mr-2" />
                                <label htmlFor="price-free">Free (6)</label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input type="checkbox" id="price-paid" className="mr-2" />
                                <label htmlFor="price-paid">Paid (12)</label>
                            </div>

                            <button className="bg-purple-600 text-white px-4 py-2 rounded mt-4 w-full">FILTER</button>
                            <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded mt-2 w-full">RESET</button>
                        </div>
                    </Col>

                    <Col xs={24} md={18}>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <button title="btn1" className="mr-2 bg-purple-600 text-white p-2 rounded">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" />
                                        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" />
                                        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" />
                                        <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" />
                                    </svg>
                                </button>
                                <button title="btn2" className="bg-gray-200 p-2 rounded">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                                <Text className="ml-4">Showing 1-9 of 18 results</Text>
                            </div>
                            <div className="flex items-center">
                                <Select defaultValue="newest" style={{ width: 150 }} className="mr-4">
                                    <Option value="newest">Newly published</Option>
                                    <Option value="popular">Most popular</Option>
                                    <Option value="price-low">Price: Low to High</Option>
                                    <Option value="price-high">Price: High to Low</Option>
                                </Select>
                                <Input placeholder="Search our courses" prefix={<SearchOutlined />} style={{ width: 200 }} />
                            </div>
                        </div>

                        <Row gutter={[16, 16]}>
                            {courses.map((course, index) => (
                                <Col xs={24} sm={12} lg={8} key={index}>
                                    <CourseCard onClick={() => handleCourseClick(course.title)} {...course} />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </div>
        </PublicLayout>
    );
};

export default CourseOverview;
