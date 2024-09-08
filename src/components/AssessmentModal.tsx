import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Radio, Space, message, Typography, Spin, Progress } from 'antd';
import { useLazyRequestQuizQuery, useGradeQuizMutation, IQuiz, IAnswer } from '../api/quizApi';
import QuillContent from './Admin/QuillContent';
import confetti from 'canvas-confetti';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface QuizModalProps {
    isVisible: boolean;
    onClose: () => void;
    courseId: string;
}

const AssessmentModal: React.FC<QuizModalProps> = ({ isVisible, onClose, courseId }) => {
    const [requestQuiz, { data: quizData, isLoading: isQuizLoading }] = useLazyRequestQuizQuery();
    const [gradeQuiz, { isLoading: isGrading }] = useGradeQuizMutation();

    const [questions, setQuestions] = useState<IQuiz[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<IAnswer[]>([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [quizResult, setQuizResult] = useState<{ grade: number; passed: boolean } | null>(null);

    useEffect(() => {
        if (isVisible && !quizStarted && !isQuizLoading) {
            handleStartQuiz();
        }
    }, [isVisible, quizStarted, isQuizLoading]);

    useEffect(() => {
        if (quizData?.data) {
            setQuestions(quizData.data);
        }
    }, [quizData]);

    const handleStartQuiz = async () => {
        await requestQuiz(courseId);
        setQuizStarted(true);
    };

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
            setQuizCompleted(true);
            setQuizResult({ grade: response.data?.grade ?? 0, passed: response.data?.passed ?? false });
            if (response.data?.passed) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
            }
        } catch (error) {
            console.error('Failed to grade quiz:', error);
            message.error('Failed to submit quiz. Please try again.');
        }
    };

    const handleClose = () => {
        setQuizStarted(false);
        setQuizCompleted(false);
        setUserAnswers([]);
        setCurrentQuestionIndex(0);
        setQuizResult(null);
        onClose();
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <Modal title="Course Quiz" open={isVisible} onCancel={handleClose} footer={null} width={800}>
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
                    <Paragraph className="text-xl mb-4">Your grade: {quizResult?.grade}%</Paragraph>
                    {!quizResult?.passed && <Paragraph className="mb-4">You may retake the quiz after reviewing the course material.</Paragraph>}
                    <Button type="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Card>
            )}
        </Modal>
    );
};

export default AssessmentModal;
