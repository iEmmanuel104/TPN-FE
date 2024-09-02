// src/pages/Admin/course/AddCourse.tsx

import React from 'react';
import { message } from 'antd';
import DashboardLayout from '../../../components/Admin/DashboardLayout';
import CourseForm from '../../../components/Admin/CourseForm';
import { useAddCourseMutation, CourseDto } from '../../../api/courseApi';
import { Link, useNavigate } from 'react-router-dom';

const AddCourse: React.FC = () => {
    const [addCourse] = useAddCourseMutation();
    const navigate = useNavigate();

    const onFinish = async (values: Partial<CourseDto>) => {
        try {
            const result = await addCourse(values).unwrap();
            message.success('Course added successfully');
            navigate(`/iadmin/courses/${result.data?.id}`);
        } catch (error) {
            message.error('Failed to add course');
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">Add New Course</h1>
                <p className="text-gray-500">
                    <Link to="/iadmin/courses">Courses</Link> {' > '}
                    Add Course
                </p>
            </div>
            <CourseForm onFinish={onFinish} submitButtonText="Add Course" />
        </DashboardLayout>
    );
};

export default AddCourse;
