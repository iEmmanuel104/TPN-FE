// src/components/CourseForm.tsx

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, InputNumber, Switch, Spin, Avatar } from 'antd';
import { UploadOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { CourseDto, CourseLevel, CourseStatus } from '../api/courseApi';
import { InstructorDto } from '../api/instructorApi';
import VideoPlayer from './VideoPlayer';
import categories from '../constants/categories.json';
import { useCloudinaryWidget } from '../hooks/useCloudinaryWidget';
import { useGetAllInstructorsQuery } from '../api/instructorApi';

const { Option } = Select;
const { TextArea } = Input;

interface CourseFormProps {
    onFinish: (values: Partial<CourseDto>) => Promise<void>;
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
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState<InstructorDto | null>(null);

    const { data: instructorsData, isLoading: isInstructorsLoading } = useGetAllInstructorsQuery();

    const { openWidget: openThumbnailWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            setThumbnailUrl(url);
            form.setFieldsValue({ media: { ...form.getFieldValue('media'), videoThumbnail: url } });
            setIsThumbnailLoading(false);
        },
        onClose: () => {
            setIsThumbnailLoading(false);
        },
    });

    const { openWidget: openVideoWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            setVideoUrl(url);
            form.setFieldsValue({ media: { ...form.getFieldValue('media'), previewVideo: url } });
            setIsVideoLoading(false);
        },
        onClose: () => {
            setIsVideoLoading(false);
        },
    });

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            const initialCurrency = currencies.find((c) => c.code === initialValues.currency?.code) || currencies[0];
            setSelectedCurrency(initialCurrency);
            setThumbnailUrl(initialValues.media?.videoThumbnail || null);
            setVideoUrl(initialValues.media?.previewVideo || null);
            setSelectedInstructor(initialValues.instructor || null);
        }
    }, [initialValues, form]);

    const handleCurrencyChange = (value: string) => {
        const newCurrency = currencies.find((c) => c.code === value) || currencies[0];
        setSelectedCurrency(newCurrency);
        form.setFieldsValue({
            currency: { code: newCurrency.code, symbol: newCurrency.symbol },
        });
    };

    const handleFinish = (values: Partial<CourseDto>) => {
        onFinish(values);
    };

    const handleOpenThumbnailWidget = () => {
        setIsThumbnailLoading(true);
        openThumbnailWidget();
    };

    const handleOpenVideoWidget = () => {
        setIsVideoLoading(true);
        openVideoWidget();
    };

    const handleInstructorChange = (value: string) => {
        const instructor = instructorsData?.data?.find((i) => i.id === value);
        setSelectedInstructor(instructor || null);
    };

    return (
        <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={initialValues} className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
                        <Form.Item name="title" label="Course Title" rules={[{ required: true, message: 'Please input the course title' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: 'Please input the course description' }]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <div className="grid grid-cols-3 gap-4">
                            <Form.Item
                                name="category"
                                label="Categories"
                                className="col-span-2"
                                rules={[
                                    { required: true, message: 'Please select at least one category' },
                                    { type: 'array', max: 5, message: 'You can select up to 5 categories' },
                                ]}
                            >
                                <Select mode="tags" placeholder="Select categories">
                                    {categories.map((category) => (
                                        <Option key={category} value={category}>
                                            {category}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="status" label="Course Status" rules={[{ required: true }]}>
                                <Select>
                                    {Object.values(CourseStatus).map((status) => (
                                        <Option key={status} value={status}>
                                            {status}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">Instructor Information</h3>
                            <Form.Item name="instructorId" label="Instructor" rules={[{ required: true, message: 'Please select an instructor' }]}>
                                <Select onChange={handleInstructorChange} loading={isInstructorsLoading}>
                                    {instructorsData?.data?.map((instructor) => (
                                        <Option key={instructor.id} value={instructor.id}>
                                            {instructor.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            {selectedInstructor && (
                                <div className="mt-4 flex items-center space-x-4">
                                    <Avatar size={64} src={selectedInstructor.info?.profilePictureUrl} icon={<UserOutlined />} />
                                    <div>
                                        <p className="font-semibold">{selectedInstructor.name}</p>
                                        <p>{selectedInstructor.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name="level" label="Course Level" rules={[{ required: true, message: 'Please select the course level' }]}>
                                <Select>
                                    {Object.values(CourseLevel).map((level) => (
                                        <Option key={level} value={level}>
                                            {level}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Please input the course price' }]}>
                                <InputNumber
                                    min={0}
                                    className="w-full"
                                    addonBefore={
                                        <Select value={selectedCurrency.code} onChange={handleCurrencyChange} style={{ width: 90 }}>
                                            {currencies.map((c) => (
                                                <Option key={c.code} value={c.code}>
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

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <Form.Item
                                name="requirements"
                                label="Course Requirements"
                                className="col-span-2"
                                rules={[{ type: 'array', max: 5, message: 'You can add up to 5 requirements' }]}
                            >
                                <Select mode="tags" placeholder="Add requirements" />
                            </Form.Item>
                            <Form.Item
                                name={['assessment', 'benchmark']}
                                label="Assessment"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0.6,
                                        max: 1,
                                        message: 'Benchmark must be between 60% and 100%',
                                    },
                                ]}
                            >
                                <InputNumber
                                    step={1}
                                    formatter={(value) => (value ? `${value}%` : '')}
                                    parser={(value) => {
                                        const parsedValue = value ? parseInt(value.replace('%', ''), 10) : 60;
                                        return isNaN(parsedValue) ? 60 : Math.max(60, Math.min(100, parsedValue));
                                    }}
                                    onChange={(value) => {
                                        if (value !== null) {
                                            const unitValue = typeof value === 'number' ? value / 100 : 0;
                                            form.setFieldsValue({
                                                assessment: {
                                                    ...form.getFieldValue('assessment'),
                                                    benchmark: unitValue,
                                                },
                                            });
                                        }
                                    }}
                                    className="w-full"
                                    addonBefore={
                                        <Form.Item name={['assessment', 'hasAssessment']} valuePropName="checked" noStyle>
                                            <Switch />
                                        </Form.Item>
                                    }
                                />
                            </Form.Item>
                            <Form.Item
                                name="learningOutcome"
                                label="Learning Outcomes"
                                className="col-span-3"
                                rules={[{ type: 'array', max: 5, message: 'You can add up to 5 learning outcomes' }]}
                            >
                                <Select mode="tags" placeholder="Add learning outcomes" />
                            </Form.Item>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Media</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item name={['media', 'videoThumbnail']} label="Thumbnail">
                                <div className="media-container h-48 w-full relative border border-dashed border-gray-300 rounded-md overflow-hidden">
                                    {thumbnailUrl ? (
                                        <>
                                            <div className="w-full h-full relative">
                                                <img
                                                    src={thumbnailUrl}
                                                    alt="Course Thumbnail"
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                <Button icon={<EditOutlined />} onClick={handleOpenThumbnailWidget} loading={isThumbnailLoading}>
                                                    {isThumbnailLoading ? 'Loading...' : 'Edit Thumbnail'}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                                            onClick={handleOpenThumbnailWidget}
                                        >
                                            <div className="text-center">
                                                {isThumbnailLoading ? (
                                                    <Spin />
                                                ) : (
                                                    <>
                                                        <UploadOutlined className="text-xl mb-2" />
                                                        <p>Upload Thumbnail</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Form.Item>
                            <Form.Item name={['media', 'previewVideo']} label="Preview Video">
                                <div className="media-container h-48 w-full relative border border-dashed border-gray-300 rounded-md overflow-hidden">
                                    {videoUrl ? (
                                        <>
                                            <VideoPlayer url={videoUrl} videoId={initialValues?.id || ''} className="w-full h-full object-cover" />
                                            <div className="absolute top-2 right-2 z-10 ">
                                                <Button
                                                    icon={<EditOutlined />}
                                                    onClick={handleOpenVideoWidget}
                                                    loading={isVideoLoading}
                                                    className="bg-black bg-opacity-50 text-white border-none hover:bg-black hover:bg-opacity-75"
                                                >
                                                    {isVideoLoading ? 'Loading...' : 'Edit Video'}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                                            onClick={handleOpenVideoWidget}
                                        >
                                            <div className="text-center">
                                                {isVideoLoading ? (
                                                    <Spin />
                                                ) : (
                                                    <>
                                                        <UploadOutlined className="text-xl mb-2" />
                                                        <p>Upload Preview Video</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
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
