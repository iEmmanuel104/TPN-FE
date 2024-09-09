import { Collapse, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import faqData from '../constants/faqData.json';

const { Panel } = Collapse;
const { Title, Paragraph } = Typography;

const Faq = () => {
    const faqItems = faqData.faqQuestions;

    return (
        <div className="bg-white px-4 mx-auto lg:px-12 py-6 mt-6">
            <Row gutter={[16, 16]} align="top">
                <Col xs={24} md={24}>
                    <Title level={3} className="font-semibold italic mb-0 text-center">
                        Frequently <span className="text-violet-600 font-bold not-italic">Asked</span> Questions
                    </Title>
                    <Paragraph className="text-gray-600 text-sm mt-1 text-center">Everything you need to know about us</Paragraph>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                        className="site-collapse-custom-collapse"
                    >
                        {faqItems.slice(0, Math.ceil(faqItems.length / 2)).map((item, index) => (
                            <Panel
                                header={<span className="text-sm font-medium">{item.question}</span>}
                                key={index}
                                className="bg-gray-100 mb-2 rounded-md overflow-hidden"
                            >
                                <Paragraph className="text-gray-500 text-xs max-w-full text-ellipsis overflow-hidden">{item.answer}</Paragraph>
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
                <Col xs={24} md={12}>
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}
                        className="site-collapse-custom-collapse"
                    >
                        {faqItems.slice(Math.ceil(faqItems.length / 2)).map((item, index) => (
                            <Panel
                                header={<span className="text-sm font-medium">{item.question}</span>}
                                key={index + Math.ceil(faqItems.length / 2)}
                                className="bg-gray-100 mb-2 rounded-md overflow-hidden"
                            >
                                <Paragraph className="text-gray-500 text-xs max-w-full text-ellipsis overflow-hidden">{item.answer}</Paragraph>
                            </Panel>
                        ))}
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export default Faq;
