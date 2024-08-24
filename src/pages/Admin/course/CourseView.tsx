// src/pages/Admin/course/CourseView.tsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
    Card,
    Button,
    Tag,
    Descriptions,
    Divider,
    Rate,
    List,
    Typography,
    Collapse,
    Avatar,
} from 'antd';
import { TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import DashboardLayout from '../../../components/DashboardLayout';
import { useGetSingleCourseInfoQuery } from '../../../api/courseApi';
import VideoPlayer from '../../../components/VideoPlayer';
import { formatVideoLength } from '../../../utils/formatVideoLength';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const CourseView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {
        data: courseData,
        isLoading,
        error,
    } = useGetSingleCourseInfoQuery({ id: (id as string) ?? '' });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading course</div>;

    const course = courseData?.data;

    if (!course) return <div>Course not found</div>;

    return (
        <DashboardLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-gray-500">
                    <Link to="/iadmin/courses">Courses</Link> {' > '}
                    <Link to={`/iadmin/courses/${id}`}>{course.title}</Link>
                    {' > '}
                    Details
                </p>
            </div>
            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        {course.media.previewVideo ? (
                            <VideoPlayer
                                url={course.media.previewVideo}
                                videoId={course.id}
                                className="w-full h-64 rounded-lg"
                            />
                        ) : (
                            <img
                                src={course.media.videoThumbnail}
                                alt={course.title}
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        )}
                    </div>
                    <div>
                        <Descriptions
                            title="Course Information"
                            layout="vertical"
                            bordered
                        >
                            <Descriptions.Item label="Price">
                                {course.currency.symbol}
                                {course.price}
                            </Descriptions.Item>
                            <Descriptions.Item label="Level">
                                {course.level}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {course.status}
                            </Descriptions.Item>
                            <Descriptions.Item label="Rating">
                                <Rate
                                    disabled
                                    defaultValue={course.stats.overallRating}
                                />{' '}
                                ({course.stats.ratingCount} reviews)
                            </Descriptions.Item>
                            <Descriptions.Item label="Students">
                                {course.stats.numberOfPaidStudents}
                            </Descriptions.Item>
                            <Descriptions.Item label="Modules">
                                {course.stats.numberOfModules}
                            </Descriptions.Item>
                        </Descriptions>
                        <div className="mt-4">
                            <Title level={4}>Categories:</Title>
                            {course.category.map((cat, index) => (
                                <Tag
                                    key={index}
                                    color="blue"
                                    className="mr-1 mb-1"
                                >
                                    {cat}
                                </Tag>
                            ))}
                        </div>
                    </div>
                </div>
                <Divider />
                <div>
                    <Title level={3}>Description</Title>
                    <Text>{course.description}</Text>
                </div>
                <Divider />
                <div>
                    <Title level={3}>Requirements</Title>
                    <ul className="list-disc list-inside">
                        {course.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>
                <Divider />
                <div>
                    <Title level={3}>Modules</Title>
                    <Collapse accordion>
                        {course.modules.map((module, index) => (
                            <Panel
                                header={`${index + 1}. ${module.title} - ${formatVideoLength(module.videoInfo?.length || 0)}`}
                                key={module.id}
                            >
                                <Text>{module.description}</Text>
                                <VideoPlayer
                                    url={module.url}
                                    videoId={module.id}
                                    frames={module.frames}
                                    className="mt-4"
                                />
                            </Panel>
                        ))}
                    </Collapse>
                </div>
                <Divider />
                <div>
                    <Title level={3}>Instructor</Title>
                    <Card className="mt-4">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start">
                            <div className="mb-4 sm:mb-0 sm:mr-4 w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36">
                                <Avatar
                                    className="w-full h-full"
                                    src={
                                        course.instructor.info.profilePictureUrl
                                    }
                                    alt={course.instructor.name}
                                />
                            </div>
                            <div className="ml-4 flex-grow">
                                <Title level={4}>
                                    {course.instructor.name}
                                </Title>
                                <Paragraph className="text-gray-500">
                                    {course.instructor.email}
                                </Paragraph>
                                <Paragraph>{course.instructor.bio}</Paragraph>
                                {course.instructor.socials && (
                                    <div className="mt-2">
                                        {course.instructor.socials.x && (
                                            <a
                                                href={
                                                    course.instructor.socials.x
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mr-4 text-blue-500 hover:text-blue-700"
                                            >
                                                <TwitterOutlined /> Twitter
                                            </a>
                                        )}
                                        {course.instructor.socials.linkedin && (
                                            <a
                                                href={
                                                    course.instructor.socials
                                                        .linkedin
                                                }
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                <LinkedinOutlined /> LinkedIn
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
                <Divider />
                <div>
                    <Title level={3}>Reviews</Title>
                    <List
                        dataSource={course.reviews}
                        renderItem={(review) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <Rate
                                            disabled
                                            defaultValue={review.rating}
                                        />
                                    }
                                    description={review.comment}
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <Divider />
                <div className="flex justify-end">
                    <Link to={`/iadmin/courses/${id}/edit`}>
                        <Button type="primary" className="mr-2">
                            Edit Course
                        </Button>
                    </Link>
                    <Button danger>Delete Course</Button>
                </div>
            </Card>
        </DashboardLayout>
    );
};

export default CourseView;
