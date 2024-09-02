import { Row, Col, Typography, Card } from 'antd';
import { CarOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';

const { Title, Paragraph } = Typography;

const NextStep = () => {
    return (
        <Row gutter={[32, 32]} className="bg-white">
            <Col span={12}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <img src={image2} alt="Experience" className="w-full h-[200px] object-cover rounded-lg" />
                        </motion.div>
                        <Card className="mt-3 bg-green-500 text-white text-center">
                            <Paragraph strong>7 years of</Paragraph>
                            <Paragraph>Experiences</Paragraph>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className="mb-3 text-violet-900 text-center">
                            <Title level={4}>300+</Title>
                            <Paragraph>Positive Reviews</Paragraph>
                        </Card>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <img src={image3} alt="Reviews" className="w-full h-[200px] object-cover rounded-lg" />
                        </motion.div>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Paragraph className="text-sm">WHAT'S OUR MAIN GOAL</Paragraph>
                <Title level={2} className="text-violet-900">
                    Take The Next Step Toward Your Personal Life With TexasPreventiveNetwork
                </Title>
                <Paragraph className="text-gray-800">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud.
                </Paragraph>
                <Row gutter={[16, 16]} className="mt-3">
                    <Col span={24}>
                        <Card>
                            <Card.Meta
                                avatar={<CarOutlined className="text-3xl text-blue-600" />}
                                title="Learn From the Professional"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card>
                            <Card.Meta
                                avatar={<VideoCameraOutlined className="text-3xl text-blue-600" />}
                                title="Video Tutorial"
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
