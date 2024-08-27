/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useCloudinaryWidget.ts

import { useCallback } from 'react';
import { CLOUDINARY_CLOUD_NAME } from '../constants';

interface CloudinaryWidgetOptions {
    onSuccess: (url: string) => void;
    onError?: (error: Error) => void;
}

export const useCloudinaryWidget = ({ onSuccess, onError }: CloudinaryWidgetOptions) => {
    const openWidget = useCallback(() => {
        // @ts-expect-error Description: This error is expected because the 'createUploadWidget' function is not recognized by TypeScript.
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: 'tpn-presets',
            },
            (error: Error, result: any) => {
                if (!error && result && result.event === 'success') {
                    onSuccess(result.info.secure_url);
                } else if (error && onError) {
                    onError(error);
                }
            }
        );
        widget.open();
    }, [onSuccess, onError]);

    return { openWidget };
};