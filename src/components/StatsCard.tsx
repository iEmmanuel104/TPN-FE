import React from 'react';
import { Card, Progress, Tooltip } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

type StatsCardProps = {
    title: string;
    stats: { label: string; value: string | number }[];
    progress?: number;
    color: string;
};

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    stats,
    progress,
    color,
}) => {
    const colorMap = {
        blue: 'text-blue-500',
        red: 'text-red-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
    };

    const textColor =
        colorMap[color as keyof typeof colorMap] || 'text-gray-900';

    return (
        <Card title={title} className="p-1 sm:p-1">
            <div className="grid grid-cols-2 gap-1">
                {stats.map((stat, index) => (
                    <Tooltip key={index} title={stat.label}>
                        <div className="flex flex-col">
                            <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 truncate">
                                {stat.label}
                            </span>
                            <span
                                className={`text-xs xs:text-sm sm:text-base font-semibold ${textColor}`}
                            >
                                {stat.value}
                            </span>
                        </div>
                    </Tooltip>
                ))}
            </div>
            {progress !== undefined && (
                <div className="mt-1 sm:mt-2">
                    <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                        <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500">
                            {progress >= 0 ? 'Increase' : 'Decrease'} from last
                            month
                        </span>
                        <span className="text-[8px] xs:text-[10px] sm:text-xs font-semibold flex items-center">
                            {progress >= 0 ? (
                                <ArrowUpOutlined className="text-green-500 mr-0.5" />
                            ) : (
                                <ArrowDownOutlined className="text-red-500 mr-0.5" />
                            )}
                            {Math.abs(progress).toFixed(2)}%
                        </span>
                    </div>
                    <Progress
                        percent={Math.abs(progress)}
                        showInfo={false}
                        strokeColor={color}
                        trailColor="#f0f0f0"
                        size="small"
                    />
                </div>
            )}
        </Card>
    );
};

export default StatsCard;
