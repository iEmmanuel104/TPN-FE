import React from 'react';
import { Card, Rate, Tag, Typography, Badge } from 'antd';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import { useGetAllCoursesQuery } from '../../../api/courseApi';
import { UserOutlined, ReadOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

enum CourseLevel {
    Beginner = 'Beginner',
    Intermediate = 'Intermediate',
    Advanced = 'Advanced',
    AllLevels = 'All Levels',
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
    const { data: coursesData, isLoading, error } = useGetAllCoursesQuery({});

    if (isLoading)
        return <div className="text-center py-4 text-xs">Loading...</div>;
    if (error)
        return (
            <div className="text-center py-4 text-xs text-red-500">
                Error loading courses
            </div>
        );

    const courses = coursesData?.data?.courses || [];

    const truncateDescription = (description: string, maxLength: number) => {
        if (description.length <= maxLength) return description;
        return description.slice(0, maxLength) + '...';
    };

    const getLevelColor = (level: string) => {
        return levelColors[level as CourseLevel] || 'default';
    };

    const getStatusColor = (status: string) => {
        return statusColors[status as keyof typeof statusColors] || 'default';
    };

    return (
        <DashboardLayout>
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
                <Title level={4} className="mb-2 text-sm font-semibold">
                    All Courses
                </Title>
                <Text className="text-gray-500 mb-4 block text-xs">
                    Courses {'>'} All Courses
                </Text>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <Link
                            to={`/iadmin/courses/${course.id}`}
                            key={course.id}
                        >
                            <Badge.Ribbon
                                text={course.status}
                                color={getStatusColor(course.status)}
                                className="text-xs"
                            >
                                <Card
                                    hoverable
                                    cover={
                                        <div className="relative">
                                            <img
                                                alt={course.title}
                                                src={
                                                    course.media.videoThumbnail
                                                }
                                                className="h-40 w-full object-cover"
                                            />
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
                                        <Title
                                            level={5}
                                            className="mb-1 text-xs font-semibold line-clamp-2"
                                            style={{ marginTop: 0 }}
                                        >
                                            {course.title}
                                        </Title>
                                        <Text className="text-gray-500 text-xs mb-2 h-8 overflow-hidden">
                                            {truncateDescription(
                                                course.description,
                                                60,
                                            )}
                                        </Text>
                                        <div className="flex items-center mb-2">
                                            <Rate
                                                disabled
                                                defaultValue={
                                                    course.stats.overallRating
                                                }
                                                className="text-xs mr-1"
                                            />
                                            <Text className="text-xs text-gray-500">
                                                ({course.stats.ratingCount})
                                            </Text>
                                        </div>
                                        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                            <span>
                                                <UserOutlined className="mr-1" />
                                                { course.stats.numberOfPaidStudents } students
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
                                            <Tag
                                                color={getLevelColor(
                                                    course.level,
                                                )}
                                                className="text-xs px-1 py-0"
                                            >
                                                {course.level}
                                            </Tag>
                                        </div>
                                        <div className="flex flex-wrap gap-1">
                                            {course.category
                                                .slice(0, 2)
                                                .map((cat, index) => (
                                                    <Tag
                                                        key={index}
                                                        className="text-xs px-1 py-0"
                                                    >
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
