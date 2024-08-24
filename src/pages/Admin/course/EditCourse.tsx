// src/pages/Admin/course/EditCourse.tsx
import React from 'react';
import { message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import CourseForm from '../../../components/CourseForm';
import {
    useGetSingleCourseInfoQuery,
    useUpdateCourseMutation,
    CourseDto,
} from '../../../api/courseApi';

const EditCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: courseData, isLoading } = useGetSingleCourseInfoQuery({
        id: id as string,
    });
    const [updateCourse] = useUpdateCourseMutation();

    const onFinish = async (values: Partial<CourseDto>) => {
        try {
            await updateCourse({ id: id as string, course: values }).unwrap();
            message.success('Course updated successfully');
        } catch (error) {
            message.error('Failed to update course');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Edit Course</h1>
                <p className="text-gray-500">
                    <Link to="/iadmin/courses">Courses</Link> {' > '}
                    <Link to={`/iadmin/courses/${id}`}>
                        {courseData?.data?.title || 'Course'}
                    </Link>{' '}
                    {' > '}
                    Edit
                </p>{' '}
            </div>
            <CourseForm
                onFinish={onFinish}
                initialValues={courseData?.data}
                submitButtonText="Update Course"
            />
        </DashboardLayout>
    );
};

export default EditCourse;
