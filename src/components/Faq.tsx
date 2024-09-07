import { Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const Faq = () => {
    const faqItems = [
        {
            question: 'How can I learn from Texas Prevention network?',
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
        <div className="bg-white px-4 mx-auto lg:px-[300px] py-9 mt-9">
            <Row gutter={[32, 0]} align="top">
                <Col xs={24} md={8}>
                    <Title level={3} className="font-semibold italic mb-0">
                        Frequently <span className="text-violet-600 font-bold not-italic">Asked</span>
                    </Title>
                    <Title level={3} className="text-violet-600 font-bold mt-0">
                        Questions
                    </Title>
                    <Paragraph className="text-gray-600 text-md mt-1">Everything you need to know about us</Paragraph>
                </Col>
                <Col xs={24} md={16}>
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                        className="site-collapse-custom-collapse"
                    >
                        {faqItems.map((item, index) => (
                            <Panel
                                header={<span className="text-lg font-medium">{item.question}</span>}
                                key={index}
                                className="bg-gray-100 mb-3 rounded-md overflow-hidden"
                            >
                                <Paragraph className="text-gray-500 max-w-full text-ellipsis overflow-hidden">{item.answer}</Paragraph>
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export default Faq;
