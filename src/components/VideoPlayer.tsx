/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/components/VideoPlayer.tsx
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    SoundOutlined,
    ForwardOutlined,
    BackwardOutlined,
    SettingOutlined,
    CloseOutlined,
    BulbOutlined,
    BulbFilled,
    AppstoreOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,
} from '@ant-design/icons';
import { List, Switch, Select, Slider } from 'antd';
import { formatTime } from '../utils/formatTime';
import { useUpdateModuleWatchProgressMutation } from '../api/moduleApi';
import { useDispatch, useSelector } from 'react-redux'; // Add this import
import { updateUserCourseProgress, markModuleAsCompleted } from '../state/slices/courseSlice'; // Add this import
import { RootState } from '../state/store'; // Add this import
import React from 'react';

interface Frame {
    title: string;
    timestamp: number;
}

interface VideoPlayerProps {
    url?: string;
    className?: string;
    videoId: string;
    courseId?: string;
    isModule?: boolean;
    frames?: Frame[];
    onVideoWatched?: (videoId: string) => void;
    initialProgress?: {
        currentTime: number;
        episodeNumber: number;
    };
    watchedEps?: number[];
}

const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(
    ({ url, className = '', videoId, courseId, isModule = false, frames, onVideoWatched, initialProgress, watchedEps }, ref) => {
        const dispatch = useDispatch(); // Add this line
        const [updateModuleWatchProgress] = useUpdateModuleWatchProgressMutation();
        const { currentEpisodeNumber } = useSelector((state: RootState) => state.course); // Add this line

        const [isPlaying, setIsPlaying] = useState(false);
        const [currentTime, setCurrentTime] = useState(initialProgress?.currentTime || 0);
        const [isMuted, setIsMuted] = useState(false);
        const [isUserActive, setIsUserActive] = useState(false);
        const [showSettings, setShowSettings] = useState(false);
        const [playbackSpeed, setPlaybackSpeed] = useState(1);
        const [showFrames, setShowFrames] = useState(false);
        const [isLightOn, setIsLightOn] = useState(true);
        const playerRef = useRef<ReactPlayer>(null);
        const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
        const [isFullscreen, setIsFullscreen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);
        const episodeNumberRef = useRef(initialProgress?.episodeNumber || currentEpisodeNumber || 1);

        const [duration, setDuration] = useState(0);
        const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
        const completionMarkedRef = useRef(false);

        useEffect(() => {
            if (initialProgress && playerRef.current) {
                playerRef.current.seekTo(initialProgress.currentTime);
            }
        }, [initialProgress]);

        const handlePlayPause = () => {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
                if (playerRef.current?.getDuration() === currentTime) {
                    setCurrentTime(0);
                }
                playerRef.current!.seekTo(currentTime);
            } else {
                console.log('paused');
                // Update progress when pausing
                updateProgress();
            }
        };

        const handleSeekChange = (value: number) => {
            setCurrentTime(value);
            playerRef.current!.seekTo(value);
        };

        const handleRewind = () => {
            const newTime = Math.max(currentTime - 15, 0);
            setCurrentTime(newTime);
            playerRef.current!.seekTo(newTime);
        };

        const handleForward = () => {
            const newTime = Math.min(currentTime + 15, playerRef.current!.getDuration());
            setCurrentTime(newTime);
            playerRef.current!.seekTo(newTime);
        };

        const handleMute = () => {
            setIsMuted((prev) => !prev);
        };

        const toggleSettings = () => {
            setShowSettings(!showSettings);
        };

        const handleUserActivity = () => {
            setIsUserActive(true);
            if (controlsTimeoutRef.current) {
                clearTimeout(controlsTimeoutRef.current);
            }
            controlsTimeoutRef.current = setTimeout(() => {
                setIsUserActive(false);
            }, 3000);
        };

        const handleFrameClick = (timestamp: number) => {
            setCurrentTime(timestamp);
            playerRef.current!.seekTo(timestamp);
            setIsPlaying(true);
        };

        const toggleFrames = () => {
            setShowFrames(!showFrames);
        };

        const toggleLight = () => {
            setIsLightOn(!isLightOn);
        };

        const toggleFullscreen = () => {
            if (!document.fullscreenElement) {
                containerRef.current?.requestFullscreen();
                setIsFullscreen(true);
            } else {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        };

        useEffect(() => {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && isFullscreen) {
                    document.exitFullscreen();
                    setIsFullscreen(false);
                }
            };

            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [isFullscreen]);

        const updateProgress = useCallback(async () => {
            const currentTimeInSeconds = Math.floor(currentTime);
            if (isModule && courseId && currentTime > 0 && episodeNumberRef.current) {
                if (!watchedEps || !watchedEps.includes(episodeNumberRef.current)) {
                    try {
                        const response = await updateModuleWatchProgress({
                            id: videoId,
                            currentTime: currentTimeInSeconds,
                            episodeNumber: episodeNumberRef.current,
                        }).unwrap();

                        if (response.data) {
                            dispatch(updateUserCourseProgress(response.data));
                        }
                    } catch (error) {
                        console.error('Failed to update module watch progress:', error);
                    }
                }
            }
        }, [isModule, courseId, currentTime, videoId, dispatch, updateModuleWatchProgress, watchedEps]);

        useEffect(() => {
            if (isPlaying) {
                progressIntervalRef.current = setInterval(() => {
                    if (playerRef.current) {
                        setCurrentTime(playerRef.current.getCurrentTime());
                    }
                }, 1000);
            } else {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
                updateProgress();
            }

            return () => {
                if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                }
            };
        }, [isPlaying, updateProgress]);

        useEffect(() => {
            const shouldMarkComplete = currentTime / duration >= 0.85 && !completionMarkedRef.current;
            if (shouldMarkComplete && isModule && courseId && episodeNumberRef.current) {
                if (!watchedEps || !watchedEps.includes(episodeNumberRef.current)) {
                    completionMarkedRef.current = true;
                    onVideoWatched && onVideoWatched(videoId);
                    dispatch(
                        markModuleAsCompleted({
                            courseId,
                            moduleId: videoId,
                            episodeNumber: episodeNumberRef.current,
                        }),
                    );
                    updateModuleWatchProgress({
                        id: videoId,
                        currentTime: Math.floor(currentTime),
                        episodeNumber: episodeNumberRef.current,
                        completed: true,
                    }).then((response) => {
                     if ('data' in response && response.data && response.data.data) {
                         dispatch(updateUserCourseProgress(response.data.data));
                     }
                    });
                }
            }
        }, [currentTime, duration, videoId, isModule, courseId, dispatch, updateModuleWatchProgress, onVideoWatched, watchedEps]);

        const handleDuration = (duration: number) => {
            setDuration(duration);
        };

        const SettingsMenu = () => {
            return (
                <motion.div
                    className="absolute bottom-full right-0 mb-2 rounded-lg bg-black bg-opacity-75 p-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <div className="mb-2">
                        <Switch checked={isMuted} onChange={handleMute} checkedChildren="Unmute" unCheckedChildren="Mute" />
                    </div>
                    <div>
                        <span className="mr-2">Speed:</span>
                        <Select value={playbackSpeed} onChange={(value) => setPlaybackSpeed(value)} style={{ width: 80 }}>
                            <Select.Option value={0.5}>0.5x</Select.Option>
                            <Select.Option value={1}>1x</Select.Option>
                            <Select.Option value={1.5}>1.5x</Select.Option>
                            <Select.Option value={2}>2x</Select.Option>
                        </Select>
                    </div>
                </motion.div>
            );
        };

        return (
            <div
                className={`relative aspect-video h-full w-full overflow-hidden rounded-lg ${isLightOn ? 'bg-black' : 'bg-gray-900'} ${className}`}
                ref={(node) => {
                    if (typeof ref === 'function') {
                        ref(node);
                    } else if (ref) {
                        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }
                    {/* @ts-expect-error */}
                    containerRef.current = node;
                }}
                onMouseMove={handleUserActivity}
                onTouchStart={handleUserActivity}
                onTouchMove={handleUserActivity}
                onScroll={handleUserActivity}
            >
                {!isLightOn && <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>}
                <ReactPlayer
                    url={url || 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4'}
                    className="aspect-video"
                    width="100%"
                    height="100%"
                    playing={isPlaying}
                    playbackRate={playbackSpeed}
                    muted={isMuted}
                    ref={playerRef}
                    onDuration={handleDuration} // Add this line
                    config={{
                        file: {
                            attributes: {
                                controlsList: 'nodownload',
                            },
                        },
                    }}
                    onProgress={(progress) => {
                        const currentTime = progress.played * playerRef.current!.getDuration();
                        setCurrentTime(currentTime);
                    }}
                />

                {/* Center Controls */}
                <motion.div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isUserActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                        <BackwardOutlined className="text-2xl text-white cursor-pointer sm:text-3xl md:text-4xl lg:text-5xl" onClick={handleRewind} />
                        {isPlaying ? (
                            <PauseCircleOutlined
                                className="text-3xl text-white cursor-pointer sm:text-4xl md:text-5xl lg:text-6xl"
                                onClick={handlePlayPause}
                            />
                        ) : (
                            <PlayCircleOutlined
                                className="text-3xl text-white cursor-pointer sm:text-4xl md:text-5xl lg:text-6xl"
                                onClick={handlePlayPause}
                            />
                        )}
                        <ForwardOutlined className="text-2xl text-white cursor-pointer sm:text-3xl md:text-4xl lg:text-5xl" onClick={handleForward} />
                    </div>
                </motion.div>

                {/* Bottom Controls */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white sm:p-3 md:p-4 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isUserActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="mb-1 flex justify-between text-xs sm:mb-2 sm:text-sm">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(playerRef.current?.getDuration() || 0)}</span>
                    </div>
                    <Slider min={0} max={playerRef.current?.getDuration() || 0} value={currentTime} onChange={handleSeekChange} tipFormatter={null} />
                    <div className="mt-1 flex items-center justify-between sm:mt-2">
                        <div className="flex items-center">
                            <SoundOutlined
                                className={`text-lg cursor-pointer sm:text-xl md:text-2xl mr-2 ${isMuted ? 'text-gray-400' : 'text-white'}`}
                                onClick={handleMute}
                            />
                            {isLightOn ? (
                                <BulbFilled className="text-lg cursor-pointer sm:text-xl md:text-2xl text-yellow-400 mr-2" onClick={toggleLight} />
                            ) : (
                                <BulbOutlined className="text-lg cursor-pointer sm:text-xl md:text-2xl text-white mr-2" onClick={toggleLight} />
                            )}
                        </div>
                        <div className="flex items-center">
                            <AppstoreOutlined className="text-lg cursor-pointer sm:text-xl md:text-2xl text-white mr-2" onClick={toggleFrames} />
                            {isFullscreen ? (
                                <FullscreenExitOutlined
                                    className="text-lg cursor-pointer sm:text-xl md:text-2xl text-white mr-2"
                                    onClick={toggleFullscreen}
                                />
                            ) : (
                                <FullscreenOutlined
                                    className="text-lg cursor-pointer sm:text-xl md:text-2xl text-white mr-2"
                                    onClick={toggleFullscreen}
                                />
                            )}
                            <div className="relative">
                                <SettingOutlined className="text-lg cursor-pointer sm:text-xl md:text-2xl" onClick={toggleSettings} />
                                <AnimatePresence>{showSettings && <SettingsMenu />}</AnimatePresence>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Frames List */}
                <AnimatePresence>
                    {showFrames && frames && (
                        <motion.div
                            className="absolute right-0 top-0 h-full w-1/4 bg-black bg-opacity-90 p-4 overflow-y-auto"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-white font-semibold text-sm">Video Frames</div>
                                <CloseOutlined className="text-white cursor-pointer" onClick={toggleFrames} />
                            </div>
                            <List
                                size="small"
                                dataSource={frames}
                                renderItem={(frame) => (
                                    <List.Item
                                        onClick={() => handleFrameClick(frame.timestamp)}
                                        className="cursor-pointer text-white hover:bg-gray-800 transition-colors duration-200"
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium text-xs text-white">
                                                {frame.title} - {formatTime(frame.timestamp)}
                                            </span>
                                        </div>
                                    </List.Item>
                                )}
                                className="bg-transparent"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    },
);

VideoPlayer.displayName = 'VideoPlayer';
const MemoizedVideoPlayer = React.memo(VideoPlayer);
export default MemoizedVideoPlayer;
