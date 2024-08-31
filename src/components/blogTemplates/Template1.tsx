import React from 'react';
import { Tag, Typography, Image, Avatar, Divider } from 'antd';
import { motion } from 'framer-motion';
import { BlogDto } from '../../api/blogApi';
import { CalendarOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface BlogTemplate1Props {
    blog: Partial<BlogDto>;
}

const BlogTemplate1: React.FC<BlogTemplate1Props> = ({ blog }) => {
    if (!blog) return null;

    const headerImage = blog.media?.images?.[0];
    const contentImages = blog.media?.images?.slice(1) || [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
            {headerImage && (
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="relative h-96">
                    <Image src={headerImage} alt="Header" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <Title level={1} className="text-white text-4xl font-bold text-center px-4">
                            {blog.title}
                        </Title>
                    </div>
                </motion.div>
            )}
            <div className="p-8">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center mb-6"
                >
                    <Avatar src={blog.author?.image} icon={<UserOutlined />} size={64} className="mr-4" />
                    <div>
                        <Title level={4} className="mb-0">
                            {blog.author?.name}
                        </Title>
                        <div className="text-gray-500 flex items-center">
                            <CalendarOutlined className="mr-2" />
                            {blog.createdAt && new Date(blog.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </motion.div>
                <Divider />
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                    {blog.content?.split('\n').map((paragraph, index) => (
                        <React.Fragment key={index}>
                            <Paragraph className="text-lg leading-relaxed mb-6">{paragraph}</Paragraph>
                            {contentImages[index] && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 * (index + 1) }}
                                    className="my-8"
                                >
                                    <Image
                                        src={contentImages[index]}
                                        alt={`Content ${index + 1}`}
                                        className="w-full max-h-96 object-cover rounded-lg shadow-md"
                                    />
                                </motion.div>
                            )}
                        </React.Fragment>
                    ))}
                </motion.div>
                <Divider />
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap mt-6"
                >
                    {blog.tags?.map((tag) => (
                        <Tag key={tag} className="mr-2 mb-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                        </Tag>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default BlogTemplate1;
