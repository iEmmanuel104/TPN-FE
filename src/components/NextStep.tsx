import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { BookOutlined, VideoCameraOutlined } from '@ant-design/icons';

import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const { Title, Paragraph } = Typography;

const NextStep: React.FC = () => {
    return (
        <Row gutter={[32, 32]} className="bg-white px-12">
            <Col xs={24} md={12}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <img src={image2} alt="Experience" className="h-[200px] object-cover rounded-lg" />
                        <Card className="mt-3 bg-green-500 text-white text-center">
                            <Paragraph strong className="mb-0">
                                7 years of
                            </Paragraph>
                            <Paragraph className="mb-0">Experiences</Paragraph>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Card className="mb-3 text-purple-900 text-center">
                            <Title level={4} className="mb-0">
                                300+
                            </Title>
                            <Paragraph className="mb-0">Positive Reviews</Paragraph>
                        </Card>
                        <img src={image3} alt="Reviews" className="h-[200px] object-cover rounded-lg" />
                    </Col>
                </Row>
            </Col>
            <Col xs={24} md={12}>
                <Paragraph className="text-sm text-purple-600 font-semibold mb-2">WHAT'S OUR MAIN GOAL</Paragraph>
                <Title level={2} className="text-purple-400 mb-4">
                    Take The Next Step Toward Your Personal Life With TexasPreventiveNetwork
                </Title>
                <Paragraph className="text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud.
                </Paragraph>
                <Row gutter={[0, 16]}>
                    <Col span={24}>
                        <Card className="bg-blue-50 border-0">
                            <Card.Meta
                                avatar={<BookOutlined className="text-2xl text-blue-600" />}
                                title={<span className="text-lg font-semibold">Learn From the Professional</span>}
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card className="bg-blue-50 border-0">
                            <Card.Meta
                                avatar={<VideoCameraOutlined className="text-2xl text-blue-600" />}
                                title={<span className="text-lg font-semibold">Video Tutorial</span>}
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            />
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default NextStep;
