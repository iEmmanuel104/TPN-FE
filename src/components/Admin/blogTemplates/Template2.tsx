import React, { useState } from 'react';
import { Typography, Image, Avatar, Space, Button, Tag, Carousel, Divider, Input, message } from 'antd';
import {
    CalendarOutlined,
    UserOutlined,
    HeartOutlined,
    MessageOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    CommentOutlined,
} from '@ant-design/icons';
import QuillContent from '../QuillContent';
import { BlogDto, useEngageWithBlogMutation } from '../../../api/blogApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../state/store';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

interface BlogTemplate2Props {
    blog: Partial<BlogDto> & { userHasCommented?: boolean };
}

const BlogTemplate2: React.FC<BlogTemplate2Props> = ({ blog }) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const [engageWithBlog] = useEngageWithBlogMutation();
    const [comment, setComment] = useState('');
    const [isCommentSectionVisible, setIsCommentSectionVisible] = useState(false);

    if (!blog) return null;

    const headerImage = blog.media?.images?.[0];
    const contentImages = blog.media?.images?.slice(1) || [];

    const handleLike = async () => {
        if (!isLoggedIn) {
            message.warning('Please log in to like this blog post.');
            return;
        }
        try {
            await engageWithBlog({ id: blog.id!, action: 'like' }).unwrap();
            message.success('Blog post liked successfully!');
        } catch (error) {
            message.error('Failed to like the blog post. Please try again.');
        }
    };

    const handleComment = async () => {
        if (!isLoggedIn) {
            message.warning('Please log in to comment on this blog post.');
            return;
        }
        if (blog.userHasCommented) {
            message.warning('You have already commented on this blog post.');
            return;
        }
        if (!comment.trim()) {
            message.warning('Please enter a comment.');
            return;
        }
        try {
            await engageWithBlog({ id: blog.id!, action: 'comment', comment }).unwrap();
            message.success('Comment added successfully!');
            setComment('');
            // Update the local state to reflect that the user has commented
            blog.userHasCommented = true;
        } catch (error) {
            message.error('Failed to add comment. Please try again.');
        }
    };

    const toggleCommentSection = () => {
        setIsCommentSectionVisible(!isCommentSectionVisible);
    };

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
                                {Number(blog.commentsCount) || 0} Comment{Number(blog.commentsCount) !== 1 ? 's' : ''}
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
                        <Carousel autoplay effect="fade" className="overflow-hidden">
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
                        <Button
                            type="text"
                            icon={<HeartOutlined />}
                            className="text-gray-600 hover:text-red-500"
                            onClick={handleLike}
                            disabled={!isLoggedIn}
                        >
                            Like ({blog.likesCount || 0})
                        </Button>
                        <Button type="text" icon={<MessageOutlined />} className="text-gray-600" onClick={toggleCommentSection}>
                            Comment ({blog.commentsCount || 0})
                        </Button>
                    </Space>
                </div>
                {/* Slide-down Comment Section */}
                <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isCommentSectionVisible ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="bg-gray-50 p-4 shadow-inner mb-8">
                        {isLoggedIn && !blog.userHasCommented && (
                            <div className="mb-4">
                                <TextArea
                                    rows={4}
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Write your comment here..."
                                    className="mb-2"
                                />
                                <Button type="primary" onClick={handleComment}>
                                    Post Comment
                                </Button>
                            </div>
                        )}
                        {isLoggedIn && blog.userHasCommented && <Text type="secondary">You have already commented on this blog post.</Text>}
                        {!isLoggedIn && <Text type="secondary">Please log in to comment on this blog post.</Text>}
                    </div>
                </div>

                <div className="my-8 border p-6">
                    <div className="flex items-center mb-4">
                        <Avatar src={blog.author?.image} icon={<UserOutlined />} size={64} className="mr-4" />
                        <div>
                            <Title level={4} className="mb-0">
                                {blog.author?.name}
                            </Title>
                            <Text type="secondary">Professor</Text>
                        </div>
                    </div>
                    <Paragraph className="text-gray-600 mb-4">{blog.author?.bio}</Paragraph>
                    <Space>
                        <Button icon={<TwitterOutlined />} shape="circle" />
                        <Button icon={<LinkedinOutlined />} shape="circle" />
                    </Space>
                </div>

                <div id="commentSection" className="my-8">
                    <Title level={5} className="mb-4">
                        Post Activity
                    </Title>
                    {blog.activities?.map((activity) => (
                        <div key={activity.userId} className="mb-4 bg-white p-3 border shadow-sm">
                            <Space align="start" className="w-full">
                                <Avatar src={activity.user.displayImage} icon={<UserOutlined />} />
                                <div className="flex-grow">
                                    <Text strong className="text-blue-600">{`${activity.user.firstName} ${activity.user.lastName}`}</Text>
                                    <Paragraph className="text-gray-700 mt-1 mb-0">{activity.comment}</Paragraph>
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
