import React from 'react';
import { Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const Faq = () => {
    const faqItems = [
        {
            question: 'How can I learn from Texas Preventive network?',
            answer: 'TPN connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships.',
        },
        {
            question: 'What makes TPN different from other community rehabilitation platforms?',
            answer: 'TPN connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships.',
        },
        {
            question: 'Can I target specific studies in TPN?',
            answer: 'TPN connects your business with targeted communities and professionals across the globe, enabling you to expand your reach, engage with key audiences, and foster strategic partnerships.',
        },
    ];

    return (
        <div className="bg-white px-4 mx-auto lg:px-[300px] py-9 font-nunito mt-9">
            <Row gutter={32}>
                <Col span={8}>
                    <Title level={2} className="italic">
                        Frequently <span className="text-violet-600 font-bold not-italic">Asked</span>
                    </Title>
                    <Title level={2} className="text-violet-600">
                        Questions
                    </Title>
                    <Paragraph className="text-gray-600">Everything you need to know about us</Paragraph>
                </Col>
                <Col span={16}>
                    <Collapse bordered={false} expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                        <AnimatePresence>
                            {faqItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Panel header={item.question} key={index} className="bg-gray-100 mb-3 rounded-md">
                                        <Paragraph>{item.answer}</Paragraph>
                                    </Panel>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export default Faq;
