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

const CustomFooter = () => {
    return (
        <Footer className="bg-blue-200">
            <div className="container mx-auto">
                <Row gutter={[32, 32]}>
                    <Col xs={24} md={8}>
                        <Title level={3} className="text-primary tracking-widest uppercase">
                            Texas Preventive Network
                        </Title>
                        <Text className="text-gray-600 dark:text-black/70 lg:pr-24 block mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua.
                        </Text>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={4}>Important Links</Title>
                        <Space direction="vertical">
                            {FooterLinks.map((link, index) => (
                                <Link key={index} href={link.link} className="text-gray-600 hover:text-black">
                                    {link.title}
                                </Link>
                            ))}
                        </Space>
                    </Col>
                    <Col xs={24} md={8}>
                        <Title level={4}>Address</Title>
                        <Space direction="vertical" size="large">
                            <Text>
                                <EnvironmentOutlined className="mr-2" />
                                43 bakers street, London
                            </Text>
                            <Text>
                                <PhoneOutlined className="mr-2" />
                                +234 8185513597
                            </Text>
                            <Space size="large">
                                <Link href="#">
                                    <InstagramOutlined className="text-2xl hover:text-primary" />
                                </Link>
                                <Link href="https://wa.me/2348064203690">
                                    <WhatsAppOutlined className="text-2xl hover:text-primary" />
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
