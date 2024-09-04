import React from 'react';
import { Typography, Button, Card, Rate, Row, Col, Avatar, List } from 'antd';
import { motion } from 'framer-motion';
import { ArrowRightOutlined, BookOutlined, ReadOutlined, SafetyCertificateOutlined, StarFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import PublicLayout from '../components/PublicLayout';
import NextStep from '../components/NextStep';
import Faq from '../components/Faq';

import backgroundImage from '../assets/schoolwork.jpg';
import parenting from '../assets/parenting.jpeg';
import angermanage from '../assets/angermanage.jpg';
import domestic from '../assets/domesticviolence.jpeg';
import umbrella from '../assets/umbrella.jpeg';

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
                <div className="px-4 sm:px-6 lg:px-8">
                    <section className="py-12 lg:py-24">
                        <NextStep />
                    </section>
                    <PopularCoursesSection navigate={navigate} />
                    <EventsAndTestimonialsSection events={events} />
                    <BlogSection blogs={blogs} />
                    <section className="py-12">
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
                    Get The Best Addiction Courses
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
                            className="flex items-center justify-center"
                        >
                            {React.cloneElement(item.icon as React.ReactElement, { style: { fontSize: '24px', marginRight: '8px' } })}
                            <Text strong className="text-base sm:text-lg">
                                {item.text}
                            </Text>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </div>
    </div>
);

const PopularCoursesSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <section className="mt-12 sm:mt-16">
        <Row justify="space-between" align="middle" className="mb-6 sm:mb-8">
            <Col>
                <Title level={2} className="text-2xl sm:text-3xl">
                    Popular Courses
                </Title>
                <Paragraph>Discover what people are learning</Paragraph>
            </Col>
            <Col className="hidden sm:block">
                <Row gutter={[8, 8]}>
                    {['Parenting', 'Anger Management', 'Alcohol Addiction', 'Domestic Violence'].map((category) => (
                        <Col key={category}>
                            <Button type="link">{category}</Button>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[parenting, angermanage, domestic, domestic].map((image, index) => (
                <div key={index} className="cursor-pointer" onClick={() => navigate('/coursedetails')}>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={image} alt="course" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">Course Title</h3>
                            <p className="text-sm text-gray-600 mb-2">by Andrew Iwe</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-blue-600">8 lectures</span>
                                <Rate disabled defaultValue={4} character={<StarFilled />} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const EventsAndTestimonialsSection: React.FC<{
    events: { date: { day: number; month: string }; title: string; time: string; location: string }[];
}> = ({ events }) => (
    <Row justify="center" gutter={[16, 16]} className="my-8">
        <Col xs={24} md={11} lg={10}>
            <Card className="bg-gray-100 w-full h-full" size="small">
                <Title level={4}>Events</Title>
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
        <Col xs={24} md={11} lg={10}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-gray-100 px-4 py-4" size="small">
                    <Title level={4}>Testimonials</Title>
                    <Paragraph className="max-w-[300px] text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Paragraph>
                    <div className="flex mt-2 items-center">
                        <Avatar
                            size={48}
                            src="https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg"
                            className="mr-3"
                        />
                        <div>
                            <Title level={5} className="mb-0">
                                Antonia Bells
                            </Title>
                            <Text className="text-green-600 font-semibold text-sm">Director Biography</Text>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </Col>
    </Row>
);

const BlogSection: React.FC<{ blogs: { id: number }[] }> = ({ blogs }) => (
    <section className="mt-12 sm:mt-16">
        <div className="text-center mb-6 sm:mb-8">
            <Title level={2} className="text-2xl sm:text-3xl">
                Read Latest Articles
            </Title>
            <Paragraph className="max-w-[320px] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Paragraph>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((blog) => (
                <Link key={blog.id} to="/blogdetails" className="block">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={umbrella} alt="blog" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">The Unseen of spending three years at Pixelgrade</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </p>
                            <div className="flex items-center justify-between">
                                <Text strong>Continue Reading</Text>
                                <ArrowRightOutlined />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
);

export default Home;
