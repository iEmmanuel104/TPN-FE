import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Card, Spin, Select } from 'antd';
import { useGetRevenueStatsQuery } from '../../../api/adminApi';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
);

const { Option } = Select;

const IncomeExpenseReport: React.FC = () => {
    const [timeFrame, setTimeFrame] = useState<string>('month');

    const {
        data: revenueStatsData,
        isLoading,
        error,
    } = useGetRevenueStatsQuery({ timeFrame });

    if (isLoading) {
        return (
            <Spin
                size="large"
                className="flex justify-center items-center h-64"
            />
        );
    }

    if (error) {
        return <div className="text-red-500">Error loading revenue stats</div>;
    }
    const revenueStats = revenueStatsData?.data;

    const data = {
        labels: revenueStats?.stats.map((stat) => stat.period) || [],
        datasets: [
            {
                label: 'Revenue',
                data: revenueStats?.stats.map((stat) => stat.revenue) || [],
                backgroundColor: '#003f5c',
            },
            {
                label: 'Enrollments',
                data: revenueStats?.stats.map((stat) => stat.enrollments) || [],
                backgroundColor: '#ffa600',
            },
        ],
    };

    const maxDataValue = Math.max(
        ...(revenueStats?.stats.map((stat) =>
            Math.max(stat.revenue, stat.enrollments),
        ) || [0]),
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Revenue and Enrollments Report',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxDataValue,
                ticks: {
                    maxTicksLimit: 8,
                    stepSize: Math.ceil(maxDataValue / 8),
                },
            },
        },
    };

    const handleTimeFrameChange = (value: string) => {
        setTimeFrame(value);
    };

    return (
        <Card className="w-full shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                    Revenue Report
                </h2>
                <Select
                    defaultValue="month"
                    style={{ width: 120 }}
                    onChange={handleTimeFrameChange}
                >
                    <Option value="month">Monthly</Option>
                    <Option value="week">Weekly</Option>
                    <Option value="day">Daily</Option>
                </Select>
            </div>
            <Bar data={data} options={options} />
            <div className="mt-4 text-right">
                <p className="text-lg font-semibold">
                    Total Revenue:{' '}
                    {revenueStats?.totalRevenue.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
            </div>
        </Card>
    );
};

export default IncomeExpenseReport;
