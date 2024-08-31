import React from 'react';
import { Tag, Typography, Image } from 'antd';
import { motion } from 'framer-motion';
import { BlogDto } from '../../api/blogApi';

const { Title, Paragraph } = Typography;

interface BlogTemplate1Props {
    blog: Partial<BlogDto>;
}

const BlogTemplate1: React.FC<BlogTemplate1Props> = ({ blog }) => {
    if (!blog) return null;

    const headerImage = blog.media?.images?.[0];
    const contentImage = blog.media?.images?.[1];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
            {headerImage && (
                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                    <Image src={headerImage} alt="Header" className="w-full h-64 object-cover" />
                </motion.div>
            )}
            <div className="p-8">
                <Title level={1} className="mb-4 text-3xl font-bold">
                    {blog.title}
                </Title>
                <div className="mb-6 text-gray-600">
                    <span className="mr-4">By {blog.author?.name}</span>
                    {blog.createdAt && <span>{new Date(blog.createdAt).toLocaleDateString()}</span>}
                </div>
                <Paragraph className="text-lg leading-relaxed mb-6">
                    {blog.content?.split('\n').map((paragraph, index) => (
                        <React.Fragment key={index}>
                            {paragraph}
                            {index === 1 && contentImage && (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="my-6"
                                >
                                    <Image src={contentImage} alt="Content" className="w-full max-h-96 object-cover rounded-lg" />
                                </motion.div>
                            )}
                            <br />
                        </React.Fragment>
                    ))}
                </Paragraph>
                <div className="flex flex-wrap">
                    {blog.tags?.map((tag) => (
                        <Tag key={tag} className="mr-2 mb-2 px-3 py-1 text-sm bg-blue-100 text-blue-800">
                            {tag}
                        </Tag>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogTemplate1;
