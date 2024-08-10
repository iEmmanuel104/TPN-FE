import React from 'react';

type StatsCardProps = {
    title: string;
    value: string;
    progress: number;
    color: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    progress,
    color,
}) => {
    const gradientColor = {
        blue: 'from-blue-500 to-blue-300',
        red: 'from-red-500 to-red-300',
        green: 'from-green-500 to-green-300',
        yellow: 'from-yellow-500 to-yellow-300',
    }[color];

    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <div className="text-lg font-medium text-gray-700">{title}</div>
            <div className="text-3xl font-semibold text-gray-900">{value}</div>
            <div className="mt-2">
                <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                            style={{ width: `${progress}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r ${gradientColor}`}
                        />
                    </div>
                </div>
                <div className="text-sm text-gray-600">
                    {progress}% Increase in 30 Days
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
