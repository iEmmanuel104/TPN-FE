// src/components/CourseForm.tsx
import React, { useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Select,
    InputNumber,
    Upload,
    Row,
    Col,
    Card,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { CourseDto, CourseLevel } from '../api/courseApi';
import VideoPlayer from './VideoPlayer';

const { Option } = Select;
const { TextArea } = Input;

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
            initialValues={initialValues}
            className="bg-white rounded-lg p-6"
        >
            <Row gutter={16}>
                <Col span={24} md={12}>
                    <Card title="Basic Information" className="mb-4">
                        <Form.Item
                            name="title"
                            label="Course Title"
                            rules={[{ required: true }]}
                        >
                            <Input className="w-full" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true }]}
                        >
                            <TextArea rows={4} />
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
                    </Card>
                </Col>
                <Col span={24} md={12}>
                    <Card title="Course Details" className="mb-4">
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
                            name="price"
                            label="Price"
                            rules={[{ required: true }]}
                        >
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name={['currency', 'symbol']}
                                    label="Currency Symbol"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['currency', 'code']}
                                    label="Currency Code"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24} md={12}>
                    <Card title="Requirements" className="mb-4">
                        <Form.Item
                            name="requirements"
                            label="Course Requirements"
                        >
                            <Select
                                mode="tags"
                                placeholder="Add requirements"
                            />
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={24} md={12}>
                    <Card title="Media" className="mb-4">
                        <Form.Item
                            name={['media', 'videoThumbnail']}
                            label="Thumbnail"
                        >
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
                        {initialValues?.media?.previewVideo && (
                            <VideoPlayer
                                url={initialValues.media.previewVideo}
                                videoId={initialValues.id || ''}
                                className="mt-2"
                            />
                        )}
                    </Card>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CourseForm;
