/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useCloudinaryWidget.ts

import { useCallback, useState } from 'react';
import { CLOUDINARY_CLOUD_NAME } from '../constants';

interface CloudinaryWidgetOptions {
    onSuccess: (url: string) => void;
    onError?: (error: Error) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

export const useCloudinaryWidget = ({ onSuccess, onError, onOpen, onClose }: CloudinaryWidgetOptions) => {
    const [isLoading, setIsLoading] = useState(false);

    const openWidget = useCallback(() => {
        setIsLoading(true);
        if (onOpen) onOpen();

        // @ts-expect-error Description: This error is expected because the 'createUploadWidget' function is not recognized by TypeScript.
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: 'tpn-presets',
                sources: ['local', 'url', 'camera'],
                showAdvancedOptions: true,
                cropping: true,
                multiple: false,
                defaultSource: 'local',
                maxFiles: 1,
                clientAllowedFormats: ['image', 'video'],
                resourceType: 'auto',
                acceptedFiles: '.jpg,.jpeg,.png,.gif,.mp4,.mov,.avi,.webm',
                croppingAspectRatio: 16 / 9,
                croppingValidateDimensions: true,
                styles: {
                    palette: {
                        window: '#FFFFFF',
                        windowBorder: '#90A0B3',
                        tabIcon: '#0078FF',
                        menuIcons: '#5A616A',
                        textDark: '#000000',
                        textLight: '#FFFFFF',
                        link: '#0078FF',
                        action: '#FF620C',
                        inactiveTabIcon: '#0E2F5A',
                        error: '#F44235',
                        inProgress: '#0078FF',
                        complete: '#20B832',
                        sourceBg: '#E4EBF1'
                    },
                    fonts: {
                        default: null,
                        "'Fira Sans', sans-serif": {
                            url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
                            active: true
                        }
                    }
                }
            },
            (error: Error, result: any) => {
                if (!error && result && result.event === 'success') {
                    onSuccess(result.info.secure_url);
                    setIsLoading(false);
                } else if (error && onError) {
                    onError(error);
                    setIsLoading(false);
                }

                if (result.event === 'close') {
                    setIsLoading(false);
                    if (onClose) onClose();
                }
            }
        );
        widget.open();
    }, [onSuccess, onError, onOpen, onClose]);

    return { openWidget, isLoading };
};