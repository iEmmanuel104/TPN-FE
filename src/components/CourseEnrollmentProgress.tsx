import React, { useState } from 'react';
import { Button, Progress, Typography, Badge } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { CourseDto, UserCourseDto, UserCourseStatus } from '../api/courseApi';
import { useEnrollForCourseMutation, useGenerateCourseCertificateMutation } from '../api/courseApi';
import { useLazyRequestQuizQuery } from '../api/quizApi';

const { Text } = Typography;

interface CourseEnrollmentProgressProps {
    course: CourseDto;
    userCourse?: UserCourseDto;
}

const CourseEnrollmentProgress: React.FC<CourseEnrollmentProgressProps> = ({ course, userCourse }) => {
    const [enrollForCourse] = useEnrollForCourseMutation();
    const [generateCertificate] = useGenerateCourseCertificateMutation();
    const [requestQuiz, { data: quizData, isLoading: isQuizLoading }] = useLazyRequestQuizQuery();
    const [isQuizRequested, setIsQuizRequested] = useState(false);

    const handleEnroll = async () => {
        try {
            const response = await enrollForCourse({ courseId: course.id }).unwrap();
            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                console.log('Enrolled in free course');
            }
        } catch (error) {
            console.error('Failed to enroll:', error);
        }
    };

    const handleRequestCertificate = async () => {
        try {
            await generateCertificate({ courseId: course.id }).unwrap();
            // Handle success (e.g., show a success message or update UI)
        } catch (error) {
            console.error('Failed to generate certificate:', error);
        }
    };

    const handleTakeQuiz = async () => {
        if (!isQuizRequested) {
            setIsQuizRequested(true);
            await requestQuiz(course.id);
        }
        // Implement quiz taking functionality
        console.log('Taking quiz', quizData);
    };

    const calculateProgress = () => {
        if (!userCourse || !userCourse.progress) return 0;

        const totalDuration = course.modules.reduce((acc, module) => acc + (module.videoInfo?.length || 0), 0);
        let watchedDuration = 0;

        for (let i = 0; i < course.modules.length; i++) {
            const module = course.modules[i];
            if (module.id === userCourse.progress.moduleId) {
                // Add the progress of the current module
                watchedDuration += userCourse.progress.currentTime;
                break;
            } else {
                // Add the full duration of completed modules
                watchedDuration += module.videoInfo?.length || 0;
            }
        }

        return Math.round((watchedDuration / totalDuration) * 100);
    };

    if (!userCourse) {
        return (
            <Button type="primary" onClick={handleEnroll} className="w-full">
                {course.price > 0 ? `Enroll Now - ${course.currency.symbol}${course.price}` : 'Enroll for Free'}
            </Button>
        );
    }

    const renderProgress = () => {
        switch (userCourse.status) {
            case UserCourseStatus.NotStarted:
                return (
                    <>
                        <Text>Course not started</Text>
                        <Progress percent={0} />
                    </>
                );
            case UserCourseStatus.Watching: {
                const progressPercent = calculateProgress();
                const currentModule = course.modules.find((m) => m.id === userCourse.progress?.moduleId);
                const moduleIndex = currentModule ? course.modules.indexOf(currentModule) : 0;
                return (
                    <>
                        <Text>
                            In progress - Module {moduleIndex + 1}/{course.modules.length}
                        </Text>
                        <Progress percent={progressPercent} />
                    </>
                );
            }
            case UserCourseStatus.TakingQuiz:
                return (
                    <>
                        <Text>Course completed - Quiz available</Text>
                        <Button icon={<FileTextOutlined />} onClick={handleTakeQuiz} loading={isQuizLoading} disabled={isQuizLoading}>
                            {isQuizRequested ? 'Continue Quiz' : 'Take Quiz'}
                        </Button>
                    </>
                );
            case UserCourseStatus.Completed:
                return (
                    <>
                        <Badge status="success" text="Course Completed" />
                        {course.assessment.hasAssessment && (
                            <Button icon={<FileTextOutlined />} onClick={handleRequestCertificate}>
                                Request Certificate
                            </Button>
                        )}
                    </>
                );
            default:
                return null;
        }
    };

    return <div className="space-y-4">{renderProgress()}</div>;
};

export default CourseEnrollmentProgress;
