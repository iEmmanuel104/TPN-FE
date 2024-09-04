import React, { useState } from 'react';
import { Typography, Row, Col, Breadcrumb, Select, Input } from 'antd';
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';

const { Title, Text } = Typography;
const { Option } = Select;

import parenting from '../assets/parenting.jpeg';
import Instructor from '../assets/man.jpg';

const CourseOverview: React.FC = () => {
    const [isListView, setIsListView] = useState(false);

    const singleCourse = {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: parenting,
        bio: 'LearnPress is a comprehensive LMS solution for WordPress.',
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
                                <button
                                    title="Grid View"
                                    onClick={() => setIsListView(false)}
                                    className={`mr-2 p-2 rounded ${!isListView ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                                >
                                    <AppstoreOutlined />
                                </button>
                                <button
                                    title="List View"
                                    onClick={() => setIsListView(true)}
                                    className={`p-2 rounded ${isListView ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
                                >
                                    <UnorderedListOutlined />
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

                        {isListView ? (
                            <div>
                                {courses.map((course, index) => (
                                    <CourseCard key={index} onClick={() => handleCourseClick(course.title)} {...course} isList={true} />
                                ))}
                            </div>
                        ) : (
                            <Row gutter={[16, 16]}>
                                {courses.map((course, index) => (
                                    <Col xs={24} sm={12} lg={8} key={index}>
                                        <CourseCard onClick={() => handleCourseClick(course.title)} {...course} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </div>
        </PublicLayout>
    );
};

export default CourseOverview;
