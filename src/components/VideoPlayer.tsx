// src/components/VideoPlayer.tsx
import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

interface VideoPlayerProps {
    url: string;
    className?: string;
    videoId: string;
    onVideoWatched?: (videoId: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
    url,
    className = '',
    videoId,
    onVideoWatched,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef<ReactPlayer>(null);

    console.log(url);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className={`relative ${className}`}>
            <ReactPlayer
                url={url}
                width="100%"
                height="auto"
                playing={isPlaying}
                ref={playerRef}
                onProgress={(progress) => {
                    if (progress.playedSeconds > 30 && onVideoWatched) {
                        onVideoWatched(videoId);
                    }
                }}
            />
            <Button
                icon={
                    isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
                }
                onClick={handlePlayPause}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
};

export default VideoPlayer;
