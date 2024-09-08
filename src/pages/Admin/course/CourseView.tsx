// src/pages/Admin/course/CourseView.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Button, Tag, Descriptions, Divider, Rate, List, Typography, Collapse, Avatar, Row, Col, Progress } from 'antd';
import { TwitterOutlined, LinkedinOutlined, UserOutlined, ReadOutlined, FileTextOutlined, PlayCircleOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/Admin/DashboardLayout';
import { useGetSingleCourseInfoQuery } from '../../../api/courseApi';
import VideoPlayer from '../../../components/VideoPlayer';
import { formatVideoLength } from '../../../utils/formatVideoLength';
import QuillContent from '../../../components/Admin/QuillContent';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const CourseView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: courseData, isLoading, error } = useGetSingleCourseInfoQuery({ id: (id as string) ?? '' });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading course</div>;

    const course = courseData?.data;

    if (!course) return <div>Course not found</div>;

    const totalDuration = course.modules.reduce((acc, module) => acc + (module.videoInfo?.length || 0), 0);

    return (
        <DashboardLayout>
            <div className="mb-4">
                <h1 className="text-xl font-bold">{course.title}</h1>
                <p className="text-xs text-gray-500">
                    <Link to="/iadmin/courses">Courses</Link> {' > '}
                    <Link to={`/iadmin/courses/${id}`}>{course.title}</Link>
                    {' > '} Details
                </p>
            </div>
            <Card>
                <Row gutter={16}>
                    <Col span={16}>
                        {course.media.previewVideo ? (
                            <VideoPlayer url={course.media.previewVideo} videoId={course.id} className="w-full h-full rounded-lg" />
                        ) : (
                            <img src={course.media.videoThumbnail} alt={course.title} className="w-full h-80 object-cover rounded-lg" />
                        )}
                    </Col>
                    <Col span={8}>
                        <Descriptions size="small" column={1} bordered>
                            <Descriptions.Item label="Price">
                                <Text strong>
                                    {course.currency.symbol}
                                    {course.price}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Students">
                                <Text>
                                    <UserOutlined /> {course.stats.numberOfPaidStudents}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Modules">
                                <Text>
                                    <ReadOutlined /> {course.stats.numberOfModules}
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Rating">
                                <Rate disabled defaultValue={course.stats.overallRating} style={{ fontSize: '12px' }} />
                                <Text className="ml-2 text-xs">({course.stats.ratingCount} reviews)</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Level">{course.level}</Descriptions.Item>
                            <Descriptions.Item label="Status">{course.status}</Descriptions.Item>
                            <Descriptions.Item label="Categories">
                                {course.category.map((cat, index) => (
                                    <Tag key={index} color="blue" className="mr-1 mb-1 text-xs">
                                        {cat}
                                    </Tag>
                                ))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Assessment">
                                {course.assessment?.hasAssessment && course.assessment.benchmark
                                    ? `Yes (Benchmark: ${course?.assessment?.benchmark ? course.assessment.benchmark * 100 : 0}%)`
                                    : 'No'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Certificate">Available</Descriptions.Item>
                        </Descriptions>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                    <Col span={16}>
                        <Card title="Description" size="small">
                            <Paragraph className="text-sm">
                                <QuillContent content={course.description} />
                            </Paragraph>
                        </Card>
                        <Card title="Requirements" size="small" className="mt-4">
                            <ul className="list-disc list-inside text-sm">
                                {course.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Instructor" size="small">
                            <div className="flex items-center">
                                <Avatar size={48} src={course.instructor.info.profilePictureUrl} alt={course.instructor.name} />
                                <div className="ml-4">
                                    <Text strong className="text-sm">
                                        {course.instructor.name}
                                    </Text>
                                    <br />
                                    <Text className="text-xs text-gray-500">{course.instructor.email}</Text>
                                </div>
                            </div>
                            <Paragraph className="text-xs mt-2">
                                <QuillContent content={course?.instructor.bio} />
                            </Paragraph>
                            {course.instructor.socials && (
                                <div className="mt-2">
                                    {course.instructor.socials.x && (
                                        <Button
                                            icon={<TwitterOutlined />}
                                            href={course.instructor.socials.x}
                                            target="_blank"
                                            size="small"
                                            className="mr-2"
                                        >
                                            Twitter
                                        </Button>
                                    )}
                                    {course.instructor.socials.linkedin && (
                                        <Button icon={<LinkedinOutlined />} href={course.instructor.socials.linkedin} target="_blank" size="small">
                                            LinkedIn
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Card>
                    </Col>
                </Row>
                <Divider />
                <Title level={5}>Course Content</Title>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card>
                            <Collapse accordion className="mb-4">
                                {course.modules
                                    .slice()
                                    .sort((a, b) => a.episodeNumber - b.episodeNumber)
                                    .map((module) => (
                                        <Panel
                                            header={
                                                <div className="flex justify-between items-center">
                                                    <Text strong>{`Module ${module.episodeNumber}: ${module.title}`}</Text>
                                                    <Text className="text-gray-500">{formatVideoLength(module.videoInfo?.length || 0)}</Text>
                                                </div>
                                            }
                                            key={module.id}
                                        >
                                            <Paragraph className="text-sm mb-2">
                                                <QuillContent content={module.description} />
                                            </Paragraph>
                                            <VideoPlayer url={module.url} videoId={module.id} frames={module.frames} className="mb-4" />
                                            <List
                                                size="small"
                                                dataSource={[
                                                    {
                                                        icon: <PlayCircleOutlined />,
                                                        text: 'Video Lecture',
                                                        duration: formatVideoLength(module.videoInfo?.length || 0),
                                                    },
                                                    {
                                                        icon: <FileTextOutlined />,
                                                        text: 'Reading Material',
                                                        duration: '10 mins',
                                                    },
                                                ]}
                                                renderItem={(item) => (
                                                    <List.Item>
                                                        <List.Item.Meta avatar={item.icon} title={item.text} description={item.duration} />
                                                    </List.Item>
                                                )}
                                            />
                                        </Panel>
                                    ))}
                            </Collapse>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Title level={5}>Course Overview</Title>
                            <Progress percent={30} status="active" />
                            <Text className="block mt-1 text-xs">
                                {course.modules.length} modules • {formatVideoLength(totalDuration)}
                            </Text>
                            <Divider />
                            <Title level={5}>Learning Outcomes</Title>
                            <ul className="list-disc list-inside">
                                {course.learningOutcome.map((outcome, index) => (
                                    <li key={index} className="text-xs mb-1">
                                        {outcome}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </Col>
                </Row>
                <Title level={5}>Student Reviews</Title>
                <List
                    size="small"
                    itemLayout="horizontal"
                    dataSource={course.reviews}
                    renderItem={(review) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar icon={<UserOutlined />} size="small" />}
                                title={<Rate disabled defaultValue={review.rating} style={{ fontSize: '12px' }} />}
                                description={<Text className="text-xs">{review.comment}</Text>}
                            />
                        </List.Item>
                    )}
                />
                <Divider />
                <div className="flex justify-end">
                    <Link to={`/iadmin/courses/${id}/edit`}>
                        <Button type="primary" size="small" className="mr-2">
                            Edit Course
                        </Button>
                    </Link>
                    <Button danger size="small">
                        Delete Course
                    </Button>
                </div>
            </Card>
        </DashboardLayout>
    );
};

export default CourseView;
