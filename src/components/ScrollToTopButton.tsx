import React, { useState, useEffect } from 'react';
import { BackTop } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const ProgressiveBackTop = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            setProgress(scrollPercentage);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <BackTop>
            <div style={{ position: 'relative', width: 40, height: 40 }}>
                <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="10" />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1890ff"
                        strokeWidth="10"
                        strokeDasharray={`${progress * 2.83} 283`}
                        transform="rotate(-90 50 50)"
                    />
                </svg>
                <UpOutlined
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: '#1890ff',
                    }}
                />
            </div>
        </BackTop>
    );
};

export default ProgressiveBackTop;
