import React, { useState } from 'react';
import { Button, Table, Tag, Space, Modal, Form, Input, Select, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { useCloudinaryWidget } from '../../hooks/useCloudinaryWidget';
import { useAddBlogMutation, useGetAllBlogsQuery, useUpdateBlogMutation, useDeleteBlogMutation, BlogDto, BlogStatus } from '../../api/blogApi';
import DashboardLayout from '../../components/DashboardLayout';

const { Option } = Select;

const BlogManagement: React.FC = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState<BlogDto | null>(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<'template1' | 'template2'>('template1');

    const { data: blogsData, isLoading } = useGetAllBlogsQuery({});
    const [addBlog] = useAddBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [deleteBlog] = useDeleteBlogMutation();

    const { openWidget: openImageWidget } = useCloudinaryWidget({
        onSuccess: (url) => {
            form.setFieldsValue({ 'media.images': [...(form.getFieldValue('media.images') || []), url] });
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
                    <Button icon={<EyeOutlined />} onClick={() => handlePreview(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </Space>
            ),
        },
    ];

    const handlePreview = (blog: BlogDto) => {
        setEditingBlog(blog);
        setPreviewVisible(true);
    };

    const handleEdit = (blog: BlogDto) => {
        setEditingBlog(blog);
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
        } catch (error) {
            message.error('Failed to save blog');
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setEditingBlog(null);
    };

    const blogs = blogsData?.data || { blogs: [] };

    return (
        <DashboardLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Blog Management</h1>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
                        Add New Blog
                    </Button>
                </div>
                <Table columns={columns} dataSource={blogs.blogs} loading={isLoading} rowKey="id" />
            </div>

            <Modal
                title={editingBlog ? 'Edit Blog' : 'Add New Blog'}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                width={800}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                        <ReactQuill theme="snow" />
                    </Form.Item>
                    <Form.Item name={['author', 'name']} label="Author Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['author', 'email']} label="Author Email" rules={[{ required: true, type: 'email' }]}>
                        <Input />
                    </Form.Item>
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
                    <Form.Item label="Images">
                        <Button onClick={openImageWidget}>Upload Image</Button>
                        <Form.Item name={['media', 'images']} noStyle>
                            <Input type="hidden" />
                        </Form.Item>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Blog Preview" visible={previewVisible} onCancel={() => setPreviewVisible(false)} footer={null} width={800}>
                <div className="flex justify-end mb-4">
                    <Select value={selectedTemplate} onChange={(value: 'template1' | 'template2') => setSelectedTemplate(value)}>
                        <Option value="template1">Template 1</Option>
                        <Option value="template2">Template 2</Option>
                    </Select>
                </div>
                {selectedTemplate === 'template1' ? <BlogTemplate1 blog={editingBlog} /> : <BlogTemplate2 blog={editingBlog} />}
            </Modal>
        </DashboardLayout>
    );
};

const BlogTemplate1: React.FC<{ blog: BlogDto | null }> = ({ blog }) => {
    if (!blog) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <div className="mb-4 text-gray-600">
                <span>By {blog.author.name}</span> | <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            {blog.media?.images && blog.media.images.length > 0 && (
                <img src={blog.media.images[0]} alt={blog.title} className="w-full h-64 object-cover mb-4 rounded" />
            )}
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className="mt-4">{blog.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        </motion.div>
    );
};

const BlogTemplate2: React.FC<{ blog: BlogDto | null }> = ({ blog }) => {
    if (!blog) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
            <div className="bg-gray-100 p-8 rounded-lg">
                <h1 className="text-4xl font-bold mb-6 text-center">{blog.title}</h1>
                <div className="flex justify-center items-center mb-6 text-gray-600">
                    <img src={blog.author.image || 'https://via.placeholder.com/40'} alt={blog.author.name} className="w-10 h-10 rounded-full mr-3" />
                    <span>{blog.author.name}</span>
                    <span className="mx-2">|</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                {blog.media?.images && blog.media.images.length > 0 && (
                    <img src={blog.media.images[0]} alt={blog.title} className="w-full h-96 object-cover mb-6 rounded" />
                )}
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                <div className="mt-6 flex flex-wrap justify-center">
                    {blog.tags?.map((tag) => (
                        <Tag key={tag} className="mr-2 mb-2 px-3 py-1 text-sm">
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogManagement;
