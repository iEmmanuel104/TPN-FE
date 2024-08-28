import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Radio, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetCourseQuizQuery, useCreateQuizMutation, useUpdateQuizMutation, IQuiz } from '../api/quizApi';

interface QuizFormProps {
    courseId: string;
}

const QuizForm: React.FC<QuizFormProps> = ({ courseId }) => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<IQuiz | null>(null);

    const { data: quizData, isLoading } = useGetCourseQuizQuery(courseId);
    const [createQuiz] = useCreateQuizMutation();
    const [updateQuiz] = useUpdateQuizMutation();

    const showModal = (question?: IQuiz) => {
        if (question) {
            setEditingQuestion(question);
            form.setFieldsValue({
                ...question,
                options: question.options.map((option) => option.text),
                answer: question.options.findIndex((option) => option.option === question.answer),
            });
        } else {
            setEditingQuestion(null);
            form.resetFields();
        }
        setIsModalVisible(true);
    };

    const questions = quizData?.data || [];

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const formattedQuestion: IQuiz = {
                ...values,
                courseId,
                options: values.options.map((text: string, index: number) => ({
                    text,
                    option: String.fromCharCode(65 + index), // Convert to A, B, C, D
                })),
                answer: String.fromCharCode(65 + values.answer),
            };

            if (editingQuestion) {
                await updateQuiz({ id: editingQuestion.id.toString(), quizData: formattedQuestion }).unwrap();
                message.success('Question updated successfully');
            } else {
                await createQuiz({ courseId, questions: [formattedQuestion] }).unwrap();
                message.success('Question added successfully');
            }
            setIsModalVisible(false);
        } catch (error) {
            console.error('Failed to save question:', error);
            message.error('Failed to save question');
        }
    };

    const columns = [
        { title: 'Question', dataIndex: 'question', key: 'question' },
        { title: 'Options', dataIndex: 'options', key: 'options', render: (options: { text: string }[]) => options.map((o) => o.text).join(', ') },
        { title: 'Answer', dataIndex: 'answer', key: 'answer' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: IQuiz) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<DeleteOutlined />} danger />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Button icon={<PlusOutlined />} onClick={() => showModal()} className="mb-4">
                Add Question
            </Button>
            <Table columns={columns} dataSource={questions} loading={isLoading} rowKey="id" />
            <Modal
                title={editingQuestion ? 'Edit Question' : 'Add Question'}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="question" label="Question" rules={[{ required: true, message: 'Please input the question!' }]}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.List name="options" initialValue={['', '', '', '']}>
                        {(fields) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item key={field.key} label={`Option ${String.fromCharCode(65 + index)}`} required={false}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[{ required: true, whitespace: true, message: 'Please input the option or delete this field.' }]}
                                            noStyle
                                        >
                                            <Input style={{ width: '80%' }} />
                                        </Form.Item>
                                    </Form.Item>
                                ))}
                            </>
                        )}
                    </Form.List>
                    <Form.Item name="answer" label="Correct Answer" rules={[{ required: true, message: 'Please select the correct answer!' }]}>
                        <Radio.Group>
                            <Radio value={0}>A</Radio>
                            <Radio value={1}>B</Radio>
                            <Radio value={2}>C</Radio>
                            <Radio value={3}>D</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuizForm;
