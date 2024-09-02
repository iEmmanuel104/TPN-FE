import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Avatar, Dropdown, Menu, Card, Carousel, Typography, Row, Col, Timeline, Collapse } from 'antd';
import { motion } from 'framer-motion';
import {
    SearchOutlined,
    UserOutlined,
    DownOutlined,
    StarFilled,
    CalendarOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import {
    FaGraduationCap,
    FaBookOpen,
    FaShieldAlt,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp,
    FaStar,
    FaLongArrowAltRight,
} from 'react-icons/fa';
import { SlGraduation } from 'react-icons/sl';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';

// Import your images here
import backgroundImage from '../assets/schoolwork.jpg';
import parentingImage from '../assets/parenting.jpeg';
import angerManageImage from '../assets/angermanage.jpg';
import domesticImage from '../assets/domesticviolence.jpeg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import umbrella from '../assets/umbrella.jpeg';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const LandingPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        // Implement search functionality here
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Settings</Menu.Item>
            <Menu.Item key="3" onClick={() => navigate('/login')}>
                Logout
            </Menu.Item>
        </Menu>
    );

    const NextStep: React.FC = () => (
        <Row gutter={[32, 32]} className="bg-white py-12">
            <Col span={12}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <img src={image2} alt="Experience" className="rounded-lg w-full h-48 object-cover" />
                        <Card className="mt-4 bg-green-500 text-white text-center">
                            <Title level={4} className="text-white">
                                7 years of
                            </Title>
                            <Text className="text-white">Experiences</Text>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="mb-4 text-center">
                            <Title level={4} className="text-violet-900">
                                300+
                            </Title>
                            <Text className="text-violet-900">Positive Reviews</Text>
                        </Card>
                        <img src={image3} alt="Reviews" className="rounded-lg w-full h-48 object-cover" />
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Title level={5} className="text-sm font-thin">
                    WHAT'S OUR MAIN GOAL
                </Title>
                <Title level={2} className="text-violet-900">
                    Take The Next Step Toward Your Personal Life With TexasPreventiveNetwork
                </Title>
                <Paragraph className="text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud.
                </Paragraph>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Card>
                            <Card.Meta
                                avatar={<Avatar icon={<SlGraduation />} className="bg-blue-600" />}
                                title="Learn From the Professional"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Card.Meta
                                avatar={<Avatar icon={<MdOutlineSlowMotionVideo />} className="bg-blue-600" />}
                                title="Video Tutorial"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );

    const Events: React.FC = () => (
        <Card title={<Title level={3}>Events</Title>} className="bg-gray-100">
            <Timeline>
                <Timeline.Item dot={<CalendarOutlined className="text-blue-600" />}>
                    <Card className="mb-4">
                        <Row align="middle" gutter={16}>
                            <Col>
                                <Title level={4} className="mb-0">
                                    15
                                </Title>
                                <Text>Oct</Text>
                            </Col>
                            <Col>
                                <Title level={4} className="mb-0">
                                    Eduma Autumn 2022
                                </Title>
                                <Text type="secondary">
                                    <ClockCircleOutlined className="mr-2" />
                                    8:00 am - 5:00 pm
                                    <EnvironmentOutlined className="ml-4 mr-2" />
                                    Venice, Italy
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                </Timeline.Item>
                <Timeline.Item dot={<CalendarOutlined className="text-blue-600" />}>
                    <Card>
                        <Row align="middle" gutter={16}>
                            <Col>
                                <Title level={4} className="mb-0">
                                    22
                                </Title>
                                <Text>Oct</Text>
                            </Col>
                            <Col>
                                <Title level={4} className="mb-0">
                                    Eduma Winter 2022
                                </Title>
                                <Text type="secondary">
                                    <ClockCircleOutlined className="mr-2" />
                                    9:00 am - 6:00 pm
                                    <EnvironmentOutlined className="ml-4 mr-2" />
                                    Paris, France
                                </Text>
                            </Col>
                        </Row>
                    </Card>
                </Timeline.Item>
            </Timeline>
        </Card>
    );

    const BlogCard: React.FC = () => (
        <Card hoverable cover={<img alt="blog" src={umbrella} className="h-48 object-cover" />} className="w-80">
            <Card.Meta
                title="The Unseen of spending three years at Pixelgrade"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
            />
            <Button type="link" className="mt-4 p-0 flex items-center">
                Continue Reading <FaLongArrowAltRight className="ml-2" />
            </Button>
        </Card>
    );

    const Faq: React.FC = () => (
        <Row gutter={[32, 32]} className="bg-white py-12">
            <Col span={8}>
                <Title level={2}>
                    Frequently <span className="text-violet-600">Asked</span> Questions
                </Title>
                <Paragraph className="text-gray-600">Everything you need to know about us</Paragraph>
            </Col>
            <Col span={16}>
                <Collapse bordered={false} expandIconPosition="right">
                    <Panel header="How can I learn from Texas Preventive network?" key="1">
                        <Paragraph>
                            TPN connects your business with targeted communities and professionals across the globe, enabling you to expand your
                            reach, engage with key audiences, and foster strategic partnerships.
                        </Paragraph>
                    </Panel>
                    <Panel header="What makes TPN different from other community rehabilitation platforms?" key="2">
                        <Paragraph>
                            TPN offers unique features tailored to community rehabilitation, including specialized courses, expert-led workshops, and
                            a supportive network of professionals in the field.
                        </Paragraph>
                    </Panel>
                    <Panel header="Can I target specific studies in TPN?" key="3">
                        <Paragraph>
                            Yes, TPN allows you to focus on specific areas of study within community rehabilitation, offering targeted courses and
                            resources to meet your specific learning needs.
                        </Paragraph>
                    </Panel>
                </Collapse>
            </Col>
        </Row>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        TPNetwork
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Search courses"
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-64"
                        />
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                <Avatar icon={<UserOutlined />} /> <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[450px] bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="relative z-10 flex justify-start px-24 pt-32">
                    <Card className="bg-white">
                        <Title level={4}>Course</Title>
                        <Title level={2}>Get The Best Addiction Courses</Title>
                        <Button type="primary" size="large" className="mt-4">
                            Get Started
                        </Button>
                    </Card>
                </div>
            </motion.div>

            {/* Features */}
            <div className="bg-gray-200 py-12">
                <div className="container mx-auto flex justify-around items-center">
                    <div className="flex items-center">
                        <FaGraduationCap className="text-3xl text-blue-600 mr-2" />
                        <span className="text-lg font-semibold">100,000 Online Courses</span>
                    </div>
                    <div className="flex items-center">
                        <FaBookOpen className="text-3xl text-blue-600 mr-2" />
                        <span className="text-lg font-semibold">Expert Instruction</span>
                    </div>
                    <div className="flex items-center">
                        <FaShieldAlt className="text-3xl text-blue-600 mr-2" />
                        <span className="text-lg font-semibold">Unlimited Lifetime Access</span>
                    </div>
                </div>
            </div>

            {/* Next Step Section */}
            <div className="container mx-auto py-16">
                <NextStep />
            </div>

            {/* Popular Courses */}
            <div className="container mx-auto py-16">
                <Row justify="space-between" align="middle" className="mb-8">
                    <Col>
                        <Title level={2}>Popular Courses</Title>
                        <Paragraph>Discover what people are learning</Paragraph>
                    </Col>
                    <Col>
                        <Button.Group>
                            <Button type="primary">Parenting</Button>
                            <Button>Anger Management</Button>
                            <Button>Alcohol Addiction</Button>
                            <Button>Domestic Violence</Button>
                        </Button.Group>
                    </Col>
                </Row>
                <Row gutter={[32, 32]}>
                    {[parentingImage, angerManageImage, domesticImage, domesticImage].map((image, index) => (
                        <Col span={6} key={index}>                            <Card
                                hoverable
                                cover={<img alt="course" src={image} className="h-48 object-cover" />}
                                actions={[
                                    <Text key="lectures">8 lectures</Text>,
                                    <div key="rating">
                                        <StarFilled className="text-yellow-400 mr-1" />
                                        4.5
                                    </div>,
                                ]}
                            >
                                <Card.Meta
                                    title={['Parenting', 'Anger Management', 'Domestic Violence', 'Domestic Violence'][index]}
                                    description="by Andrew Iwe"
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Events and Testimonials */}
            <Row gutter={32} className="container mx-auto py-16">
                <Col span={12}>
                    <Events />
                </Col>
                <Col span={12}>{/* Add Testimonials component here */}</Col>
            </Row>

            {/* Latest Articles */}
            <div className="container mx-auto py-16">
                <Title level={2} className="text-center">
                    Read Latest Articles
                </Title>
                <Paragraph className="text-center text-gray-500 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                </Paragraph>
                <Row gutter={[32, 32]} justify="center">
                    {[1, 2, 3].map((id) => (
                        <Col key={id}>
                            <Link to="/blogdetails">
                                <BlogCard />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* FAQ Section */}
            <div className="container mx-auto py-16">
                <Faq />
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">TPNetwork</h3>
                        <p>Empowering lives through education and support.</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li>
                                <Link to="/courses" className="hover:text-blue-400">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-blue-400">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-blue-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <FaFacebook className="text-2xl hover:text-blue-400 cursor-pointer" />
                            <FaInstagram className="text-2xl hover:text-blue-400 cursor-pointer" />
                            <FaLinkedin className="text-2xl hover:text-blue-400 cursor-pointer" />
                            <FaWhatsapp className="text-2xl hover:text-blue-400 cursor-pointer" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
