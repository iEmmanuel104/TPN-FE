import { useEffect, useRef } from 'react';

export const CircleImage = ({ src }: { src: string }) => {
    const circleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function resizeImage() {
            const width = circleRef.current?.offsetWidth;
            if (width) {
                circleRef.current!.style.height = `${width}px`;
            }
        }

        // Call resizeImage initially and add it as a listener for window resize
        resizeImage();
        window.addEventListener('resize', resizeImage);

        // Remove event listener on component unmount
        return () => window.removeEventListener('resize', resizeImage);
    }, []);

    const circleStyle = {
        width: '50px', // Set the initial width as needed
        height: '50px', // Initial height, will be adjusted dynamically
        borderRadius: '50%',
        overflow: 'hidden', // Clip the image to the circle
    };

    return (
        <div style={circleStyle} ref={circleRef}>
            <img
                src={src}
                alt="Background"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Maintain aspect ratio, cover entire area
                }}
            />
            {/* Your content goes here */}
        </div>
    );
};
