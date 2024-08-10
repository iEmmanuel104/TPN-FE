// src/pages/Admin/components/Overview.tsx

import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, BookOutlined, DollarOutlined } from '@ant-design/icons';

const Overview: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Students"
                            value={3280}
                            prefix={<UserOutlined />}
                            suffix={
                                <span className="text-sm text-green-500">
                                    80% increase in 20 Days
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="New Students"
                            value={245}
                            prefix={<UserOutlined />}
                            suffix={
                                <span className="text-sm text-green-500">
                                    50% increase in 25 Days
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Total Courses"
                            value={28}
                            prefix={<BookOutlined />}
                            suffix={
                                <span className="text-sm text-green-500">
                                    75% increase in 20 Days
                                </span>
                            }
                        />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card>
                        <Statistic
                            title="Fees Collection"
                            value={25160}
                            prefix={<DollarOutlined />}
                            suffix={
                                <span className="text-sm text-green-500">
                                    30% increase in 30 Days
                                </span>
                            }
                        />
                    </Card>
                </Col>
            </Row>
            {/* Add more dashboard widgets here */}
        </div>
    );
};

export default Overview;
