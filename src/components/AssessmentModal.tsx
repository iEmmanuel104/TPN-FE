// src/components/AssessmentModal.tsx

import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Radio, Space, message, Typography, Spin } from 'antd';
import { useLazyRequestQuizQuery, useGradeQuizMutation, IQuiz, IAnswer } from '../api/quizApi';
import QuillContent from './Admin/QuillContent';

const { Paragraph } = Typography;

interface QuizModalProps {
    isVisible: boolean;
    onClose: () => void;
    courseId: string;
}

const AssessmentModal: React.FC<QuizModalProps> = ({ isVisible, onClose, courseId }) => {
    const [requestQuiz, { data: quizData, isLoading: isQuizLoading }] = useLazyRequestQuizQuery();
    const [gradeQuiz, { isLoading: isGrading }] = useGradeQuizMutation();

    const [questions, setQuestions] = useState<IQuiz[]>([]);
    const [userAnswers, setUserAnswers] = useState<IAnswer[]>([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

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

    const handleSubmitQuiz = async () => {
        if (userAnswers.length !== questions.length) {
            message.error('Please answer all questions before submitting.');
            return;
        }

        try {
            const response = await gradeQuiz({ courseId, answers: userAnswers }).unwrap();
            setQuizCompleted(true);
            message.success(`Quiz completed! Your grade: ${response.data?.grade ?? 'N/A'}%`);
            if (response.data && response.data.passed) {
                message.success('Congratulations! You passed the quiz.');
            } else {
                message.warning('You did not pass the quiz. You may retake it after reviewing the course material.');
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
        onClose();
    };

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
                    {questions.map((question, index) => (
                        <Card key={question.id} title={`Question ${index + 1}`}>
                            <QuillContent content={question.question} className="mb-4" />
                            <Radio.Group
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                value={userAnswers.find((a) => a.questionId === question.id.toString())?.optionId}
                            >
                                <Space direction="vertical">
                                    {question.options.map((option) => (
                                        <Radio key={option.option} value={option.option}>
                                            {option.text}
                                        </Radio>
                                    ))}
                                </Space>
                            </Radio.Group>
                        </Card>
                    ))}
                    <Button type="primary" onClick={handleSubmitQuiz} loading={isGrading}>
                        Submit Quiz
                    </Button>
                </Space>
            ) : (
                <Card>
                    <Paragraph>You have completed the quiz. Check your results above.</Paragraph>
                    <Button type="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Card>
            )}
        </Modal>
    );
};

export default AssessmentModal;
