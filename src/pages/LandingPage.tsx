import React from 'react';
import { Layout, Typography, Button, Card, Rate, Row, Col, Avatar, List } from 'antd';
import { motion } from 'framer-motion';
import { ArrowRightOutlined, BookOutlined, ReadOutlined, SafetyCertificateOutlined, StarFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';

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

const Home = () => {
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
                <div className="flex flex-col min-h-screen">
                    <div className="flex-grow">
                        {/* Hero Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative h-[450px] w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${backgroundImage})` }}
                        >
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="relative z-10 flex justify-start px-24 pt-32">
                                <motion.div
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="bg-white py-10 px-6"
                                >
                                    <Paragraph className="text-black text-xl md:text-xl font-semibold">Course</Paragraph>
                                    <Title level={2} className="text-gray-600">
                                        Get The Best Addiction Courses
                                    </Title>
                                    <Button type="primary" size="large" className="mt-4">
                                        Get Started
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* UnderHero Section */}
                        <div className="bg-gray-300 w-full py-9">
                            <Row justify="center" gutter={32}>
                                {items.map((item, index) => (
                                    <Col key={index}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                            className="flex items-center"
                                        >
                                            {React.cloneElement(item.icon, { style: { fontSize: '35px', marginRight: '12px' } })}
                                            <Text strong className="text-xl">
                                                {item.text}
                                            </Text>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Next Step Section */}
                        <div className="px-[225px] pt-[120px]">
                            <NextStep />
                        </div>

                        {/* Popular Courses Section */}
                        <div className="mt-24 px-[230px]">
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <Title level={2}>Popular Courses</Title>
                                    <Paragraph>Discover what people are learning</Paragraph>
                                </Col>
                                <Col>
                                    <Row gutter={16}>
                                        <Col>
                                            <Button type="link">Parenting</Button>
                                        </Col>
                                        <Col>
                                            <Button type="link">Anger Management</Button>
                                        </Col>
                                        <Col>
                                            <Button type="link">Alcohol Addiction</Button>
                                        </Col>
                                        <Col>
                                            <Button type="link">Domestic Violence</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <Row justify="center" gutter={[32, 32]} className="py-9">
                            {[parenting, angermanage, domestic, domestic].map((image, index) => (
                                <Col key={index}>
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

                        {/* Events and Testimonials Section */}
                        <div className="bg-gray-100 py-16">
                            <Row justify="center" gutter={[32, 32]} className="max-w-7xl mx-auto">
                                <Col xs={24} md={12}>
                                    <Card className="h-full shadow-lg">
                                        <Title level={3} className="mb-6">
                                            Upcoming Events
                                        </Title>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={events}
                                            renderItem={(item, index) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.2 }}
                                                >
                                                    <List.Item className="border-b last:border-b-0">
                                                        <List.Item.Meta
                                                            avatar={
                                                                <div className="bg-blue-500 text-white text-center p-3 rounded-lg">
                                                                    <Text strong className="text-2xl block">
                                                                        {item.date.day}
                                                                    </Text>
                                                                    <Text className="text-sm block">{item.date.month}</Text>
                                                                </div>
                                                            }
                                                            title={
                                                                <Text strong className="text-xl">
                                                                    {item.title}
                                                                </Text>
                                                            }
                                                            description={
                                                                <div>
                                                                    <Text className="text-gray-500 block">{item.time}</Text>
                                                                    <Text className="text-gray-500 block">{item.location}</Text>
                                                                </div>
                                                            }
                                                        />
                                                    </List.Item>
                                                </motion.div>
                                            )}
                                        />
                                    </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                        <Card className="h-full shadow-lg">
                                            <Title level={3} className="mb-6">
                                                Testimonials
                                            </Title>
                                            <Paragraph className="text-lg mb-6">
                                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                                                et dolore magna aliqua. The courses here have transformed my career path!"
                                            </Paragraph>
                                            <div className="flex items-center">
                                                <Avatar
                                                    size={64}
                                                    src="https://www.shutterstock.com/shutterstock/photos/1865153395/display_1500/stock-photo-portrait-of-young-smiling-woman-looking-at-camera-with-crossed-arms-happy-girl-standing-in-1865153395.jpg"
                                                    className="mr-4"
                                                />
                                                <div>
                                                    <Title level={4} className="mb-0">
                                                        Antonia Bells
                                                    </Title>
                                                    <Paragraph className="text-green-600 font-semibold">Director of Biography</Paragraph>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Col>
                            </Row>
                        </div>

                        {/* Blog Section */}
                        <div className="text-center mt-12">
                            <Title level={2}>Read Latest Articles</Title>
                            <Paragraph className="max-w-[320px] mx-auto">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            </Paragraph>
                        </div>

                        <Row justify="center" gutter={[45, 45]} className="mt-12">
                            {blogs.map((blog) => (
                                <Col key={blog.id}>
                                    <Link to="/blogdetails">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Card
                                                hoverable
                                                style={{ width: 350 }}
                                                cover={<img alt="blog" src={umbrella} className="h-[180px] object-cover" />}
                                            >
                                                <Meta
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
                                        </motion.div>{' '}
                                    </Link>
                                </Col>
                            ))}
                        </Row>

                        {/* FAQ Section */}
                        <div className="flex justify-center">
                            <Faq />
                        </div>

                        <div className="mb-12"></div>
                        <Footer />
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
