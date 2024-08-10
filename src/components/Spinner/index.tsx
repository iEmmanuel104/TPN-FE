import React from 'react';

function Spinner({
    width,
    height,
    style,
}: {
    width?: string;
    height?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div className="flex justify-center items-center">
            <div
                className="border-4 border-t-white border-solid rounded-full animate-spin"
                style={{
                    width: width ? width : '100%',
                    height: height ? height : '100%',
                    borderColor: 'rgba(0, 0, 0, 0.1)',
                    ...style,
                }}
            ></div>
        </div>
    );
}

export default Spinner;
