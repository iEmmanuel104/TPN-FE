import React from 'react';
import { Row, Col, Typography, Card } from 'antd';
import { BookOutlined, VideoCameraOutlined, GlobalOutlined, UserOutlined, ReadOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import image2 from '../assets/event-7.jpg';
import image3 from '../assets/event-4.jpg';

const { Title, Paragraph } = Typography;

const AnimatedNumber = ({
    value,
    label,
    icon,
    color,
    delay,
}: {
    value: number;
    label: string;
    icon: React.ReactNode;
    color: string;
    delay: number;
}) => (
    <motion.div
        className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
    >
        <div className={`text-${color}-500 text-5xl mb-4`}>{icon}</div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: delay + 0.5 }}>
            <span className={`text-4xl font-bold text-${color}-500 block`}>{value}</span>
            <span className="text-gray-600 text-lg">{label}</span>
        </motion.div>
        <motion.div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-${color}-500`}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
        />
    </motion.div>
);

const NextStep: React.FC = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="bg-white px-0 sm:px-12 mb-12">
                <Row gutter={[32, 32]} className="flex flex-wrap">
                    <Col xs={24} lg={16} className="flex flex-col">
                        <Row gutter={[16, 16]} className="h-full">
                            <Col xs={24} sm={12} className="flex flex-col">
                                <img src={image2} alt="Experience" className="w-full flex-grow object-cover" style={{ minHeight: '200px' }} />
                                <Card className="mt-3 bg-green-500 text-white text-center">
                                    <Paragraph strong className="mb-0">
                                        7 years of
                                    </Paragraph>
                                    <Paragraph className="mb-0">Experiences</Paragraph>
                                </Card>
                            </Col>
                            <Col xs={24} sm={12} className="flex flex-col">
                                <Card className="mb-3 text-purple-900 text-center flex-grow">
                                    <Title level={4} className="mb-0">
                                        300+
                                    </Title>
                                    <Paragraph className="mb-0">Positive Reviews</Paragraph>
                                </Card>
                                <img src={image3} alt="Reviews" className="w-full flex-grow object-cover" style={{ minHeight: '200px' }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={24} lg={8} className="flex flex-col justify-between">
                        <div>
                            <Paragraph className="text-sm text-purple-600 font-semibold mb-2">WHAT'S OUR MAIN GOAL</Paragraph>
                            <Title level={2} className="text-purple-400 mb-4">
                                Take The Next Step Toward Your Personal Life With TPN
                            </Title>
                            <Paragraph className="text-gray-600 mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam, quis nostrud.
                            </Paragraph>
                        </div>
                        <div>
                            <Card className="bg-blue-50 border-0 mb-4">
                                <Card.Meta
                                    avatar={<BookOutlined className="text-2xl text-blue-600" />}
                                    title={<span className="text-lg font-semibold">Learn From the Professional</span>}
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                                />
                            </Card>
                            <Card className="bg-blue-50 border-0">
                                <Card.Meta
                                    avatar={<VideoCameraOutlined className="text-2xl text-blue-600" />}
                                    title={<span className="text-lg font-semibold">Video Tutorial</span>}
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                                />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="py-16">
                <Title level={1} className="text-center mb-4 text-4xl font-bold">
                    Learn With Passion To Live With Purpose.
                </Title>
                <Paragraph className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
                    Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a cras semper auctonvallis a cras semper
                    aucto.
                </Paragraph>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="sm:mt-12">
                        <AnimatedNumber value={94532} label="Foreign Followers" icon={<GlobalOutlined />} color="green" delay={0} />
                    </div>
                    <div>
                        <AnimatedNumber value={11223} label="Classes Complete" icon={<ReadOutlined />} color="blue" delay={0.2} />
                    </div>
                    <div className="sm:mt-12">
                        <AnimatedNumber value={25678} label="Students Enrolled" icon={<UserOutlined />} color="yellow" delay={0.4} />
                    </div>
                    <div>
                        <AnimatedNumber value={2678} label="Certified Teachers" icon={<SafetyCertificateOutlined />} color="red" delay={0.6} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NextStep;
