import React from 'react';

type StatsCardProps = {
    title: string;
    value: string;
    progress: number;
    color: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, progress, color }) => {
    return (
        <div className="p-4 bg-white shadow rounded">
            <div className="text-xl font-semibold">{title}</div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="mt-2">
                <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                        <div
                            style={{ width: `${progress}%` }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${color}-500`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCard;
