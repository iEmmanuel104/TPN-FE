import React, { useState, useEffect, useRef } from 'react';
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
import { useGetRevenueStatsQuery } from '../../api/adminApi';

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
    const [chartWidth, setChartWidth] = useState<number>(0);
    const chartRef = useRef<HTMLDivElement>(null);

    const {
        data: revenueStatsData,
        isLoading,
        error,
    } = useGetRevenueStatsQuery({ timeFrame });

    useEffect(() => {
        const updateChartWidth = () => {
            if (chartRef.current) {
                setChartWidth(chartRef.current.offsetWidth);
            }
        };

        updateChartWidth();
        window.addEventListener('resize', updateChartWidth);

        return () => {
            window.removeEventListener('resize', updateChartWidth);
        };
    }, []);

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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    boxWidth: 10,
                    font: {
                        size: chartWidth < 400 ? 10 : 12,
                    },
                },
            },
            title: {
                display: true,
                text: 'Revenue and Enrollments Report',
                font: {
                    size: chartWidth < 400 ? 14 : 16,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: maxDataValue,
                ticks: {
                    maxTicksLimit: chartWidth < 400 ? 5 : 8,
                    stepSize: Math.ceil(
                        maxDataValue / (chartWidth < 400 ? 5 : 8),
                    ),
                    font: {
                        size: chartWidth < 400 ? 10 : 12,
                    },
                },
            },
            x: {
                ticks: {
                    font: {
                        size: chartWidth < 400 ? 10 : 12,
                    },
                },
            },
        },
    };

    const handleTimeFrameChange = (value: string) => {
        setTimeFrame(value);
    };

    return (
        <Card className="w-full shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
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
            <div
                ref={chartRef}
                className={`w-full ${chartWidth < 400 ? 'h-[300px]' : 'h-[400px]'}`}
            >
                <Bar data={data} options={options} />
            </div>
            <div className="mt-4 text-right">
                <p className="text-base sm:text-lg font-semibold">
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
