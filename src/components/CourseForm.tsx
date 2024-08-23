// src/components/CourseForm.tsx
import React, { useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CourseDto, CourseLevel } from '../api/courseApi';

const { Option } = Select;

interface CourseFormProps {
    onFinish: (values: Partial<CourseDto>) => void;
    initialValues?: Partial<CourseDto>;
    submitButtonText: string;
}

const CourseForm: React.FC<CourseFormProps> = ({
    onFinish,
    initialValues,
    submitButtonText,
}) => {
    const [form] = Form.useForm<Partial<CourseDto>>();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        }
    }, [initialValues, form]);

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="bg-white shadow-md rounded-lg p-6"
            initialValues={initialValues}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                    name="title"
                    label="Course Title"
                    rules={[{ required: true }]}
                >
                    <Input className="w-full" />
                </Form.Item>
                <Form.Item
                    name="level"
                    label="Course Level"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="Beginner">Beginner</Option>
                        <Option value="Intermediate">Intermediate</Option>
                        <Option value="Advanced">Advanced</Option>
                        <Option value="AllLevels">All Levels</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true }]}
                    className="col-span-2"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Categories"
                    rules={[{ required: true }]}
                >
                    <Select mode="tags" placeholder="Select categories">
                        {/* Add your category options here */}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={0} className="w-full" />
                </Form.Item>
                <Form.Item
                    name={['currency', 'symbol']}
                    label="Currency Symbol"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['currency', 'code']}
                    label="Currency Code"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="level"
                    label="Course Level"
                    rules={[{ required: true }]}
                >
                    <Select>
                        {Object.values(CourseLevel).map((level) => (
                            <Option key={level} value={level}>
                                {level}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="requirements"
                    label="Requirements"
                    className="col-span-2"
                >
                    <Select mode="tags" placeholder="Add requirements" />
                </Form.Item>
                <Form.Item name={['media', 'videoThumbnail']} label="Thumbnail">
                    <Upload>
                        <Button icon={<UploadOutlined />}>
                            Upload Thumbnail
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['media', 'previewVideo']}
                    label="Preview Video"
                >
                    <Upload>
                        <Button icon={<UploadOutlined />}>
                            Upload Preview Video
                        </Button>
                    </Upload>
                </Form.Item>
            </div>
            <Form.Item className="mt-6">
                <Button type="primary" htmlType="submit" className="w-full">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CourseForm;
