import React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import PublicLayout from '../components/PublicLayout';

const { Title, Paragraph } = Typography;

const ContactInfo = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card className="h-full text-center">
        <div className="text-4xl mb-4 flex justify-center">{icon}</div>
        <Title level={3}>{title}</Title>
        {children}
    </Card>
);

const ContactPage = () => {
    return (
        <PublicLayout>
            <div className="container mx-auto px-4 py-8">
                <Title>Contact</Title>
                <Row gutter={[24, 24]} className="mt-8">
                    <Col xs={24} md={8}>
                        <ContactInfo icon={<EnvironmentOutlined className="text-blue-500" />} title="Address">
                            <Paragraph>1800 Abbot Kinney Blvd. Unit D & E Venice</Paragraph>
                        </ContactInfo>
                    </Col>
                    <Col xs={24} md={8}>
                        <ContactInfo icon={<PhoneOutlined className="text-green-500" />} title="Contact Info">
                            <Paragraph>Mobile: (+88) - 1990 - 6886</Paragraph>
                            <Paragraph>Hotline: 1800 - 1102</Paragraph>
                            <Paragraph>Mail: contact@eduma.com</Paragraph>
                        </ContactInfo>
                    </Col>
                    <Col xs={24} md={8}>
                        <ContactInfo icon={<ClockCircleOutlined className="text-yellow-500" />} title="Work Timer">
                            <Paragraph>Monday - Friday: 09:00 - 20:00</Paragraph>
                            <Paragraph>Sunday & Saturday: 10:30 - 22:0</Paragraph>
                        </ContactInfo>
                    </Col>
                </Row>

                {/* You could add a contact form here */}
            </div>
        </PublicLayout>
    );
};

export default ContactPage;
