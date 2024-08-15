import React from 'react';
import { Table, Avatar, Spin } from 'antd';
import { useGetTopCoursesQuery } from '../../../api/adminApi';
import { StarFilled } from '@ant-design/icons';

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
                        <div className="font-semibold">{text}</div>
                        <div className="flex items-center text-sm text-gray-500">
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
            title: 'Enrollments',
            dataIndex: 'enrollments',
            key: 'enrollments',
            render: (enrollments: number) => (
                <span className="font-semibold">
                    {enrollments.toLocaleString()}
                </span>
            ),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (rating: number) => (
                <div className="flex items-center">
                    <StarFilled className="text-yellow-400 mr-1" />
                    <span>{rating.toFixed(1)}</span>
                </div>
            ),
        },
    ];

    if (isLoading) {
        return (
            <Spin
                size="large"
                className="flex justify-center items-center h-64"
            />
        );
    }
    if (error) return <div>Error loading top courses</div>;

    const topCourses = topCoursesData?.data || [];

    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Top Courses</h2>
            <Table
                columns={columns}
                dataSource={topCourses.map((course) => ({
                    ...course,
                    instructorImage: '', // Add the instructorImage property here
                    ...course,
                    key: course.id,
                }))}
                pagination={false}
                className="border border-gray-200 rounded-lg"
            />
        </div>
    );
};

export default TopCoursesList;
