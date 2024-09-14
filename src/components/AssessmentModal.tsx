import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Card, Radio, Space, message, Typography, Spin, Progress } from 'antd';
import { useLazyRequestQuizQuery, useGradeQuizMutation, IQuiz, IAnswer } from '../api/quizApi';
import QuillContent from './Admin/QuillContent';
import confetti, { Options } from 'canvas-confetti';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserCourses } from '../state/slices/courseSlice';

const { Title, Paragraph } = Typography;

interface QuizModalProps {
    isVisible: boolean;
    onClose: () => void;
    courseId: string;
}

const AssessmentModal: React.FC<QuizModalProps> = ({ isVisible, onClose, courseId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [requestQuiz, { data: quizData, isLoading: isQuizLoading }] = useLazyRequestQuizQuery();
    const [gradeQuiz, { isLoading: isGrading }] = useGradeQuizMutation();

    const [questions, setQuestions] = useState<IQuiz[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<IAnswer[]>([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState<{ grade: number; passed: boolean } | null>(null);

    const handleStartQuiz = useCallback(async () => {
        await requestQuiz(courseId);
        setQuizStarted(true);
    }, [requestQuiz, courseId]);

    useEffect(() => {
        if (isVisible && !quizStarted && !isQuizLoading && !quizCompleted) {
            handleStartQuiz();
        }
    }, [isVisible, quizStarted, isQuizLoading, quizCompleted, handleStartQuiz]);

    useEffect(() => {
        if (quizData?.data) {
            setQuestions(quizData.data);
        }
    }, [quizData]);

    const handleAnswerChange = (questionId: number, optionId: string) => {
        setUserAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex((a) => a.questionId === questionId.toString());
            if (existingAnswerIndex > -1) {
                const newAnswers = [...prev];
                newAnswers[existingAnswerIndex] = { questionId: questionId.toString(), optionId };
                return newAnswers;
            }
            return [...prev, { questionId: questionId.toString(), optionId }];
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            handleSubmitQuiz();
        }
    };

    const handleSubmitQuiz = async () => {
        if (userAnswers.length !== questions.length) {
            message.error('Please answer all questions before submitting.');
            return;
        }

        try {
            const response = await gradeQuiz({ courseId, answers: userAnswers }).unwrap();
            if (response.data) {
                const { grade, passed, userCourse } = response.data;
                setQuizCompleted(true);
                setQuizResult({ grade, passed });

                // Update the Redux state with the new UserCourseDto
                if (userCourse) {
                    dispatch(setUserCourses([userCourse]));
                }

                if (passed || grade >= 1) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        duration: 5000, // Increased duration to 5 seconds
                    } as Options); // Add 'as Options' to specify the type
                }
            } else {
                throw new Error('No data received from gradeQuiz');
            }
        } catch (error) {
            console.error('Failed to grade quiz:', error);
            message.error('Failed to submit quiz. Please try again.');
        }
    };

    const handleClose = () => {
        setQuizStarted(false);
        setUserAnswers([]);
        setCurrentQuestionIndex(0);
        setQuizResult(null);
        setQuizCompleted(false);
        onClose();
    };

    const handleBackToCourse = () => {
        handleClose();
        navigate(0);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Modal
            title="Course Quiz"
            open={isVisible}
            onCancel={() => {}} // Prevent closing on cancel
            closable={false} // Remove the close (X) button
            maskClosable={false} // Prevent closing when clicking outside the modal
            footer={null}
            width={800}
            className="assessment-modal"
        >
            {isQuizLoading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : !quizStarted ? (
                <Card>
                    <Paragraph>You have completed watching the course. Are you ready to take the quiz?</Paragraph>
                    <Button type="primary" onClick={handleStartQuiz}>
                        Start Quiz
                    </Button>
                </Card>
            ) : !quizCompleted ? (
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Progress percent={((currentQuestionIndex + 1) / questions.length) * 100} showInfo={false} />
                    <Card title={`Question ${currentQuestionIndex + 1} of ${questions.length}`}>
                        <QuillContent content={currentQuestion.question} className="mb-4" />
                        <Radio.Group
                            onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                            value={userAnswers.find((a) => a.questionId === currentQuestion.id.toString())?.optionId}
                        >
                            <Space direction="vertical">
                                {currentQuestion.options.map((option) => (
                                    <Radio key={option.option} value={option.option}>
                                        {option.text}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                    </Card>
                    <Button
                        type="primary"
                        onClick={handleNextQuestion}
                        disabled={!userAnswers.find((a) => a.questionId === currentQuestion.id.toString())}
                        loading={isGrading}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                    </Button>
                </Space>
            ) : (
                <Card className="text-center">
                    <Title level={2} className="mb-4">
                        Quiz Results
                    </Title>
                    <div className="flex justify-center mb-4">
                        {quizResult?.passed ? (
                            <CheckCircleOutlined className="text-6xl text-green-500" />
                        ) : (
                            <CloseCircleOutlined className="text-6xl text-red-500" />
                        )}
                    </div>
                    <Title level={3} className="mb-4">
                        {quizResult?.passed ? 'Congratulations! You passed the quiz.' : 'You did not pass the quiz.'}
                    </Title>
                    <Paragraph className="text-xl mb-4">
                        Your score: {quizResult?.grade !== undefined ? `${Math.round(quizResult.grade * 100)}%` : 'N/A'}
                    </Paragraph>
                    {!quizResult?.passed && <Paragraph className="mb-4">You may retake the quiz after reviewing the course material.</Paragraph>}
                    <Button type="primary" onClick={quizResult?.passed ? handleBackToCourse : handleClose}>
                        {quizResult?.passed ? 'Back to Course' : 'Close'}
                    </Button>
                </Card>
            )}
        </Modal>
    );
};

export default AssessmentModal;
