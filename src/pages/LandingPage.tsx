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
            {/* Hero Section */}
            <HeroSection />

            {/* UnderHero Section */}
            <UnderHeroSection items={items} />

            <div className="px-[120px]">
                {/* Next Step Section */}
                <section className="px-[225px] pt-[120px]">
                    <NextStep />
                </section>

                {/* Popular Courses Section */}
                <PopularCoursesSection navigate={navigate} />

                {/* Events and Testimonials Section */}
                <EventsAndTestimonialsSection events={events} />

                {/* Blog Section */}
                <BlogSection blogs={blogs} />

                {/* FAQ Section */}
                <section className="px-[105px]">
                    <Faq />
                </section>
            </div>
        </PublicLayout>
    );
};

const HeroSection: React.FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[680px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex justify-start px-4 md:px-12 lg:px-24 pt-32">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white py-8 px-6 max-w-md"
            >
                <Paragraph className="text-black text-xl font-semibold">Course</Paragraph>
                <Title level={2} className="text-gray-600">
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
    <div className="bg-gray-300 w-full py-9">
        <Row justify="center" gutter={[16, 16]}>
            {items.map((item, index) => (
                <Col key={index} xs={24} sm={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center justify-center"
                    >
                        {React.cloneElement(item.icon as React.ReactElement, { style: { fontSize: '35px', marginRight: '12px' } })}
                        <Text strong className="text-lg md:text-xl">
                            {item.text}
                        </Text>
                    </motion.div>
                </Col>
            ))}
        </Row>
    </div>
);

const PopularCoursesSection: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => (
    <section className="mt-16 px-4 md:px-12 lg:px-24">
        <Row justify="space-between" align="middle" className="mb-8">
            <Col>
                <Title level={2}>Popular Courses</Title>
                <Paragraph>Discover what people are learning</Paragraph>
            </Col>
            <Col>
                <Row gutter={[8, 8]}>
                    {['Parenting', 'Anger Management', 'Alcohol Addiction', 'Domestic Violence'].map((category) => (
                        <Col key={category}>
                            <Button type="link">{category}</Button>
                        </Col>
                    ))}
                </Row>
            </Col>
        </Row>
        <Row gutter={[16, 16]} className="py-9">
            {[parenting, angermanage, domestic, domestic].map((image, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                    <Card hoverable cover={<img alt="course" src={image} className="h-40 object-cover" />} onClick={() => navigate('/coursedetails')}>
                        <Card.Meta
                            title="Course Title"
                            description={
                                <>
                                    <Paragraph>by Andrew Iwe</Paragraph>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Button type="link">8 lectures</Button>
                                        </Col>
                                        <Col>
                                            <Rate disabled defaultValue={4} character={<StarFilled />} />
                                        </Col>
                                    </Row>
                                </>
                            }
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    </section>
);

const EventsAndTestimonialsSection: React.FC<{
    events: { date: { day: number; month: string }; title: string; time: string; location: string }[];
}> = ({ events }) => (
    <Row justify="center" gutter={[16, 16]} className="m-8 px-4 md:px-6 lg:px-12">
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
    <section className="mt-16 px-4 md:px-12 lg:px-24">
        <div className="text-center mb-8">
            <Title level={2}>Read Latest Articles</Title>
            <Paragraph className="max-w-[320px] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</Paragraph>
        </div>
        <Row gutter={[16, 16]}>
            {blogs.map((blog) => (
                <Col key={blog.id} xs={24} sm={12} md={8}>
                    <Link to="/blogdetails">
                        <Card hoverable cover={<img alt="blog" src={umbrella} className="h-[180px] object-cover" />}>
                            <Card.Meta
                                title="The Unseen of spending three years at Pixelgrade"
                                description={
                                    <Paragraph className="text-gray-500">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    </Paragraph>
                                }
                            />
                            <div className="flex items-center justify-between mt-4">
                                <Text strong>Continue Reading</Text>
                                <ArrowRightOutlined />
                            </div>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    </section>
);

export default Home;
