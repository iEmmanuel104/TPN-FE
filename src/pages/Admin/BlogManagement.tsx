import React, { useState } from 'react';
import { Button, Table, Tag, Space, Modal, Form, Input, Select, message, Tabs, Image, Avatar, Card, Col, Row } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    UploadOutlined,
    CameraOutlined,
    UserOutlined,
} from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Reorder } from 'framer-motion';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';
import { useAddBlogMutation, useGetAllBlogsQuery, useUpdateBlogMutation, useDeleteBlogMutation, BlogDto, BlogStatus } from '../../api/blogApi';
import DashboardLayout from '../../components/DashboardLayout';
import BlogTemplate1 from '../../components/blogTemplates/Template1';
import BlogTemplate2 from '../../components/blogTemplates/Template2';

const { Option } = Select;
const { TabPane } = Tabs;

const BlogManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogDto | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<'template1' | 'template2'>('template1');
    const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
    const [images, setImages] = useState<string[]>([]);
    const [authorImage, setAuthorImage] = useState<string>('');

    const { data: blogsData, isLoading } = useGetAllBlogsQuery({});
    const [addBlog] = useAddBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    const { openWidget: openImageWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            if (images.length < 3) {
                setImages((prevImages) => [...prevImages, url]);
                form.setFieldsValue({ 'media.images': [...images, url] });
            }
        },
    });

    const { openWidget: openAuthorImageWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            setAuthorImage(url);
            form.setFieldsValue({ 'author.image': url });
        },
    });

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: ['author', 'name'],
            key: 'author',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: BlogStatus) => (
                <Tag color={status === BlogStatus.Published ? 'green' : status === BlogStatus.Draft ? 'gold' : 'red'}>{status}</Tag>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: unknown, record: BlogDto) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </Space>
            ),
        },
    ];

    const handleEdit = (blog: BlogDto) => {
        setEditingBlog(blog);
        setImages(blog.media?.images || []);
        setAuthorImage(blog.author?.image || '');
        form.setFieldsValue(blog);
        setIsModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBlog(id).unwrap();
            message.success('Blog deleted successfully');
        } catch (error) {
            message.error('Failed to delete blog');
        }
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            values.media = { ...values.media, images };
            values.author = { ...values.author, image: authorImage };
            if (editingBlog) {
                await updateBlog({ id: editingBlog.id, ...values }).unwrap();
                message.success('Blog updated successfully');
            } else {
                await addBlog(values).unwrap();
                message.success('Blog added successfully');
            }
            setIsModalVisible(false);
            form.resetFields();
            setEditingBlog(null);
            setImages([]);
            setAuthorImage('');
        } catch (error) {
            message.error('Failed to save blog');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingBlog(null);
        setImages([]);
        setAuthorImage('');
    };

    const handleReorderImages = (reorderedImages: string[]) => {
        setImages(reorderedImages);
        form.setFieldsValue({ 'media.images': reorderedImages });
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        form.setFieldsValue({ 'media.images': newImages });
    };

    const blogs = blogsData?.data?.blogs || [];

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Blog Management</h1>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                        Add New Blog
                    </Button>
                </div>
                <Table columns={columns} dataSource={blogs} loading={isLoading} rowKey="id" />
            </div>
            <Modal
                title={editingBlog ? 'Edit Blog' : 'Add New Blog'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={1200}
                footer={[
                    <Button key="back" onClick={handleModalCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleModalOk}>
                        Save
                    </Button>,
                ]}
            >
                <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as 'edit' | 'preview')}>
                    <TabPane tab="Edit" key="edit">
                        <Form form={form} layout="vertical">
                            <Row gutter={24}>
                                <Col span={16}>
                                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                                        <ReactQuill theme="snow" />
                                    </Form.Item>
                                    <Row>
                                        <Col span={24}>
                                            <h3 className="mb-2">Blog Images</h3>
                                            <Reorder.Group axis="y" onReorder={handleReorderImages} values={images} className="space-y-2">
                                                {images.map((image, index) => (
                                                    <Reorder.Item key={image} value={image} className="flex items-center bg-gray-100 p-2 rounded">
                                                        <Image src={image} width={100} className="mr-4" />
                                                        <Space>
                                                            <Button
                                                                icon={<ArrowUpOutlined />}
                                                                onClick={() =>
                                                                    handleReorderImages([
                                                                        ...images.slice(0, index - 1),
                                                                        images[index],
                                                                        images[index - 1],
                                                                        ...images.slice(index + 1),
                                                                    ])
                                                                }
                                                                disabled={index === 0}
                                                            />
                                                            <Button
                                                                icon={<ArrowDownOutlined />}
                                                                onClick={() =>
                                                                    handleReorderImages([
                                                                        ...images.slice(0, index),
                                                                        images[index + 1],
                                                                        images[index],
                                                                        ...images.slice(index + 2),
                                                                    ])
                                                                }
                                                                disabled={index === images.length - 1}
                                                            />
                                                            <Button danger onClick={() => handleRemoveImage(index)}>
                                                                Remove
                                                            </Button>
                                                        </Space>
                                                    </Reorder.Item>
                                                ))}
                                            </Reorder.Group>
                                            {images.length < 3 && (
                                                <Button icon={<UploadOutlined />} onClick={openImageWidget} className="mt-4">
                                                    Upload Image
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Card>
                                        <Form.Item name={['author', 'image']} valuePropName="src" noStyle>
                                            <Avatar
                                                size={64}
                                                icon={<UserOutlined />}
                                                src={authorImage}
                                                className="mb-4 cursor-pointer"
                                                onClick={openAuthorImageWidget}
                                            />
                                        </Form.Item>
                                        <div className="absolute top-0 right-0 p-2">
                                            <Button icon={<CameraOutlined />} shape="circle" size="small" onClick={openAuthorImageWidget} />
                                        </div>
                                        <Form.Item name={['author', 'name']} rules={[{ required: true }]}>
                                            <Input placeholder="Author Name" />
                                        </Form.Item>
                                        <Form.Item name={['author', 'email']} rules={[{ required: true, type: 'email' }]}>
                                            <Input placeholder="Author Email" />
                                        </Form.Item>
                                        <Form.Item name={['author', 'bio']}>
                                            <Input.TextArea placeholder="Author Bio" rows={3} />
                                        </Form.Item>
                                    </Card>
                                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                        <Select>
                                            {Object.values(BlogStatus).map((status) => (
                                                <Option key={status} value={status}>
                                                    {status}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="tags" label="Tags">
                                        <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags">
                                            <Option value="technology">Technology</Option>
                                            <Option value="design">Design</Option>
                                            <Option value="business">Business</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                    <TabPane tab="Preview" key="preview">
                        <div className="flex justify-end mb-4">
                            <Select value={selectedTemplate} onChange={(value: 'template1' | 'template2') => setSelectedTemplate(value)}>
                                <Option value="template1">Template 1</Option>
                                <Option value="template2">Template 2</Option>
                            </Select>
                        </div>
                        {selectedTemplate === 'template1' ? (
                            <BlogTemplate1
                                blog={{
                                    ...form.getFieldsValue(),
                                    media: { images },
                                    author: { ...form.getFieldValue('author'), image: authorImage },
                                }}
                            />
                        ) : (
                            <BlogTemplate2
                                blog={{
                                    ...form.getFieldsValue(),
                                    media: { images },
                                    author: { ...form.getFieldValue('author'), image: authorImage },
                                }}
                            />
                        )}
                    </TabPane>
                </Tabs>
            </Modal>
        </DashboardLayout>
    );
};

export default BlogManagement;
