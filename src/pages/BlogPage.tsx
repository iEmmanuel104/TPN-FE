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
    const pageSize = 10;
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
            <div className="container mx-auto px-4 py-8">
                <Breadcrumb className="mb-4">
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Blogs</Breadcrumb.Item>
                </Breadcrumb>
                <Title level={2}>Blog</Title>
                <Row gutter={24}>
                    <Col xs={24} md={18}>
                        {isLoading && <div>Loading...</div>}
                        {isError && <div>Error loading blog posts</div>}
                        {blogData && (
                            <>
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={blogData?.data?.blogs}
                                    renderItem={(blog) => (
                                        <List.Item
                                            key={blog.id}
                                            extra={
                                                blog.media?.images &&
                                                blog.media.images.length > 0 && <img width={272} alt="blog image" src={blog.media.images[0]} />
                                            }
                                            className="border mb-4 p-4"
                                        >
                                            <List.Item.Meta
                                                avatar={<Avatar src={blog.author.image} />}
                                                title={<Link to={`/blog/${blog.id}`}>{blog.title}</Link>}
                                                description={`${blog.author.name} | ${new Date(blog.createdAt).toLocaleDateString()}`}
                                            />
                                            <Paragraph ellipsis={{ rows: 3 }}>
                                                <QuillContent content={blog.content || ''} />
                                            </Paragraph>
                                            {blog.tags && blog.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                                        </List.Item>
                                    )}
                                />
                                <Pagination
                                    current={currentPage}
                                    total={blogData?.data?.count}
                                    pageSize={pageSize}
                                    onChange={handlePageChange}
                                    className="mt-4"
                                />
                            </>
                        )}
                    </Col>
                    <Col xs={24} md={6}>
                        <div className="mb-8">
                            <Title level={4}>Search</Title>
                            <Search allowClear placeholder="Search blogs" onSearch={handleSearch} className="w-full mb-4" />
                        </div>

                        <div className="mb-8">
                            <Title level={4}>Popular Courses</Title>
                            <List
                                dataSource={popularCoursesData?.data || []}
                                renderItem={(course) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={course.media?.videoThumbnail || '/placeholder-image.jpg'} />}
                                            title={<Link to={`/course/${course.id}`}>{course.title}</Link>}
                                            description={
                                                <Text type="success">{course.price === 0 ? 'Free' : `${course.currency.symbol}${course.price}`}</Text>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>

                        <div>
                            <Title level={4}>Latest Posts</Title>
                            <List
                                dataSource={blogData?.data?.blogs.slice(0, 3) || []}
                                renderItem={(blog) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src={blog.media?.images?.[0] || '/placeholder-image.jpg'} />}
                                            title={<Link to={`/blog/${blog.id}`}>{blog.title}</Link>}
                                            description={new Date(blog.createdAt).toLocaleDateString()}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </PublicLayout>
    );
};

export default BlogPage;