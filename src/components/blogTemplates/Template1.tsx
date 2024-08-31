import React from 'react';
import { Typography, Image, Avatar, Divider, Space, Button, Tag } from 'antd';
import { CalendarOutlined, UserOutlined, HeartOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import { BlogDto, BlogActivityDto } from '../../api/blogApi';
import QuillContent from '../QuillContent';

const { Title, Paragraph, Text } = Typography;

interface BlogTemplate1Props {
    blog: Partial<BlogDto>;
}

const BlogTemplate1: React.FC<BlogTemplate1Props> = ({ blog }) => {
    if (!blog) return null;

    const headerImage = blog.media?.images?.[0];
    const contentImages = blog.media?.images?.slice(1) || [];

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden font-sans">
            <div className="relative h-96">
                <Image src={headerImage || '/api/placeholder/1200/600'} alt="Header" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <Title level={1} className="text-white text-4xl font-bold text-center px-4">
                        {blog.title}
                    </Title>
                </div>
            </div>

            <div className="p-8">
                <Space direction="vertical" size="large" className="w-full">
                    <Space align="center" className="w-full justify-between">
                        <Space>
                            <Avatar src={blog.author?.image} icon={<UserOutlined />} size={64} />
                            <div>
                                <Title level={4} className="mb-0">
                                    {blog.author?.name}
                                </Title>
                                <Text type="secondary" className="flex items-center">
                                    <CalendarOutlined className="mr-2" />
                                    {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
                                </Text>
                            </div>
                        </Space>
                        <Space>
                            {blog.tags?.map((tag) => (
                                <Tag key={tag} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                    {tag}
                                </Tag>
                            ))}
                        </Space>
                    </Space>

                    <Divider />

                    <div className="blog-content">
                        <QuillContent content={blog.content || ''} />
                        {contentImages.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={`Content ${index + 1}`}
                                className="w-full max-h-96 object-cover rounded-lg shadow-md my-8"
                            />
                        ))}
                    </div>

                    <Divider />

                    <Space className="w-full justify-between">
                        <Space size="large">
                            <Button type="text" icon={<HeartOutlined />}>
                                Like
                            </Button>
                            <Button type="text" icon={<MessageOutlined />}>
                                Comment
                            </Button>
                            <Button type="text" icon={<ShareAltOutlined />}>
                                Share
                            </Button>
                        </Space>
                        <Text type="secondary">{blog.activities?.length || 0} comments</Text>
                    </Space>

                    <Divider />

                    <div>
                        <Title level={4}>About the Author</Title>
                        <Paragraph>{blog.author?.bio}</Paragraph>
                    </div>

                    <Divider />

                    <div>
                        <Title level={4}>Comments</Title>
                        {blog.activities?.map((activity: BlogActivityDto) => (
                            <div key={activity.userId} className="mb-4">
                                <Space align="start">
                                    <Avatar src={activity.user.displayImage} icon={<UserOutlined />} />
                                    <div>
                                        <Text strong>{`${activity.user.firstName} ${activity.user.lastName}`}</Text>
                                        <Paragraph>{activity.comment}</Paragraph>
                                    </div>
                                </Space>
                            </div>
                        ))}
                    </div>
                </Space>
            </div>
        </div>
    );
};

export default BlogTemplate1;
