import React, { useState } from 'react';
import { Typography, Row, Col, Breadcrumb, Select, Input, Drawer, Button, Pagination, Radio, RadioChangeEvent } from 'antd';
import { SearchOutlined, AppstoreOutlined, UnorderedListOutlined, FilterOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';
import CourseCard from '../components/CourseCard';
import { useGetAllCoursesQuery } from '../api/courseApi';
import { CourseLevel, CourseStatus } from '../api/courseApi';
import categories from '../constants/categories.json';
import { Link } from 'react-router-dom';

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
    const pageSize = 12;

    const {
        data: coursesData,
        isLoading,
        isError,
        error,
        refetch,
    } = useGetAllCoursesQuery({
        q: searchQuery,
        level: selectedLevel,
        category: selectedCategory,
        minRating: minRating,
        status: CourseStatus.Published,
        page: currentPage,
        size: pageSize,
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleLevelChange = (e: RadioChangeEvent) => {
        const value = e.target.value;
        setSelectedLevel(value as CourseLevel);
    };

    const handleCategoryChange = (checkedValues: string[]) => {
        setSelectedCategory(checkedValues);
    };

    const handleMinRatingChange = (e: RadioChangeEvent) => {
        const value = parseInt(e.target.value, 10);
        setMinRating(value);
    };

    const applyFilters = () => {
        setIsFilterDrawerVisible(false);
        setCurrentPage(1);
        refetch();
    };

    const resetFilters = () => {
        setSelectedLevel(undefined);
        setSelectedCategory([]);
        setMinRating(undefined);
        setSearchQuery('');
        setCurrentPage(1);
        refetch();
    };

    const FilterContent = () => (
        <div>
            <Title level={3} className="mb-4">
                Level
            </Title>
            <Radio.Group onChange={handleLevelChange} value={selectedLevel} className="mb-6">
                <Radio.Button value={CourseLevel.Beginner}>Beginner</Radio.Button>
                <Radio.Button value={CourseLevel.Intermediate}>Intermediate</Radio.Button>
                <Radio.Button value={CourseLevel.Advanced}>Advanced</Radio.Button>
                <Radio.Button value={CourseLevel.AllLevels}>All Levels</Radio.Button>
            </Radio.Group>

            <Title level={3} className="mb-4">
                Minimum Rating
            </Title>
            <Radio.Group onChange={handleMinRatingChange} value={minRating} className="mb-6">
                <Radio.Button value={1}>1★</Radio.Button>
                <Radio.Button value={2}>2★</Radio.Button>
                <Radio.Button value={3}>3★</Radio.Button>
                <Radio.Button value={4}>4★</Radio.Button>
                <Radio.Button value={5}>5★</Radio.Button>
            </Radio.Group>

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

            <div className="flex flex-col mt-8 space-y-2">
                <Button className="bg-purple-600 text-white hover:bg-purple-700 w-full md:w-2/3 lg:w-1/2" onClick={applyFilters}>
                    APPLY FILTERS
                </Button>
                <Button className="border-purple-600 text-purple-600 hover:bg-purple-100 w-full md:w-2/3 lg:w-1/2" onClick={resetFilters}>
                    RESET FILTERS
                </Button>
            </div>
        </div>
    );

    if (isLoading) return <div>Loading courses...</div>;
    if (isError) return <div>Error loading courses: {error.toString()}</div>;

    const courses = coursesData?.data?.courses || [];
    const count = coursesData?.data?.count || 0;

    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>
                        <Link to="/">Home</Link>
                    </Breadcrumb.Item>
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
                                <Button icon={<FilterOutlined />} onClick={() => setIsFilterDrawerVisible(true)} className="mr-2 md:hidden">
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
                                <Text className="ml-4 hidden sm:inline">Showing {count} courses result</Text>
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
                                    <CourseCard key={course.id} {...course} isList={true} />
                                ))}
                            </div>
                        ) : (
                            <Row gutter={[16, 16]}>
                                {courses.map((course) => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                                        <CourseCard {...course} />
                                    </Col>
                                ))}
                            </Row>
                        )}

                        <div className="mt-8 flex justify-center">
                            <Pagination
                                current={currentPage}
                                total={count}
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
                open={isFilterDrawerVisible}
                width={300}
            >
                <FilterContent />
            </Drawer>
        </PublicLayout>
    );
};

export default CourseOverview;
