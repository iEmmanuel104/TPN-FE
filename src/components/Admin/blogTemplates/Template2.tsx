import React from 'react';
import { Typography, Image, Avatar, Space, Button, Tag, Carousel, Divider } from 'antd';
import { CalendarOutlined, UserOutlined, HeartOutlined, MessageOutlined, BookOutlined, CommentOutlined } from '@ant-design/icons';
import QuillContent from '../QuillContent';
import { BlogDto } from '../../../api/blogApi';
import { RootState } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';

const { Title, Paragraph, Text } = Typography;

interface BlogTemplate2Props {
    blog: Partial<BlogDto>;
}

const BlogTemplate2: React.FC<BlogTemplate2Props> = ({ blog }) => {
        const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    if (!blog) return null;

    console.log('BlogTemplate2Props:', blog);

    const headerImage = blog.media?.images?.[0];
    const contentImages = blog.media?.images?.slice(1) || [];

    return (
        <div className="max-w-full mx-auto bg-white font-sans">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 pt-8">
                    {headerImage && (
                        <div className="mb-8 w-full">
                            <Image src={headerImage} alt="Header" className="w-full max-h-[60vh] object-cover" preview={false} />
                        </div>
                    )}
                    <Title level={1} className="text-4xl font-bold leading-tight mb-4">
                        {blog.title}
                    </Title>
                    <Space split={<Divider type="vertical" />} wrap className="items-center mb-4">
                        <Space>
                            <Avatar src={blog.author?.image} icon={<UserOutlined />} size="small" />
                            <Text>{blog.author?.name}</Text>
                        </Space>
                        <Space>
                            <CalendarOutlined />
                            <Text>
                                {blog.createdAt &&
                                    new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </Text>
                        </Space>
                        <Space>
                            <CommentOutlined />
                            <Text>
                                {blog.activities?.length || 0} Comment{blog.activities?.length !== 1 ? 's' : ''}
                            </Text>
                        </Space>
                    </Space>
                    <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags?.map((tag) => (
                            <Tag key={tag} className="m-0 text-xs bg-gray-100 text-gray-600 px-2 py-1 border">
                                {tag}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="blog-content text-lg leading-relaxed text-justify">
                    <QuillContent content={blog.content || ''} />
                </div>

                {contentImages.length > 0 && (
                    <div className="my-8">
                        <Carousel autoplay effect="fade" className="rounded-lg overflow-hidden">
                            {contentImages.map((image, index) => (
                                <div key={index} className="h-64 md:h-96">
                                    <Image src={image} alt={`Content ${index + 1}`} className="w-full h-full object-cover" preview={false} />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}

                <div className="border-t border-b py-4 my-8">
                    <Space size="large">
                        <Button type="text" icon={<HeartOutlined />} className="text-gray-600 hover:text-red-500">
                            Like
                        </Button>
                        <Button type="text" icon={<MessageOutlined />} className="text-gray-600">
                            Comment
                        </Button>
                        <Button type="text" icon={<BookOutlined />} className="text-gray-600">
                            Save
                        </Button>
                    </Space>
                </div>

                <div className="my-8">
                    <Title level={4}>About the Author</Title>
                    <Space align="start">
                        <Avatar src={blog.author?.image} icon={<UserOutlined />} size={64} />
                        <div>
                            <Text strong className="text-lg">
                                {blog.author?.name}
                            </Text>
                            <Paragraph className="text-gray-600">{blog.author?.bio}</Paragraph>
                        </div>
                    </Space>
                </div>

                <div className="my-8">
                    <Title level={4}>Comments</Title>
                    {blog.activities?.map((activity) => (
                        <div key={activity.userId} className="mb-6">
                            <Space align="start">
                                <Avatar src={activity.user.displayImage} icon={<UserOutlined />} />
                                <div>
                                    <Text strong>{`${activity.user.firstName} ${activity.user.lastName}`}</Text>
                                    <Paragraph className="text-gray-600">{activity.comment}</Paragraph>
                                </div>
                            </Space>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogTemplate2;
