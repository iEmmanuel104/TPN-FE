import React from 'react';
import { Table, Avatar, Spin, Tag } from 'antd';
import { useGetTopCoursesQuery } from '../api/adminApi';
import { StarFilled } from '@ant-design/icons';

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

const TopCoursesList: React.FC = () => {
    const {
        data: topCoursesData,
        isLoading,
        error,
    } = useGetTopCoursesQuery({ limit: 5 });

    const columns = [
        {
            title: 'Course',
            dataIndex: 'title',
            key: 'title',
            render: (
                text: string,
                record: {
                    previewImage: string;
                    instructorImage: string;
                    instructorName: string;
                },
            ) => (
                <div className="flex items-center">
                    <Avatar
                        src={record.previewImage}
                        size={40}
                        className="mr-3"
                        shape="square"
                    />
                    <div>
                        <div className="font-semibold text-sm">{text}</div>
                        <div className="flex items-center text-xs text-gray-500">
                            <Avatar
                                src={record.instructorImage}
                                size={20}
                                className="mr-2"
                            />
                            {record.instructorName}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
            render: (level: CourseLevel) => (
                <Tag color={levelColors[level]}>{level}</Tag>
            ),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => (
                <span className="font-semibold text-sm">
                    ${price.toFixed(2)}
                </span>
            ),
        },
        {
            title: 'Enrollments',
            dataIndex: 'enrollments',
            key: 'enrollments',
            render: (enrollments: number) => (
                <span className="font-semibold text-sm">
                    {enrollments.toLocaleString()}
                </span>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => (
                <div className="flex items-center text-sm">
                    <StarFilled className="text-yellow-400 mr-1" />
                    <span>{rating.toFixed(1)}</span>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin size="large" />
            </div>
        );
    }
    if (error)
        return <div className="text-red-500">Error loading top courses</div>;

    const topCourses = topCoursesData?.data || [];

    return (
        <div className="bg-white p-4 md:p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Top Courses</h2>
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={topCourses.map((course) => ({
                        ...course,
                        key: course.id,
                    }))}
                    pagination={false}
                    className="min-w-full text-sm"
                />
            </div>
        </div>
    );
};

export default TopCoursesList;
