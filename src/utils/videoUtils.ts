// utils/videoUtils.ts

export const getVideoDuration = (url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.onloadedmetadata = () => {
            resolve(Math.floor(video.duration));
        };
        video.onerror = () => {
            reject(new Error('Failed to load video metadata'));
        };
        video.src = url;
    });
};