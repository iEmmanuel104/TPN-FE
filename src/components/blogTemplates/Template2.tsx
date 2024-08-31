import React from 'react';
import { Tag, Typography, Avatar } from 'antd';
import { motion } from 'framer-motion';
import { BlogDto } from '../../api/blogApi';

const { Title, Paragraph } = Typography;

interface BlogTemplate2Props {
    blog: Partial<BlogDto>;
}

const BlogTemplate2: React.FC<BlogTemplate2Props> = ({ blog }) => {
    if (!blog) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-white shadow-lg rounded-lg overflow-hidden"
        >
            <div className="p-8">
                <Title level={1} className="mb-6 text-4xl font-bold text-center text-white">
                    {blog.title}
                </Title>
                <div className="flex justify-center items-center mb-8">
                    <Avatar src={blog.author?.image || 'https://via.placeholder.com/40'} size={64} className="mr-4" />
                    <div>
                        <p className="text-xl font-semibold">{blog.author?.name}</p>
                        {blog.createdAt && <p className="text-sm opacity-75">{new Date(blog.createdAt).toLocaleDateString()}</p>}
                    </div>
                </div>
                {blog.media?.images && blog.media.images.length > 0 && (
                    <img src={blog.media.images[0]} alt={blog.title} className="w-full h-96 object-cover mb-8 rounded-lg shadow-md" />
                )}
                <Paragraph className="text-lg leading-relaxed mb-8 bg-white bg-opacity-10 p-6 rounded-lg shadow-inner">{blog.content}</Paragraph>
                <div className="flex flex-wrap justify-center">
                    {blog.tags?.map((tag) => (
                        <Tag key={tag} className="mr-2 mb-2 px-4 py-2 text-sm bg-white text-purple-600 rounded-full">
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogTemplate2;
