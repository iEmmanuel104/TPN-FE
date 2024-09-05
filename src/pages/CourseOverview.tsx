import React, { useState } from 'react';
import { Typography, Row, Col, Breadcrumb, Select, Input, Drawer, Button, Pagination } from 'antd';
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined, FilterOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';
import { useGetAllCoursesQuery } from '../api/courseApi';
import { CourseLevel, CourseStatus } from '../api/courseApi';
import categories from '../constants/categories.json';

const { Title, Text } = Typography;
const { Option } = Select;

const CourseOverview: React.FC = () => {
    const [isListView, setIsListView] = useState(false);
    const [isFilterDrawerVisible, setIsFilterDrawerVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const [minRating, setMinRating] = useState<number | undefined>(undefined);
    const pageSize = 9; // Number of courses per page

    const {
        data: coursesData,
        isLoading,
        isError,
        error,
    } = useGetAllCoursesQuery({
        q: searchQuery,
        level: selectedLevel,
        category: selectedCategory,
        minRating: minRating,
        status: CourseStatus.Published,
        page: currentPage,
        size: pageSize,
    });

    const handleCourseClick = (courseId: string) => {
        console.log(`Clicked on course: ${courseId}`);
        // Navigate to course detail page
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleLevelChange = (value: CourseLevel) => {
        setSelectedLevel(value);
    };

    const handleCategoryChange = (checkedValues: string[]) => {
        setSelectedCategory(checkedValues);
    };

    const handleMinRatingChange = (value: number) => {
        setMinRating(value);
    };

    const FilterContent = () => (
        <div>
            <Title level={3} className="mb-4">
                Categories
            </Title>
            {categories.slice(0, 10).map((category, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id={`category-${index}`}
                        className="mr-2"
                        value={category}
                        checked={selectedCategory.includes(category)}
                        onChange={(e) =>
                            handleCategoryChange(e.target.checked ? [...selectedCategory, category] : selectedCategory.filter((c) => c !== category))
                        }
                    />
                    <label htmlFor={`category-${index}`}>{category}</label>
                </div>
            ))}

            <Title level={3} className="mt-8 mb-4">
                Level
            </Title>
            <Select style={{ width: '60%' }} onChange={handleLevelChange} value={selectedLevel}>
                <Option value={CourseLevel.Beginner}>Beginner</Option>
                <Option value={CourseLevel.Intermediate}>Intermediate</Option>
                <Option value={CourseLevel.Advanced}>Advanced</Option>
                <Option value={CourseLevel.AllLevels}>All Levels</Option>
            </Select>

            <Title level={3} className="mt-8 mb-4">
                Minimum Rating
            </Title>
            <Select style={{ width: '60%' }} onChange={handleMinRatingChange} value={minRating}>
                <Option value={1}>1 star</Option>
                <Option value={2}>2 stars</Option>
                <Option value={3}>3 stars</Option>
                <Option value={4}>4 stars</Option>
                <Option value={5}>5 stars</Option>
            </Select>

            <button className="bg-purple-600 text-white px-4 py-2 rounded mt-4" onClick={() => setIsFilterDrawerVisible(false)}>
                APPLY FILTERS
            </button>
        </div>
    );

    if (isLoading) {
        return <div>Loading courses...</div>;
    }

    if (isError) {
        return <div>Error loading courses: {error.toString()}</div>;
    }

    const courses = coursesData?.data?.courses || [];

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
                                <Text className="ml-4 hidden sm:inline">
                                    Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize)}
                                    results
                                </Text>
                            </div>
                            <div className="flex items-center w-full sm:w-auto">
                                <Select defaultValue="newest" style={{ width: 150 }} className="mr-4 w-full sm:w-auto">
                                    <Option value="newest">Newly published</Option>
                                    <Option value="popular">Most popular</Option>
                                    <Option value="price-low">Price: Low to High</Option>
                                    <Option value="price-high">Price: High to Low</Option>
                                </Select>
                                <Input
                                    placeholder="Search our courses"
                                    prefix={<SearchOutlined />}
                                    className="w-full sm:w-auto"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        {isListView ? (
                            <div>
                                {courses.map((course) => (
                                    <CourseCard key={course.id} {...course} onClick={handleCourseClick} isList={isListView} />
                                ))}
                            </div>
                        ) : (
                            <Row gutter={[16, 16]}>
                                {courses.map((course) => (
                                    <CourseCard key={course.id} {...course} onClick={handleCourseClick} isList={isListView} />
                                ))}
                            </Row>
                        )}

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <Pagination
                                current={currentPage}
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
