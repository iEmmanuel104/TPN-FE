// src/components/CourseForm.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { CourseDto, CourseLevel } from '../api/courseApi';
import VideoPlayer from './VideoPlayer';
import categories from '../constants/categories.json';

const { Option } = Select;
const { TextArea } = Input;

interface CourseFormProps {
    onFinish: (values: Partial<CourseDto>) => void;
    initialValues?: Partial<CourseDto>;
    submitButtonText: string;
}

const currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
    { code: 'NGN', symbol: '₦' },
];

const CourseForm: React.FC<CourseFormProps> = ({ onFinish, initialValues, submitButtonText }) => {
    const [form] = Form.useForm<Partial<CourseDto>>();
    const [hoverThumbnail, setHoverThumbnail] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            const initialCurrency =
                currencies.find(
                    (c) => c.code === initialValues.currency?.code,
                ) || currencies[0];
            setSelectedCurrency(initialCurrency);
        }
    }, [initialValues, form]);

     const handleCurrencyChange = (value: string) => {
         const newCurrency =
             currencies.find((c) => c.code === value) || currencies[0];
         setSelectedCurrency(newCurrency);
         form.setFieldsValue({
             currency: { code: newCurrency.code, symbol: newCurrency.symbol },
         });
     };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialValues}
            className="bg-white rounded-lg p-4"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Basic Information
                        </h3>
                        <Form.Item
                            name="title"
                            label="Course Title"
                            rules={[{ required: true }]}
                        >
                            <Input />
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
                                {categories.map((category) => (
                                    <Option key={category} value={category}>
                                        {category}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Course Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
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
                                <InputNumber
                                    min={0}
                                    className="w-full"
                                    addonBefore={
                                        <Select
                                            value={selectedCurrency.code}
                                            onChange={handleCurrencyChange}
                                            style={{ width: 90 }}
                                        >
                                            {currencies.map((c) => (
                                                <Option
                                                    key={c.code}
                                                    value={c.code}
                                                >
                                                    {c.code} ({c.symbol})
                                                </Option>
                                            ))}
                                        </Select>
                                    }
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name={['currency', 'code']} hidden>
                            <Input />
                        </Form.Item>
                        <Form.Item name={['currency', 'symbol']} hidden>
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Requirements
                        </h3>
                        <Form.Item
                            name="requirements"
                            label="Course Requirements"
                        >
                            <Select
                                mode="tags"
                                placeholder="Add requirements"
                            />
                        </Form.Item>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Media</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name={['media', 'videoThumbnail']}
                                label="Thumbnail"
                            >
                                <div
                                    className="media-container h-48 w-full relative border border-dashed border-gray-300 rounded-md overflow-hidden"
                                    onMouseEnter={() => setHoverThumbnail(true)}
                                    onMouseLeave={() =>
                                        setHoverThumbnail(false)
                                    }
                                >
                                    {initialValues?.media?.videoThumbnail ? (
                                        <>
                                            <img
                                                src={
                                                    initialValues.media
                                                        .videoThumbnail
                                                }
                                                alt="Course Thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            {hoverThumbnail && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <Upload>
                                                        <Button
                                                            icon={
                                                                <EditOutlined />
                                                            }
                                                        >
                                                            Edit Thumbnail
                                                        </Button>
                                                    </Upload>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Upload>
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <UploadOutlined className="text-2xl mb-2" />
                                                <span>Upload Thumbnail</span>
                                            </div>
                                        </Upload>
                                    )}
                                </div>
                            </Form.Item>
                            <Form.Item
                                name={['media', 'previewVideo']}
                                label="Preview Video"
                            >
                                <div
                                    className="media-container h-48 w-full relative border border-dashed border-gray-300 rounded-md overflow-hidden"
                                    onMouseEnter={() => setHoverVideo(true)}
                                    onMouseLeave={() => setHoverVideo(false)}
                                >
                                    {initialValues?.media?.previewVideo ? (
                                        <>
                                            <VideoPlayer
                                                url={
                                                    initialValues.media
                                                        .previewVideo
                                                }
                                                videoId={initialValues.id || ''}
                                                className="w-full h-full"
                                            />
                                            {hoverVideo && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                    <Upload>
                                                        <Button
                                                            icon={
                                                                <EditOutlined />
                                                            }
                                                        >
                                                            Edit Video
                                                        </Button>
                                                    </Upload>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Upload>
                                            <div className="flex flex-col items-center justify-center h-full">
                                                <UploadOutlined className="text-2xl mb-2" />
                                                <span>
                                                    Upload Preview Video
                                                </span>
                                            </div>
                                        </Upload>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CourseForm;
