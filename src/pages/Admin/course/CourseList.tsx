import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import { useGetAllCoursesQuery } from '../../../api/courseApi';

const CourseList: React.FC = () => {
    const { data: coursesData, isLoading, error } = useGetAllCoursesQuery({});

    if (isLoading) return <div>Loading... </div>;
    if (error) return <div>Error loading courses</div>;

    const courses = coursesData?.data?.courses || [];

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">All Courses</h1>
                <p className="text-gray-500">Courses {'>'} All Courses</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map((course) => (
                    <Card
                        key={course.id}
                        cover={
                            <img
                                alt={course.title}
                                src={course.media.videoThumbnail}
                                className="h-48 object-cover"
                            />
                        }
                        actions={[
                            <Link to={`/iadmin/courses/${course.id}`}>
                                <Button type="primary">View Course</Button>
                            </Link>,
                        ]}
                    >
                        <Card.Meta
                            title={course.title}
                            description={
                                <div>
                                    <p className="text-sm text-gray-500 mb-2">
                                        {course.description.substring(0, 100)}
                                        ...
                                    </p>
                                    <p>
                                        Price: {course.currency.symbol}
                                        {course.price}
                                    </p>
                                    <p>Level: {course.level}</p>
                                    <div className="mt-2">
                                        {course.category.map((cat, index) => (
                                            <Tag
                                                key={index}
                                                color="blue"
                                                className="mr-1"
                                            >
                                                {cat}
                                            </Tag>
                                        ))}
                                    </div>
                                </div>
                            }
                        />
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default CourseList;
