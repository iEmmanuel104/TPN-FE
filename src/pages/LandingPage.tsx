import React, { useRef, useEffect } from 'react';
import { Typography, Button, Card, Row, Col, Avatar, List, Carousel } from 'antd';
import { motion } from 'framer-motion';
import { ArrowRightOutlined, BookOutlined, ReadOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { CarouselRef } from 'antd/lib/carousel';

import PublicLayout from '../components/PublicLayout';
import NextStep from '../components/NextStep';
import Faq from '../components/Faq';

import backgroundImage from '../assets/schoolwork.jpg';
import parenting from '../assets/parenting.jpeg';
import umbrella from '../assets/umbrella.jpeg';
import Instructor from '../assets/man.jpg'
import CourseCard from '../components/CourseCard';

const { Title, Paragraph, Text } = Typography;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const blogs = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const events = [
        { date: { day: 15, month: 'Oct' }, title: 'Eduma Autumn 2022', time: '8:00 am - 5:00 pm', location: 'Venice, Italy' },
        { date: { day: 20, month: 'Nov' }, title: 'Winter Workshop 2022', time: '9:00 am - 4:00 pm', location: 'Berlin, Germany' },
    ];

    const items = [
        { icon: <BookOutlined />, text: '100,000 Online Courses' },
        { icon: <ReadOutlined />, text: 'Expert Instruction' },
        { icon: <SafetyCertificateOutlined />, text: 'Unlimited Lifetime Access' },
    ];

    return (
        <PublicLayout>
            <div className="flex flex-col">
                <div className="h-screen flex flex-col">
                    <HeroSection />
                    <UnderHeroSection items={items} />
                </div>
                <div className="px-4 sm:px-6 lg:px-24 xl:px-32">
                    <section className="py-8 sm:py-12 lg:py-24">
                        <NextStep />
                    </section>
                    <PopularCoursesSection navigate={navigate} />
                    <EventsAndTestimonialsSection events={events} />
                    <BlogSection blogs={blogs} />
                    <section className="py-8 sm:py-12">
                        <Faq />
                    </section>
                </div>
            </div>
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
                <Paragraph className="text-black text-lg sm:text-xl font-semibold">Course</Paragraph>
                <Title level={2} className="text-gray-600 text-2xl sm:text-3xl lg:text-4xl">
                    Get The Best Educational Courses
                </Title>
                <Button type="primary" size="large" className="mt-4">
                    Get Started
                </Button>
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


const PopularCoursesSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
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

    const courses = [
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: parenting,
            price: 'Free',
        },
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: parenting,
            price: 'Free',
        },
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: parenting,
            price: 'Free',
        },
        {
            title: 'Introduction LearnPress – LMS Plugin',
            instructor: { name: 'Keny White', avatar: Instructor },
            lessons: 6,
            students: 412,
            image: parenting,
            price: 'Free',
        },
        // Add more course objects here...
    ];

    const courseCards = courses.map((course, index) => (
        <div key={index} className="px-2">
            <CourseCard {...course} onClick={() => navigate('/coursedetails')} />
        </div>
    ));

    return (
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
                        {['Parenting', 'Anger Management', 'Alcohol Addiction', 'Domestic Violence'].map((category) => (
                            <Col key={category}>
                                <Button className="font-semibold" type="link">
                                    {category}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">{courseCards}</div>
            <div className="sm:hidden">
                <Carousel autoplay ref={carouselRef}>
                    {courseCards}
                </Carousel>
            </div>
        </section>
    );
};

const EventsAndTestimonialsSection: React.FC<{
    events: { date: { day: number; month: string }; title: string; time: string; location: string }[];
}> = ({ events }) => {
    const testimonialCarouselRef = useRef<CarouselRef>(null);

    const testimonials = [
        {
            name: 'Antonia Bells',
            role: 'Director Biography',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            avatar: 'https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg',
        },
        {
            name: 'John Doe',
            role: 'Marketing Specialist',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            avatar: 'https://example.com/john-doe-avatar.jpg',
        },
        {
            name: 'Jane Smith',
            role: 'Product Manager',
            content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
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
                    <Title level={4} className="font-bold">
                        Events
                    </Title>
                    <List
                        itemLayout="horizontal"
                        dataSource={events}
                        renderItem={(item) => (
                            <List.Item className="border-b-0 py-2">
                                <List.Item.Meta
                                    avatar={
                                        <div className="text-center p-1 rounded bg-white">
                                            <Text strong className="text-base block">
                                                {item.date.day}
                                            </Text>
                                            <Text className="text-sm block">{item.date.month}</Text>
                                        </div>
                                    }
                                    title={
                                        <Text strong className="text-base">
                                            {item.title}
                                        </Text>
                                    }
                                    description={<Text className="text-gray-500 text-sm">{`${item.time} ${item.location}`}</Text>}
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
                                    <Paragraph className="max-w-[300px] text-sm">{testimonial.content}</Paragraph>
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

const BlogSection: React.FC<{ blogs: { id: number }[] }> = ({ blogs }) => {
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

    const blogCards = blogs.map((blog) => (
        <div key={blog.id} className="px-2">
            <Card
                hoverable
                cover={<img alt="blog" src={umbrella} className="h-48 object-cover" />}
                onClick={() => (window.location.href = '/blogdetails')}
            >
                <Card.Meta
                    title={
                        <Typography.Title level={4} className="!mb-0">
                            The Unseen of spending three years at Pixelgrade
                        </Typography.Title>
                    }
                    description={
                        <>
                            <p className="text-sm text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                            <div className="flex items-center justify-between">
                                <Text strong>Continue Reading</Text>
                                <ArrowRightOutlined />
                            </div>
                        </>
                    }
                />
            </Card>
        </div>
    ));

    return (
        <section className="py-8 sm:py-12">
            <div className="text-center mb-6">
                <Title level={2} className="text-2xl sm:text-3xl font-bold">
                    Read Latest Articles
                </Title>
                <Paragraph className="max-w-[320px] mx-auto">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </Paragraph>
            </div>
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-6">{blogCards}</div>
            <div className="sm:hidden">
                <Carousel autoplay ref={carouselRef}>
                    {blogCards}
                </Carousel>
            </div>
        </section>
    );
};

export default Home;