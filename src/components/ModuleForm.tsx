/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message, Spin, Tooltip, Table } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useGetModulesByCourseQuery, useAddModuleMutation, useUpdateModuleMutation, useDeleteModuleMutation, ModuleDto } from '../api/moduleApi';
import { useCloudinaryWidget } from '../hooks/useCloudinaryWidget';
import VideoPlayer from './VideoPlayer';
import { formatVideoLength } from '../utils/formatVideoLength';
import { getVideoDuration } from '../utils/videoUtils';

const { TextArea } = Input;

interface ModuleFormProps {
    courseId: string;
}

interface Frame {
    title: string;
    timestamp: number;
}

const ModuleForm: React.FC<ModuleFormProps> = ({ courseId }) => {
    const [form] = Form.useForm<Partial<ModuleDto>>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingModule, setEditingModule] = useState<ModuleDto | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [frames, setFrames] = useState<Frame[]>([]);
    const [videoLength, setVideoLength] = useState<number | null>(null);

    const { data: modules, isLoading, refetch } = useGetModulesByCourseQuery({ courseId });
    const [addModule] = useAddModuleMutation();
    const [updateModule] = useUpdateModuleMutation();
    const [deleteModule] = useDeleteModuleMutation();

    const { openWidget: openVideoWidget } = useCloudinaryWidget({
        onSuccess: async (url) => {
            setVideoUrl(url);
            setIsVideoLoading(true);
            try {
                const duration = await getVideoDuration(url);
                setVideoLength(duration);
                form.setFieldsValue({
                    url,
                    videoInfo: { length: duration },
                });
            } catch (error) {
                console.error('Failed to get video duration:', error);
                message.error('Failed to get video duration');
            } finally {
                setIsVideoLoading(false);
            }
        },
        onClose: () => {
            setIsVideoLoading(false);
        },
    });
    useEffect(() => {
        if (videoLength !== null) {
            form.setFieldsValue({
                videoInfo: { length: videoLength },
            });
        }
    }, [videoLength, form]);

    const showModal = (module?: ModuleDto) => {
        if (module) {
            setVideoLength(module.videoInfo?.length || null);
            setEditingModule(module);
            form.setFieldsValue(module);
            setVideoUrl(module.url);
            setFrames(module.frames || []);
            form.setFieldsValue({
                videoInfo: { length: videoLength as number },
            });
        } else {
            setEditingModule(null);
            form.resetFields();
            setVideoUrl(null);
            setFrames([]);
            setVideoLength(null);
        }
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const moduleData = { ...values, frames, courseId };

            if (editingModule) {
                await updateModule({ id: editingModule.id, module: moduleData }).unwrap();
                message.success('Module updated successfully');
            } else {
                await addModule(moduleData).unwrap();
                message.success('Module added successfully');
            }
            setIsModalVisible(false);
            refetch(); // Refetch the modules data after update or add
        } catch (error) {
            console.error('Failed to save module:', error);
            message.error('Failed to save module');
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteModule({ id }).unwrap();
            message.success('Module deleted successfully');
            refetch(); // Refetch the modules data after delete
        } catch (error) {
            console.error('Failed to delete module:', error);
            message.error('Failed to delete module');
        }
    };

    const onDragEnd = async (result: DropResult) => {
        if (!result.destination || !modules?.data) {
            return;
        }

        const items = Array.from(modules.data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedModules = items.map((item, index) => ({
            ...item,
            episodeNumber: index + 1,
        }));

        try {
            for (const module of updatedModules) {
                await updateModule({ id: module.id, module: { episodeNumber: module.episodeNumber } }).unwrap();
            }
            message.success('Module order updated successfully');
        } catch (error) {
            console.error('Failed to update module order:', error);
            message.error('Failed to update module order');
        }
    };

    const handleOpenVideoWidget = () => {
        setIsVideoLoading(true);
        openVideoWidget();
    };

    const handleAddFrame = () => {
        const newFrame: Frame = { title: `Frame ${frames.length + 1}`, timestamp: 0 };
        setFrames([...frames, newFrame]);
    };

    const handleUpdateFrame = (index: number, field: keyof Frame, value: string | number) => {
        const updatedFrames = frames.map((frame, i) => (i === index ? { ...frame, [field]: value } : frame));
        setFrames(updatedFrames);
    };

    const handleDeleteFrame = (index: number) => {
        const updatedFrames = frames.filter((_, i) => i !== index);
        setFrames(updatedFrames);
    };

    const columns = [
        {
            title: 'Episode',
            dataIndex: 'episodeNumber',
            key: 'episodeNumber',
            width: 80,
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Video Length',
            dataIndex: ['videoInfo', 'length'],
            key: 'videoLength',
            render: (length: number) => formatVideoLength(length),
        },
        {
            title: 'Frames',
            dataIndex: 'frames',
            key: 'frames',
            render: (frames: Frame[]) => (
                <Tooltip title="Frames are specific points in the video that can be bookmarked">
                    <span>
                        {frames?.length || 0} <InfoCircleOutlined />
                    </span>
                </Tooltip>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: ModuleDto) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => showModal(record)} className="mr-2" />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
                </>
            ),
        },
    ];

    if (isLoading) {
        return <Spin size="large" />;
    }

    return (
        <div className="max-w-full mx-auto">
            <Button icon={<PlusOutlined />} onClick={() => showModal()} className="mb-4">
                Add Module
            </Button>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="modules">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Table
                                dataSource={modules?.data}
                                columns={columns}
                                rowKey="id"
                                pagination={false}
                                components={{
                                    body: {
                                        wrapper: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />,
                                        row: (props: React.HTMLAttributes<HTMLTableRowElement> & { 'data-row-key': string }) => {
                                            const { children, className, ...restProps } = props;
                                            const index = modules?.data?.findIndex((item: ModuleDto) => item.id === restProps['data-row-key']) ?? -1;
                                            return (
                                                <Draggable draggableId={restProps['data-row-key']} index={index} key={restProps['data-row-key']}>
                                                    {(provided, snapshot) => (
                                                        <tr
                                                            ref={provided.innerRef}
                                                            {...restProps}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`${className} ${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                                                        >
                                                            {children}
                                                        </tr>
                                                    )}
                                                </Draggable>
                                            );
                                        },
                                    },
                                }}
                            />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <Modal
                title={editingModule ? 'Edit Module' : 'Add Module'}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => {
                    setIsModalVisible(false);
                    refetch(); // Refetch the modules data when modal is closed
                }}
                maskClosable={false}
                width={800}
            >
                <Form form={form} layout="vertical" size="small">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                            <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                                <TextArea rows={3} />
                            </Form.Item>
                            <div className="grid grid-cols-2 gap-4">
                                <Form.Item
                                    name="episodeNumber"
                                    label="Episode Number"
                                    rules={[{ required: true, message: 'Please input the episode number!' }]}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item
                                    name={['videoInfo', 'length']}
                                    label="Video Length (seconds)"
                                    rules={[{ required: true, message: 'Please input the video length!' }]}
                                >
                                    <Input
                                        type="number"
                                        disabled
                                        value={videoLength !== null ? videoLength : undefined}
                                        onChange={(e) => setVideoLength(Number(e.target.value))}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <Form.Item name="url" label="Video" rules={[{ required: true, message: 'Please upload a video!' }]}>
                                <div className="media-container h-64 w-full relative border border-dashed border-gray-300 rounded-md overflow-hidden mx-auto">
                                    {videoUrl ? (
                                        <>
                                            <VideoPlayer
                                                url={videoUrl}
                                                videoId={editingModule?.id || ''}
                                                className="w-full h-full object-cover"
                                                frames={frames}
                                            />
                                            {/* <div className="absolute top-2 right-2 z-10 ">
                                                <Button
                                                    icon={<EditOutlined />}
                                                    onClick={handleOpenVideoWidget}
                                                    loading={isVideoLoading}
                                                    size="small"
                                                    className="bg-black bg-opacity-50 text-white border-none hover:bg-black hover:bg-opacity-75"
                                                >
                                                    {isVideoLoading ? 'Loading...' : 'Edit'}
                                                </Button>
                                            </div> */}
                                        </>
                                    ) : (
                                        <div
                                            className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-300"
                                            onClick={handleOpenVideoWidget}
                                        >
                                            <div className="text-center">
                                                {isVideoLoading ? (
                                                    <Spin />
                                                ) : (
                                                    <>
                                                        <UploadOutlined className="text-xl mb-2" />
                                                        <p className="text-sm">Upload Video</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-sm font-semibold mb-2">Frames</h3>
                        <Table
                            dataSource={frames}
                            columns={[
                                {
                                    title: 'Title',
                                    dataIndex: 'title',
                                    key: 'title',
                                    render: (text: string, _: any, index: number) => (
                                        <Input
                                            value={text}
                                            onChange={(e) => handleUpdateFrame(index, 'title', e.target.value)}
                                            className="text-xs"
                                            size="small"
                                        />
                                    ),
                                },
                                {
                                    title: 'Timestamp',
                                    dataIndex: 'timestamp',
                                    key: 'timestamp',
                                    render: (value: number, _: any, index: number) => (
                                        <Tooltip title="Enter timestamp in seconds">
                                            <Input
                                                type="number"
                                                value={value}
                                                onChange={(e) => handleUpdateFrame(index, 'timestamp', parseFloat(e.target.value))}
                                                className="text-xs"
                                                size="small"
                                            />
                                        </Tooltip>
                                    ),
                                },
                                {
                                    title: 'Actions',
                                    key: 'actions',
                                    render: (_: any, __: any, index: number) => (
                                        <Button onClick={() => handleDeleteFrame(index)} icon={<DeleteOutlined />} danger size="small" />
                                    ),
                                },
                            ]}
                            pagination={false}
                            size="small"
                        />
                        <Button onClick={handleAddFrame} icon={<PlusOutlined />} className="mt-2" size="small">
                            Add Frame
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ModuleForm;
