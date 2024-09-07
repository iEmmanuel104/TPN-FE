import React from 'react';
import { Layout, Typography, Row, Col, Space } from 'antd';
import { PhoneOutlined, EnvironmentOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const FooterLinks = [
    { title: 'Home', link: '/#' },
    { title: 'About', link: '/#about' },
    { title: 'Contact', link: '/#contact' },
    { title: 'Blog', link: '/#blog' },
];

const CustomFooter: React.FC = () => {
    return (
        <Footer className="bg-blue-200 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-7xl mx-auto">
                <Row gutter={[16, 32]} className="flex-col sm:flex-row">
                    <Col xs={24} sm={24} md={8} className="mb-8 sm:mb-0">
                        <Title level={3} className="text-primary tracking-widest uppercase text-lg sm:text-xl md:text-2xl">
                            Texas Prevention Network
                        </Title>
                        <Text className="text-gray-600 dark:text-black/70 block mt-3 text-sm sm:text-base">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </Text>
                    </Col>
                    <Col xs={24} sm={12} md={8} className="mb-8 sm:mb-0">
                        <Title level={4} className="text-lg sm:text-xl">
                            Important Links
                        </Title>
                        <Space direction="vertical" size="small" className="w-full">
                            {FooterLinks.map((link, index) => (
                                <Link key={index} href={link.link} className="text-gray-600 hover:text-black text-sm sm:text-base">
                                    {link.title}
                                </Link>
                            ))}
                        </Space>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Title level={4} className="text-lg sm:text-xl">
                            Address
                        </Title>
                        <Space direction="vertical" size="small" className="w-full">
                            <Text className="flex items-center text-sm sm:text-base">
                                <EnvironmentOutlined className="mr-2" />
                                43 bakers street, London
                            </Text>
                            <Text className="flex items-center text-sm sm:text-base">
                                <PhoneOutlined className="mr-2" />
                                +234 8185513597
                            </Text>
                            <Space size="large" className="mt-4">
                                <Link href="#" className="text-gray-600 hover:text-primary">
                                    <InstagramOutlined className="text-xl sm:text-2xl" />
                                </Link>
                                <Link href="https://wa.me/2348064203690" className="text-gray-600 hover:text-primary">
                                    <WhatsAppOutlined className="text-xl sm:text-2xl" />
                                </Link>
                            </Space>
                        </Space>
                    </Col>
                </Row>
            </div>
        </Footer>
    );
};

export default CustomFooter;
