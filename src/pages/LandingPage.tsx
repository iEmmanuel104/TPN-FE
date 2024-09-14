import React, { useRef, useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Avatar, List, Carousel } from 'antd';
import { motion } from 'framer-motion';
import { ArrowRightOutlined, BookOutlined, ReadOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useGetAllSimilarOrPopularCoursesQuery } from '../api/courseApi';
import { useGetAllBlogsQuery, BlogStatus, BlogDto } from '../api/blogApi';
import { EventDto, useGetAllEventsQuery } from '../api/eventApi';
import type { CarouselRef } from 'antd/lib/carousel';
import { Link, useLocation } from 'react-router-dom';

import PublicLayout from '../components/PublicLayout';
import NextStep from '../components/NextStep';
import Faq from '../components/Faq';

import backgroundImage from '../assets/schoolwork.jpg';
import CourseFrame from '../components/CourseFrame';
import QuillContent from '../components/Admin/QuillContent';
import ProgressiveBackTop from '../components/ScrollToTopButton';

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
    const location = useLocation();
    const { data: popularCoursesData } = useGetAllSimilarOrPopularCoursesQuery({});
    const { data: blogsData } = useGetAllBlogsQuery({
        status: BlogStatus.Published,
        page: 1,
        size: 3,
    });

    const { data: eventsData } = useGetAllEventsQuery({ status: 'all', size: 2 });

    const items = [
        { icon: <BookOutlined />, text: '50+ Online Courses' },
        { icon: <ReadOutlined />, text: 'Expert Instruction' },
        { icon: <SafetyCertificateOutlined />, text: 'Unlimited Lifetime Access' },
    ];

    useEffect(() => {
        if (location.hash) {
            setTimeout(() => {
                const element = document.querySelector(location.hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <PublicLayout>
            <div className="flex flex-col">
                <div className="h-screen flex flex-col">
                    <HeroSection />
                    <UnderHeroSection items={items} />
                </div>
                <div className="px-4 sm:px-6 lg:px-24 xl:px-32">
                    <section id="about-us" className="py-8 sm:py-12 lg:py-24">
                        <NextStep />
                    </section>
                    <section className="py-8 sm:py-12">
                        <Row justify="space-between" align="middle" className="mb-6">
                            <Col>
                                <Title level={2} className="text-2xl sm:text-3xl font-bold">
                                    Popular Courses
                                </Title>
                                <Paragraph>Discover what people are learning</Paragraph>
                            </Col>
                            <Col className="hidden sm:block">
                                <Row gutter={[8, 8]}>
                                    {['Parenting', 'Anger Management', 'Overcoming Substance Addiction', 'Domestic Violence', 'Life Skills'].map(
                                        (category) => (
                                            <Col key={category}>
                                                <Button className="font-semibold" type="dashed">
                                                    {category}
                                                </Button>
                                            </Col>
                                        ),
                                    )}
                                </Row>
                            </Col>
                        </Row>
                        {popularCoursesData?.data && <CourseFrame courses={popularCoursesData.data} />}
                    </section>
                    <EventsAndTestimonialsSection events={eventsData?.data?.events || []} />
                    <BlogSection blogs={blogsData?.data?.blogs || []} />
                    <section id="faq" className="py-8 sm:py-12">
                        <Faq />
                    </section>
                </div>
            </div>
            <ProgressiveBackTop />
        </PublicLayout>
    );
};

const HeroSection: React.FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full bg-cover bg-center flex-grow"
        style={{
            backgroundImage: `url(${backgroundImage})`,
        }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex justify-start px-4 sm:px-6 lg:px-12 h-full items-center mx-auto">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white py-6 px-4 sm:px-6 max-w-sm sm:max-w-md"
            >
                <Paragraph className="text-black text-lg sm:text-xl font-semibold">Here we are</Paragraph>
                <Title level={2} className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl">
                    Empowering Change, Shaping Better Lives.
                </Title>
                <Link to="/courses">
                    <Button type="primary" size="large" className="mt-4">
                        Get Started
                    </Button>
                </Link>
            </motion.div>
        </div>
    </motion.div>
);

const UnderHeroSection: React.FC<{ items: { icon: React.ReactNode; text: string }[] }> = ({ items }) => (
    <div className="bg-gray-300 w-full py-6 sm:py-9">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <Row justify="center" gutter={[16, 16]}>
                {items.map((item, index) => (
                    <Col key={index} xs={24} sm={8}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex items-center justify-start sm:justify-center"
                        >
                            <div className="flex-shrink-0 w-8 flex justify-center">
                                {React.cloneElement(item.icon as React.ReactElement, { style: { fontSize: '24px' } })}
                            </div>
                            <Text strong className="text-base sm:text-lg ml-2">
                                {item.text}
                            </Text>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </div>
    </div>
);

const EventsAndTestimonialsSection: React.FC<{ events: EventDto[] }> = ({ events }) => {
    const testimonialCarouselRef = useRef<CarouselRef>(null);

    const testimonials = [
        {
            name: 'Michael T.',
            role: 'Director Biography',
            content:
                'Before joining this platform, I had no formal training in any trade. The vocational training courses not only gave me the skills to become a certified electrician but also helped me regain confidence in myself. The instructors were incredibly supportive, and the materials were easy to understand. I now feel prepared for life after my release, with a skill that will help me build a better future.',
            avatar: 'https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg',
        },
        {
            name: 'John Doe',
            role: 'Marketing Specialist',
            content:
                'Texas Preventive Network has been a game-changer for our facility. We’ve seen learners become more engaged, motivated, and focused on their personal development. It’s rewarding to see them take control of their education and make real progress.',
            avatar: 'https://example.com/john-doe-avatar.jpg',
        },
        {
            name: 'Jane Smith',
            role: 'Product Manager',
            content:
                'Teaching on this platform has been a highly rewarding experience. The tools provided allow me to connect with the learners in a meaningful way. It’s TPN CONTENT 6 amazing to witness their personal transformation and to know that we are helping them prepare for a successful integration into society.',
            avatar: 'https://example.com/jane-smith-avatar.jpg',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (testimonialCarouselRef.current) {
                testimonialCarouselRef.current.next();
            }
        }, 10000); // Change testimonial every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <Row justify="center" gutter={[16, 16]} className="py-8 sm:py-12">
            <Col xs={24} lg={11}>
                <Card className="bg-gray-100 w-full h-full" size="small">
                    <div className="flex justify-between items-center">
                        <Title level={4} className="font-bold m-0">
                            Events
                        </Title>
                        <Link to="/events" className="text-primary hover:text-primary-dark flex items-center">
                            <Text strong className="mr-1">
                                View All
                            </Text>
                            <ArrowRightOutlined />
                        </Link>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={events}
                        renderItem={(item) => (
                            <List.Item className="border-b-0 py-2">
                                <List.Item.Meta
                                    avatar={
                                        <div className="text-center p-1 rounded bg-white">
                                            <Text strong className="text-base block">
                                                {new Date(item.start_time_info.date).getDate()}
                                            </Text>
                                            <Text className="text-sm block">
                                                {new Date(item.start_time_info.date).toLocaleString('default', { month: 'short' })}
                                            </Text>
                                        </div>
                                    }
                                    title={
                                        <Text strong className="text-base">
                                            {item.topic}
                                        </Text>
                                    }
                                    description={
                                        <Text className="text-gray-500 text-sm">{`${item.start_time_info.time} ${item.start_time_info.timezone}`}</Text>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </Col>
            <Col xs={24} lg={11}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="bg-gray-100 px-4 py-4" size="small">
                        <Title level={4} className="font-bold">
                            Testimonials
                        </Title>
                        <Carousel autoplay ref={testimonialCarouselRef}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index}>
                                    <Paragraph className="max-w-full text-sm">{testimonial.content}</Paragraph>
                                    <div className="flex mt-2 items-center">
                                        <Avatar size={48} src={testimonial.avatar} className="mr-3" />
                                        <div>
                                            <Title level={5} className="mb-0">
                                                {testimonial.name}
                                            </Title>
                                            <Text className="text-green-600 font-semibold text-sm">{testimonial.role}</Text>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </Card>
                </motion.div>
            </Col>
        </Row>
    );
};

const BlogSection: React.FC<{ blogs: BlogDto[] }> = ({ blogs }) => {
    const carouselRef = useRef<CarouselRef>(null);

    useEffect(() => {
        const handleFocus = () => {
            if (carouselRef.current) {
                carouselRef.current.next();
            }
        };

        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const truncateContent = (content: string, maxLength: number) => {
        const strippedContent = content.replace(/<[^>]+>/g, '');
        if (strippedContent.length <= maxLength) return content;
        return strippedContent.slice(0, maxLength) + '...';
    };

    const blogCards = blogs.map((blog) => (
        <div key={blog.id} className="px-2">
            <Card hoverable cover={<img alt="blog" src={blog.media?.images?.[0] || '/placeholder-image.jpg'} className="h-48 object-cover" />}>
                <Link to={`/blog/${blog.id}`}>
                    <Card.Meta
                        title={
                            <Typography.Title level={4} className="!mb-0">
                                {blog.title}
                            </Typography.Title>
                        }
                        description={
                            <>
                                <div className="text-sm text-gray-600 mb-4 h-16 overflow-hidden">
                                    <QuillContent content={truncateContent(blog.content, 100)} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Text strong>Continue Reading</Text>
                                    <ArrowRightOutlined />
                                </div>
                            </>
                        }
                    />
                </Link>
            </Card>
        </div>
    ));

    return (
        <section className="py-8 sm:py-12">
            <div className="text-center mb-6">
                <Title level={2} className="text-2xl sm:text-3xl font-bold">
                    Read Latest Articles
                </Title>
                <Paragraph className="max-w-[320px] mx-auto">Stay updated with our latest insights and expert advice</Paragraph>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">{blogCards}</div>
            <div className="sm:hidden">
                <Carousel autoplay ref={carouselRef}>
                    {blogCards}
                </Carousel>
            </div>
            <div className="text-center mt-6">
                <Link to="/blogs">
                    <Button type="primary" size="large">
                        View All Articles
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
