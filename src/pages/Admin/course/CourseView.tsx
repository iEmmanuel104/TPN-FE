import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Tag, Descriptions, Divider } from 'antd';
import DashboardLayout from '../../../components/DashboardLayout';
import { useGetSingleCourseInfoQuery } from '../../../api/courseApi';

const CourseView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: courseData, isLoading, error } = useGetSingleCourseInfoQuery({ id: id as string ?? '' });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading course</div>;

    const course = courseData?.data;

    if (!course) return <div>Course not found</div>;

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-gray-500">
                    <Link to="/iadmin/courses">Courses</Link> {' > '}
                    <Link to={`/iadmin/courses/${id}`}>
                        {courseData?.data?.title || 'Course'}
                    </Link>
                    {' > '}
                    Details
                </p>{' '}
            </div>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img
                            src={course.media.videoThumbnail}
                            alt={course.title}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <Descriptions
                            title="Course Information"
                            layout="vertical"
                            bordered
                        >
                            <Descriptions.Item label="Price">
                                {course.currency.symbol}
                                {course.price}
                            </Descriptions.Item>
                            <Descriptions.Item label="Level">
                                {course.level}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {course.status}
                            </Descriptions.Item>
                        </Descriptions>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Categories:
                            </h3>
                            {course.category.map((cat, index) => (
                                <Tag
                                    key={index}
                                    color="blue"
                                    className="mr-1 mb-1"
                                >
                                    {cat}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p>{course.description}</p>
                </div>
                <Divider />
                <div>
                    <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                    <ul className="list-disc list-inside">
                        {course.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
                <Divider />
                <div className="flex justify-end">
                    <Link to={`/iadmin/courses/${id}/edit`}>
                        <Button type="primary" className="mr-2">
                            Edit Course
                        </Button>
                    </Link>
                    <Button>Delete Course</Button>
                </div>
            </Card>
        </DashboardLayout>
    );
};

export default CourseView;
