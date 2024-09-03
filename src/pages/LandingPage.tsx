import React from 'react';
import { Layout, Typography, Button, Card, Rate, Row, Col, Avatar, List } from 'antd';
import { motion } from 'framer-motion';
import { ArrowRightOutlined, BookOutlined, ReadOutlined, SafetyCertificateOutlined, StarFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import NextStep from '../components/NextStep';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

import backgroundImage from '../assets/schoolwork.jpg';
import parenting from '../assets/parenting.jpeg';
import angermanage from '../assets/angermanage.jpg';
import domestic from '../assets/domesticviolence.jpeg';
import umbrella from '../assets/umbrella.jpeg';

const { Content } = Layout;
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
        <Layout className="min-h-screen flex flex-col">
            <Navbar />
            <Content className="flex-grow">
                {/* Hero Section */}
                <HeroSection />

                {/* UnderHero Section */}
                <UnderHeroSection items={items} />

                {/* Next Step Section */}
                <section className="px-[225px] pt-[120px] md:px-12 lg:px-24 md:pt-24">
                    <NextStep />
                </section>

                {/* Popular Courses Section */}
                <PopularCoursesSection navigate={navigate} />

                {/* Events and Testimonials Section */}
                <EventsAndTestimonialsSection events={events} />

                {/* Blog Section */}
                <BlogSection blogs={blogs} />

                {/* FAQ Section */}
                <section className="flex justify-center px-4 md:px-12 lg:px-24 py-16">
                    <Faq />
                </section>

                <Footer />
            </Content>
        </Layout>
    );
};

const HeroSection: React.FC = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative h-[450px] w-full bg-cover bg-center"
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
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Card
                            hoverable
                            cover={<img alt="course" src={image} className="h-40 object-cover" />}
                            onClick={() => navigate('/coursedetails')}
                        >
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
                    </motion.div>
                </Col>
            ))}
        </Row>
    </section>
);

const EventsAndTestimonialsSection: React.FC<{
    events: { date: { day: number; month: string }; title: string; time: string; location: string }[];
}> = ({ events }) => (
    <Row justify="center" gutter={[16, 16]} className="mt-16 px-4 md:px-12 lg:px-24">
        <Col xs={24} md={12}>
            <Card className="bg-gray-100 w-full">
                <Title level={3} className="text-center">
                    Events
                </Title>
                <List
                    itemLayout="horizontal"
                    dataSource={events}
                    renderItem={(item) => (
                        <List.Item className="border-b-0">
                            <List.Item.Meta
                                avatar={
                                    <div className="text-center p-2 rounded bg-white">
                                        <Text strong className="text-xl block">
                                            {item.date.day}
                                        </Text>
                                        <Text className="text-xl block">{item.date.month}</Text>
                                    </div>
                                }
                                title={
                                    <Text strong className="text-lg">
                                        {item.title}
                                    </Text>
                                }
                                description={<Text className="text-gray-500">{`${item.time} ${item.location}`}</Text>}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </Col>
        <Col xs={24} md={12}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="bg-gray-100 px-6 py-6">
                    <Title level={3}>Testimonials</Title>
                    <Paragraph className="max-w-[400px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Paragraph>
                    <div className="flex mt-4 items-center">
                        <Avatar
                            size={64}
                            src="https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg"
                            className="mr-4"
                        />
                        <div>
                            <Title level={4} className="mb-0">
                                Antonia Bells
                            </Title>
                            <Paragraph className="text-green-600 font-semibold">Director Biography</Paragraph>
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
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
                        </motion.div>
                    </Link>
                </Col>
            ))}
        </Row>
    </section>
);

export default Home;
