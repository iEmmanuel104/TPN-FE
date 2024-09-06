import React, { useState } from 'react';
import { Typography, Input, Row, Col, List, Avatar, Tag, Pagination, Breadcrumb } from 'antd';
import { BlogStatus, useGetAllBlogsQuery } from '../api/blogApi';
import { useGetAllSimilarOrPopularCoursesQuery } from '../api/courseApi';
import { Link } from 'react-router-dom';
import PublicLayout from '../components/PublicLayout';
import QuillContent from '../components/Admin/QuillContent';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const BlogPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const { data: popularCoursesData } = useGetAllSimilarOrPopularCoursesQuery({});

    const {
        data: blogData,
        isLoading,
        isError,
    } = useGetAllBlogsQuery({
        q: searchTerm,
        page: currentPage,
        size: pageSize,
        status: BlogStatus.Published,
    });

    const handleSearch = (value: string) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <PublicLayout>
            <div className="bg-white min-h-screen">
                <Breadcrumb className="container mx-auto px-4 py-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Blogs</Breadcrumb.Item>
                </Breadcrumb>

                <div className="container mx-auto px-4 py-4">
                    <Title level={2}>Blog</Title>
                    <div className="mb-6">
                        <Search allowClear placeholder="Search blogs" onSearch={handleSearch} className="w-full md:w-1/2 lg:w-1/3" size="large" />
                    </div>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={18}>
                            {isLoading && <div>Loading...</div>}
                            {isError && <div>Error loading blog posts</div>}
                            {blogData && (
                                <div className="flex flex-col h-full">
                                    <div className="flex-grow">
                                        <List
                                            itemLayout="vertical"
                                            size="large"
                                            dataSource={blogData?.data?.blogs}
                                            renderItem={(blog) => (
                                                <List.Item
                                                    key={blog.id}
                                                    extra={
                                                        blog.media?.images &&
                                                        blog.media.images.length > 0 && (
                                                            <img
                                                                className="w-full md:w-48 h-32 object-cover rounded"
                                                                alt="blog image"
                                                                src={blog.media.images[0]}
                                                            />
                                                        )
                                                    }
                                                    className="border rounded-lg mb-4 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                                                >
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={blog.author.image} size={48} />}
                                                        title={
                                                            <Link to={`/blog/${blog.id}`} className="text-lg font-semibold hover:text-blue-600">
                                                                {blog.title}
                                                            </Link>
                                                        }
                                                        description={
                                                            <Text className="text-sm text-gray-500">
                                                                {blog.author.name} | {new Date(blog.createdAt).toLocaleDateString()}
                                                            </Text>
                                                        }
                                                    />
                                                    <Paragraph ellipsis={{ rows: 2 }} className="text-sm mt-2">
                                                        <QuillContent content={blog.content || ''} />
                                                    </Paragraph>
                                                    <div className="mt-2">
                                                        {blog.tags &&
                                                            blog.tags.map((tag) => (
                                                                <Tag key={tag} className="mr-1 mb-1">
                                                                    {tag}
                                                                </Tag>
                                                            ))}
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <Pagination
                                            current={currentPage}
                                            total={blogData?.data?.count}
                                            pageSize={pageSize}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            )}
                        </Col>
                        <Col xs={0} lg={6}>
                            <div className="sticky top-24">
                                <div className="mb-6">
                                    <Title level={5} className="mb-2 text-base font-semibold">
                                        Popular Courses
                                    </Title>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={popularCoursesData?.data || []}
                                        renderItem={(course) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={course.media?.videoThumbnail || '/placeholder-image.jpg'} size="large" />}
                                                    title={
                                                        <Link to={`/course/${course.id}`} className="text-sm hover:text-blue-600">
                                                            {course.title}
                                                        </Link>
                                                    }
                                                    description={
                                                        <Text type="success" className="text-xs">
                                                            {course.price === 0 ? 'Free' : `${course.currency.symbol}${course.price}`}
                                                        </Text>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>

                                <div className="mb-6">
                                    <Title level={5} className="mb-2 text-base font-semibold">
                                        Latest Posts
                                    </Title>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={blogData?.data?.blogs.slice(0, 3) || []}
                                        renderItem={(blog) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={blog.media?.images?.[0] || '/placeholder-image.jpg'} size="large" />}
                                                    title={
                                                        <Link to={`/blog/${blog.id}`} className="text-sm hover:text-blue-600">
                                                            {blog.title}
                                                        </Link>
                                                    }
                                                    description={<Text className="text-xs">{new Date(blog.createdAt).toLocaleDateString()}</Text>}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </PublicLayout>
    );
};

export default BlogPage;
