import React, { useState, useEffect } from 'react';
import { Card, Rate, Tag, Typography, Badge, Input, Select, Row, Col, Dropdown, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/Admin/DashboardLayout';
import { useGetAllCoursesQuery } from '../../../api/courseApi';
import { UserOutlined, ReadOutlined, SearchOutlined, FilterOutlined } from '@ant-design/icons';
import QuillContent from '../../../components/Admin/QuillContent';

const { Text, Title } = Typography;
const { Option } = Select;

enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    AllLevels = 'AllLevels',
}

const levelColors = {
    [CourseLevel.Beginner]: 'green',
    [CourseLevel.Intermediate]: 'blue',
    [CourseLevel.Advanced]: 'red',
    [CourseLevel.AllLevels]: 'purple',
};

const statusColors = {
    Published: 'green',
    New: 'orange',
    Uploaded: 'blue',
};

const CourseList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<CourseLevel | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [minRating, setMinRating] = useState<number | undefined>(undefined);
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const {
        data: coursesData,
        isLoading,
        error,
        refetch,
    } = useGetAllCoursesQuery({
        q: searchTerm,
        level: selectedLevel,
        category: selectedCategory ? [selectedCategory] : undefined,
        minRating: minRating,
    });

    useEffect(() => {
        refetch();
    }, [searchTerm, selectedLevel, selectedCategory, minRating, refetch]);

    if (isLoading) return <div className="text-center py-4 text-xs">Loading...</div>;
    if (error) return <div className="text-center py-4 text-xs text-red-500">Error loading courses</div>;

    const courses = coursesData?.data?.courses || [];

    const truncateDescription = (content: string, maxLength: number) => {
        const strippedContent = content.replace(/<[^>]+>/g, '');
        if (strippedContent.length <= maxLength) return content;
        return strippedContent.slice(0, maxLength) + '...';
    };

    const getLevelColor = (level: string) => {
        return levelColors[level as CourseLevel] || 'default';
    };

    const getStatusColor = (status: string) => {
        return statusColors[status as keyof typeof statusColors] || 'default';
    };

    const uniqueCategories = Array.from(new Set(courses.flatMap((course) => course.category)));

    const renderFilters = () => (
        <Space direction="vertical" size="small" className="w-full">
            <Select style={{ width: '100%' }} placeholder="Filter by level" allowClear onChange={(value) => setSelectedLevel(value)}>
                {Object.values(CourseLevel).map((level) => (
                    <Option key={level} value={level}>
                        {level}
                    </Option>
                ))}
            </Select>
            <Select style={{ width: '100%' }} placeholder="Filter by category" allowClear onChange={(value) => setSelectedCategory(value)}>
                {uniqueCategories.map((category) => (
                    <Option key={category} value={category}>
                        {category}
                    </Option>
                ))}
            </Select>
            <Select style={{ width: '100%' }} placeholder="Filter by rating" allowClear onChange={(value) => setMinRating(value)}>
                {[1, 2, 3, 4, 5].map((rating) => (
                    <Option key={rating} value={rating}>
                        {rating}+ Stars
                    </Option>
                ))}
            </Select>
        </Space>
    );

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
                <Title level={4} className="mb-2 text-sm font-semibold">
                    All Courses
                </Title>
                <Text className="text-gray-500 mb-4 block text-xs">Courses {'>'} All Courses</Text>
                <div className="mb-4">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8} lg={4}>
                            <Input
                                placeholder="Search courses"
                                prefix={<SearchOutlined />}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={16} lg={18}>
                            <Row gutter={[16, 16]} justify="end">
                                <Col xs={24} md={0}>
                                    <Dropdown overlay={renderFilters()} trigger={['click']} open={isFilterVisible} onOpenChange={setIsFilterVisible}>
                                        <Button icon={<FilterOutlined />} onClick={() => setIsFilterVisible(!isFilterVisible)}>
                                            Filters
                                        </Button>
                                    </Dropdown>
                                </Col>
                                <Col xs={0} md={24}>
                                    <Row gutter={[16, 16]}>
                                        <Col md={8}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="Filter by level"
                                                allowClear
                                                onChange={(value) => setSelectedLevel(value)}
                                            >
                                                {Object.values(CourseLevel).map((level) => (
                                                    <Option key={level} value={level}>
                                                        {level}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col md={8}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="Filter by category"
                                                allowClear
                                                onChange={(value) => setSelectedCategory(value)}
                                            >
                                                {uniqueCategories.map((category) => (
                                                    <Option key={category} value={category}>
                                                        {category}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        <Col md={8}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="Filter by rating"
                                                allowClear
                                                onChange={(value) => setMinRating(value)}
                                            >
                                                {[1, 2, 3, 4, 5].map((rating) => (
                                                    <Option key={rating} value={rating}>
                                                        {rating}+ Stars
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <Link to={`/iadmin/courses/${course.id}`} key={course.id}>
                            <Badge.Ribbon text={course.status} color={getStatusColor(course.status)} className="text-xs">
                                <Card
                                    hoverable
                                    cover={
                                        <div className="relative">
                                            <img alt={course.title} src={course.media.videoThumbnail} className="h-40 w-full object-cover" />
                                        </div>
                                    }
                                    className="h-full flex flex-col"
                                    bodyStyle={{
                                        padding: '8px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 'calc(100% - 128px)',
                                    }}
                                >
                                    <div className="flex-grow flex flex-col">
                                        <Title level={5} className="mb-1 text-xs font-semibold line-clamp-2" style={{ marginTop: 0 }}>
                                            {course.title}
                                        </Title>
                                        <Text className="text-gray-500 text-xs mb-2 h-8 overflow-hidden">
                                            <QuillContent content={truncateDescription(course.description, 60)} />
                                        </Text>
                                        <div className="flex items-center mb-2">
                                            <Rate disabled defaultValue={course.stats.overallRating} className="text-xs mr-1" />
                                            <Text className="text-xs text-gray-500">({course.stats.ratingCount})</Text>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                            <span>
                                                <UserOutlined className="mr-1" />
                                                {course.stats.numberOfPaidStudents} students
                                            </span>
                                            <span>
                                                <ReadOutlined className="mr-1" />
                                                {course.stats.numberOfModules} modules
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="flex justify-between items-center mb-2">
                                            <Text className="font-bold text-xs">
                                                {course.currency.symbol}
                                                {course.price}
                                            </Text>
                                            <Tag color={getLevelColor(course.level)} className="text-xs px-1 py-0">
                                                {course.level}
                                            </Tag>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {course.category.slice(0, 2).map((cat, index) => (
                                                <Tag key={index} className="text-xs px-1 py-0">
                                                    {cat}
                                                </Tag>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </Badge.Ribbon>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CourseList;
