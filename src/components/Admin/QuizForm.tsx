import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Radio, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useGetCourseQuizQuery, useCreateQuizMutation, useUpdateQuizMutation, useDeleteQuizMutation, IQuiz } from '../../api/quizApi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillContent from '../Admin/QuillContent';

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
    const [deleteQuiz] = useDeleteQuizMutation();

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
            form.setFieldsValue({ options: ['', ''] }); // Start with 2 options
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

    const handleDelete = async (id: number) => {
        try {
            await deleteQuiz({ id }).unwrap();
            message.success('Quiz deleted successfully');
        } catch (error) {
            console.error('Failed to delete Quiz:', error);
            message.error('Failed to delete Quiz');
        }
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
            render: (text: string) => <QuillContent content={text} />,
        },
        { title: 'Options', dataIndex: 'options', key: 'options', render: (options: { text: string }[]) => options.map((o) => o.text).join(', ') },
        { title: 'Answer', dataIndex: 'answer', key: 'answer' },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: IQuiz) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
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
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="question" label="Question" rules={[{ required: true, message: 'Please input the question!' }]}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.List
                        name="options"
                        rules={[
                            {
                                validator: async (_, options) => {
                                    if (!options || options.length < 2) {
                                        return Promise.reject(new Error('At least 2 options are required'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item required={false} key={field.key} label={`Option ${String.fromCharCode(65 + index)}`}>
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: 'Please input the option or delete this field.',
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input style={{ width: '60%' }} />
                                        </Form.Item>
                                        {fields.length > 2 && (
                                            <MinusCircleOutlined className="dynamic-delete-button ml-2" onClick={() => remove(field.name)} />
                                        )}
                                        {index === fields.length - 1 && fields.length < 4 && (
                                            <PlusCircleOutlined className="dynamic-add-button ml-2" onClick={() => add()} />
                                        )}
                                    </Form.Item>
                                ))}
                                <Form.ErrorList errors={errors} />
                            </>
                        )}
                    </Form.List>
                    <Form.Item name="answer" label="Correct Answer" rules={[{ required: true, message: 'Please select the correct answer!' }]}>
                        <Radio.Group>
                            {['A', 'B', 'C', 'D'].slice(0, form.getFieldValue('options')?.length).map((option, index) => (
                                <Radio key={option} value={index}>
                                    {option}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QuizForm;
