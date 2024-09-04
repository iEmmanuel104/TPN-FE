import React, { useState } from 'react';
import { Typography, Row, Col, Breadcrumb, Select, Input, Drawer, Button, Pagination } from 'antd';
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined, FilterOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';

const { Title, Text } = Typography;
const { Option } = Select;

import CourseImage from '../assets/hero2.jpg';
import Instructor from '../assets/man.jpg';

const CourseOverview: React.FC = () => {
    const [isListView, setIsListView] = useState(false);
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; // Number of courses per page

    const singleCourse = {
        title: 'Introduction LearnPress – LMS Plugin',
        instructor: { name: 'Keny White', avatar: Instructor },
        lessons: 6,
        students: 412,
        image: CourseImage,
        description:
            'This tutorial will introduce you to PHP, a server-side scripting language you can use to make dynamic websites and web applications.',
        price: 'Free',
    };

    // Create an array of 18 courses (2 pages worth)
    const allCourses = Array(18).fill(singleCourse);

    const handleCourseClick = (courseTitle: string) => {
        console.log(`Clicked on course: ${courseTitle}`);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Get current courses
    const indexOfLastCourse = currentPage * pageSize;
    const indexOfFirstCourse = indexOfLastCourse - pageSize;
    const currentCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);

    const FilterContent = () => (
        <div>
            <Title level={3} className="mb-4">
                Categories
            </Title>
            {['Photography & Video', 'Business', 'Design', 'Language', 'Health & Fitness', 'Marketing', 'Lifestyle', 'IT & Software'].map(
                (category, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input type="checkbox" id={`category-${index}`} className="mr-2" />
                        <label htmlFor={`category-${index}`}>{category}</label>
                    </div>
                ),
            )}

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
    );

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
                    <Col xs={0} md={6}>
                        <FilterContent />
                    </Col>

                    <Col xs={24} md={18}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                            <div className="flex items-center">
                                <Button icon={<FilterOutlined />} onClick={() => setIsFilterDrawerVisible(true)} className="mr-2 sm:hidden">
                                    Filter
                                </Button>
                                <Button
                                    icon={<AppstoreOutlined />}
                                    onClick={() => setIsListView(false)}
                                    type={!isListView ? 'primary' : 'default'}
                                    className="mr-2"
                                />
                                <Button
                                    icon={<UnorderedListOutlined />}
                                    onClick={() => setIsListView(true)}
                                    type={isListView ? 'primary' : 'default'}
                                />
                                <Text className="ml-4 hidden sm:inline">Showing 1-9 of 18 results</Text>
                            </div>
                            <div className="flex items-center w-full sm:w-auto">
                                <Select defaultValue="newest" style={{ width: 150 }} className="mr-4 w-full sm:w-auto">
                                    <Option value="newest">Newly published</Option>
                                    <Option value="popular">Most popular</Option>
                                    <Option value="price-low">Price: Low to High</Option>
                                    <Option value="price-high">Price: High to Low</Option>
                                </Select>
                                <Input placeholder="Search our courses" prefix={<SearchOutlined />} className="w-full sm:w-auto" />
                            </div>
                        </div>

                        {isListView ? (
                            <div>
                                {currentCourses.map((course, index) => (
                                    <CourseCard key={index} onClick={() => handleCourseClick(course.title)} {...course} isList={true} />
                                ))}
                            </div>
                        ) : (
                            <Row gutter={[16, 16]}>
                                {currentCourses.map((course, index) => (
                                    <Col xs={24} sm={12} lg={8} key={index}>
                                        <CourseCard onClick={() => handleCourseClick(course.title)} {...course} />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <Pagination
                                current={currentPage}
                                total={allCourses.length}
                                pageSize={pageSize}
                                onChange={handlePageChange}
                                showSizeChanger={false}
                                className="custom-pagination"
                            />
                        </div>
                    </Col>
                </Row>
            </div>

            <Drawer
                title="Filter Courses"
                placement="right"
                closable={true}
                onClose={() => setIsFilterDrawerVisible(false)}
                visible={isFilterDrawerVisible}
            >
                <FilterContent />
            </Drawer>
        </PublicLayout>
    );
};

export default CourseOverview;
