import React from 'react';
import { Typography, Image, Avatar, Divider, Space, Button, Tag, Carousel } from 'antd';
import { CalendarOutlined, UserOutlined, HeartOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';
import QuillContent from '../QuillContent';
import { BlogDto } from '../../../api/blogApi';

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
            <Title level={1} className="text-center px-4 py-6 m-0">
                {blog.title}
            </Title>

            <div className="relative">
                <Image
                    src={headerImage || '/api/placeholder/1200/600'}
                    alt="Header"
                    className="w-full h-64 object-cover mb-8 rounded-lg shadow-md"
                    preview={false}
                />
            </div>

            <div className="p-6 md:p-8">
                <Space direction="vertical" size="large" className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <Space className="mb-4 md:mb-0">
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
                        <Button type="text" icon={<ShareAltOutlined />}>
                            Share
                        </Button>
                    </div>
                    <Space wrap className="my-4">
                        {blog.tags?.map((tag) => (
                            <Tag key={tag} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                                {tag}
                            </Tag>
                        ))}
                    </Space>

                    <Divider className="my-4" />

                    <div className="blog-content text-justify">
                        <QuillContent content={blog.content || ''} />
                        {contentImages.length > 0 && (
                            <div className="my-8">
                                <Carousel>
                                    {contentImages.map((image, index) => (
                                        <div key={index} className="h-64 md:h-96">
                                            <Image
                                                src={image}
                                                alt={`Content ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                                preview={false}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        )}
                    </div>

                    <Divider className="my-4" />

                    <Space className="w-full justify-between">
                        <Space size="large">
                            <Button type="text" icon={<HeartOutlined />}>
                                Like
                            </Button>
                            <Button type="text" icon={<MessageOutlined />}>
                                Comment
                            </Button>
                        </Space>
                        <Text type="secondary">{blog.activities?.length || 0} comments</Text>
                    </Space>

                    <Divider className="my-4" />

                    <div>
                        <Title level={4}>About the Author</Title>
                        <Paragraph>{blog.author?.bio}</Paragraph>
                    </div>

                    <Divider className="my-4" />

                    <div>
                        <Title level={4}>Comments</Title>
                        {blog.activities?.map((activity) => (
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
