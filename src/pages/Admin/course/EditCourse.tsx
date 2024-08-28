import React, { useState } from 'react';
import { message, Tabs } from 'antd';
import { Link, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/DashboardLayout';
import CourseForm from '../../../components/CourseForm';
import ModuleForm from '../../../components/ModuleForm';
import QuizForm from '../../../components/QuizForm';
import { useGetSingleCourseInfoQuery, useUpdateCourseMutation, CourseDto } from '../../../api/courseApi';

const { TabPane } = Tabs;

const EditCourse: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: courseData, isLoading } = useGetSingleCourseInfoQuery({
        id: id as string,
    });
    const [updateCourse] = useUpdateCourseMutation();
    const [activeTab, setActiveTab] = useState('1');

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
                    <Link to={`/iadmin/courses/${id}`}>{courseData?.data?.title || 'Course'}</Link> {' > '}
                    Edit
                </p>
            </div>
            <Tabs activeKey={activeTab} onChange={setActiveTab} className="bg-white rounded-lg p-4">
                <TabPane tab="Course Details" key="1">
                    <CourseForm onFinish={onFinish} initialValues={courseData?.data} submitButtonText="Update Course" />
                </TabPane>
                <TabPane tab="Module Management" key="2">
                    <ModuleForm courseId={id as string} />
                </TabPane>
                <TabPane tab="Assessment Management" key="3">
                    <QuizForm courseId={id as string} />
                </TabPane>
            </Tabs>
        </DashboardLayout>
    );
};

export default EditCourse;
