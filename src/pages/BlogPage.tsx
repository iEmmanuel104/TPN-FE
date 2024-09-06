import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogQuery } from '../api/blogApi';
import BlogTemplate2 from '../components/Admin/blogTemplates/Template2';
import PublicLayout from '../components/PublicLayout';
import { Spin } from 'antd';
import { RootState } from '../state/store';
import { useSelector } from 'react-redux';

const BlogPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
        const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const { data: blogResponse, isLoading, isError } = useGetBlogQuery({
         id: (id as string) || '',
         ...(isLoggedIn && user ? { userId: user.id } : {}),
        });

    if (isLoading) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            </PublicLayout>
        );
    }

    if (isError || !blogResponse || !blogResponse.data) {
        return (
            <PublicLayout>
                <div className="flex justify-center items-center h-screen">
                    <p>Error loading blog post. Please try again later.</p>
                </div>
            </PublicLayout>
        );
    }

    const blog = blogResponse.data;

    return (
        <PublicLayout>
            <BlogTemplate2 blog={blog} />
        </PublicLayout>
    );
};

export default BlogPage;
