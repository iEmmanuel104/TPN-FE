import React from 'react';
import { Layout, Typography, Row, Col, Space } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterLinks = [
    { title: 'Home', link: '/' },
    { title: 'Courses', link: '/courses' },
    { title: 'Blog', link: '/blogs' },
    { title: 'About Us', link: '/#about-us' },
    { title: 'Contact', link: '/contact' },
    { title: 'FAQs', link: '/#faq' },
    { title: 'Events', link: '/events' },
];

const CustomFooter: React.FC = () => {
    return (
        <Footer style={{ backgroundColor: '#333333', padding: '48px 24px' }}>
            <div className="max-w-7xl mx-auto">
                <Row gutter={[16, 32]} className="flex-col sm:flex-row">
                    <Col xs={24} sm={24} md={8} className="mb-8 sm:mb-0">
                        <Title level={3} className="tracking-widest uppercase text-lg sm:text-xl md:text-2xl" style={{ color: 'white' }}>
                            Texas Prevention Network
                        </Title>
                        <Text className="block mt-3 text-sm sm:text-base" style={{ color: '#999999' }}>
                            Our platform offers a wide range of courses to help you build valuable skills and knowledge for a fulfilling life and
                            career. From vocational training to personal development, our courses cover a wide range of topics And many more! Our
                            comprehensive program is designed to support your personal growth, helping you acquire practical skills, explore new
                            interests, and gain confidence for a successful future.
                        </Text>
                    </Col>
                    <Col xs={24} sm={12} md={8} className="mb-8 sm:mb-0">
                        <Title level={4} className="text-lg sm:text-xl" style={{ color: 'white' }}>
                            Important Links
                        </Title>
                        <Space direction="vertical" size="small" className="w-full">
                            {FooterLinks.map((link, index) => (
                                <Link key={index} to={link.link} className="text-sm sm:text-base hover:underline" style={{ color: '#999999' }}>
                                    {link.title}
                                </Link>
                            ))}
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} className="text-lg sm:text-xl" style={{ color: 'white' }}>
                            Address
                        </Title>
                        <Space direction="vertical" size="small" className="w-full">
                            <Text className="flex items-center text-sm sm:text-base" style={{ color: '#999999' }}>
                                <EnvironmentOutlined className="mr-2" />
                                43 bakers street, London
                            </Text>
                            <Text className="flex items-center text-sm sm:text-base" style={{ color: '#999999' }}>
                                <PhoneOutlined className="mr-2" />
                                +234 8185513597
                            </Text>
                            <Space size="large" className="mt-4">
                                <a href="#" className="hover:opacity-80" style={{ color: '#999999' }}>
                                    <InstagramOutlined className="text-xl sm:text-2xl" />
                                </a>
                                <a href="https://wa.me/2348064203690" className="hover:opacity-80" style={{ color: '#999999' }}>
                                    <WhatsAppOutlined className="text-xl sm:text-2xl" />
                                </a>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default CustomFooter;
