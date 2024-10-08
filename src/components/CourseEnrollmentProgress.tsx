import React, { useCallback, useState, useEffect } from 'react';
import { Button, Progress, Typography, Badge, Modal, message, Checkbox, List, Space, Rate, Input } from 'antd';
import { FileTextOutlined, InfoCircleOutlined, StarOutlined } from '@ant-design/icons';
import { CourseDto, UserCourseDto, UserCourseStatus } from '../api/courseApi';
import { useEnrollForCourseMutation, useGenerateCourseCertificateMutation } from '../api/courseApi';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { setCurrentModule } from '../state/slices/courseSlice';
import AssessmentModal from './AssessmentModal';
import { useAddReviewMutation } from '../api/reviewApi';

const { Text, Paragraph, Title } = Typography;

interface CourseEnrollmentProgressProps {
    course: CourseDto;
    userCourse?: UserCourseDto;
    onTakeQuiz: () => void;
}

const CourseEnrollmentProgress: React.FC<CourseEnrollmentProgressProps> = ({ course, userCourse: propUserCourse, onTakeQuiz }) => {
    const dispatch = useDispatch();
    const { userCourses } = useSelector((state: RootState) => state.course);
    const { user } = useSelector((state: RootState) => state.auth);
    const stateUserCourse = userCourses.find((uc) => uc.courseId === course.id);
    const userCourse = stateUserCourse || propUserCourse;
    const [isQuizModalVisible, setIsQuizModalVisible] = useState(false);

    const [enrollForCourse] = useEnrollForCourseMutation();
    const [generateCertificate] = useGenerateCourseCertificateMutation();
    const [addReview] = useAddReviewMutation();

    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false);
    const [showEnrollConfirmation, setShowEnrollConfirmation] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewComment, setReviewComment] = useState('');

    const hasUserReviewed = course.reviews.some((review) => review.reviewerId === user?.id);

    const handleEnroll = async () => {
        if (!termsAccepted) {
            message.error('Please accept the terms and conditions to enroll.');
            return;
        }

        setIsEnrolling(true);
        try {
            const response = await enrollForCourse({ courseId: course.id }).unwrap();
            if (response.data?.url) {
                window.location.href = response.data.url;
            } else {
                message.success('Successfully enrolled in the course');
                setShowEnrollConfirmation(false);
            }
        } catch (error) {
            console.error('Failed to enroll:', error);
            message.error('Failed to enroll. Please try again.');
        } finally {
            setIsEnrolling(false);
        }
    };

    const handleRequestCertificate = async () => {
        setIsGeneratingCertificate(true);
        try {
            const response = await generateCertificate({ courseId: course.id }).unwrap();
            if (response.data && response.data.certificateUrl) {
                message.success('Certificate generated successfully!');
                window.open(response.data.certificateUrl, '_blank');
            } else {
                throw new Error('Certificate URL not received');
            }
        } catch (error) {
            console.error('Failed to generate certificate:', error);
            message.error('Failed to generate certificate. Please try again.');
        } finally {
            setIsGeneratingCertificate(false);
        }
    };

    const handleLeaveReview = () => {
        setIsReviewModalVisible(true);
    };

    const handleSubmitReview = async () => {
        try {
            await addReview({
                courseId: course.id,
                rating: reviewRating,
                comment: reviewComment,
            }).unwrap();
            message.success('Review submitted successfully!');
            setIsReviewModalVisible(false);
        } catch (error) {
            console.error('Failed to submit review:', error);
            message.error('Failed to submit review. Please try again.');
        }
    };

    const calculateProgress = useCallback((): number => {
        if (!userCourse || !userCourse.progress) return 0;

        const totalModules = course.modules.length;
        const watchedEpisodes = (userCourse.progress.episodeNumber) - 1;

        return Math.round((watchedEpisodes / totalModules) * 100);
    }, [course.modules.length, userCourse]);

    const getCurrentModuleInfo = useCallback(() => {
        if (!userCourse || !userCourse.progress) return null;

        const currentModule = course.modules.find((m) => m.id === userCourse.progress.moduleId);
        const moduleIndex = userCourse.progress.episodeNumber;

        return {
            module: currentModule,
            index: moduleIndex,
        };
    }, [course.modules, userCourse]);

    useEffect(() => {
        if (userCourse && userCourse.progress) {
            dispatch(
                setCurrentModule({
                    moduleId: userCourse.progress.moduleId,
                    episodeNumber: userCourse.progress.episodeNumber,
                }),
            );
        }
    }, [userCourse, dispatch]);

    const renderProgress = () => {
        if (!userCourse) return null;

        const progressPercent = calculateProgress();
        const currentModuleInfo = getCurrentModuleInfo();

        switch (userCourse.status) {
            case UserCourseStatus.NotStarted:
                return (
                    <>
                        <Text>Course not started</Text>
                        <Progress percent={0} />
                    </>
                );
            case UserCourseStatus.Watching:
                return (
                    <>
                        <Text>
                            In progress - Current Module {currentModuleInfo ? currentModuleInfo.index : 0}/{course.modules.length}
                        </Text>
                        <Progress percent={progressPercent} />
                    </>
                );
            case UserCourseStatus.TakingQuiz:
                return (
                    <>
                        <Text>Course completed - Quiz available</Text>
                        <Button icon={<FileTextOutlined />} onClick={onTakeQuiz}>
                            Take Quiz
                        </Button>
                    </>
                );
            case UserCourseStatus.Completed:
                return (
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Badge status="success" text="Course Completed" />
                        <Space>
                            {course.assessment.hasAssessment && (
                                <Button icon={<FileTextOutlined />} onClick={handleRequestCertificate} loading={isGeneratingCertificate}>
                                    Request Certificate
                                </Button>
                            )}
                            {!hasUserReviewed && (
                                <Button icon={<StarOutlined />} onClick={handleLeaveReview}>
                                    Leave a Review
                                </Button>
                            )}
                        </Space>
                    </Space>
                );
            default:
                return null;
        }
    };

    if (!userCourse) {
        return (
            <>
                <Button type="primary" onClick={() => setShowEnrollConfirmation(true)} className="w-full" loading={isEnrolling}>
                    {course.price > 0 ? `Enroll Now - ${course.currency.symbol}${course.price}` : 'Enroll for Free'}
                </Button>
                <Modal
                    title={<Title level={4}>Confirm Enrollment: {course.title}</Title>}
                    open={showEnrollConfirmation}
                    onOk={handleEnroll}
                    onCancel={() => setShowEnrollConfirmation(false)}
                    confirmLoading={isEnrolling}
                    okText="Enroll Now"
                    okButtonProps={{ disabled: !termsAccepted }}
                    width={600}
                >
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Paragraph>
                            You are about to enroll in <strong>{course.title}</strong>. Please review the following information before proceeding:
                        </Paragraph>

                        <List
                            header={<Title level={5}>Course Details</Title>}
                            bordered
                            dataSource={[
                                `Duration: ${course.modules.length} modules`,
                                `Level: ${course.level}`,
                                `Price: ${course.currency.symbol}${course.price}`,
                                `Instructor: ${course.instructor.name}`,
                            ]}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />

                        <Paragraph>
                            <InfoCircleOutlined /> By enrolling, you agree to:
                        </Paragraph>
                        <List
                            dataSource={[
                                'Complete all required coursework',
                                'Participate in course discussions respectfully',
                                'Not share course materials outside the platform',
                                'Adhere to the academic integrity policy',
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <Text>{item}</Text>
                                </List.Item>
                            )}
                        />

                        <Checkbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}>
                            I have read and agree to the{' '}
                            <a href="/terms" target="_blank">
                                Terms and Conditions
                            </a>{' '}
                            and{' '}
                            <a href="/privacy" target="_blank">
                                Privacy Policy
                            </a>
                        </Checkbox>
                    </Space>
                </Modal>
            </>
        );
    }

    return (
        <div className="space-y-4">
            {renderProgress()}
            <AssessmentModal isVisible={isQuizModalVisible} onClose={() => setIsQuizModalVisible(false)} courseId={course.id} />
            <Modal title="Leave a Review" visible={isReviewModalVisible} onOk={handleSubmitReview} onCancel={() => setIsReviewModalVisible(false)}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Rate allowHalf value={reviewRating} onChange={setReviewRating} />
                    <Input.TextArea
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Write your review here..."
                    />
                </Space>
            </Modal>
        </div>
    );
};

const MemoizedCourseEnrollmentProgress = React.memo(CourseEnrollmentProgress);
export default MemoizedCourseEnrollmentProgress;
