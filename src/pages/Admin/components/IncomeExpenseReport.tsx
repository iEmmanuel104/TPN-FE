import React from 'react';
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

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
);

const data = {
    labels: ['2006', '2007', '2008', '2009'],
    datasets: [
        {
            label: 'Income',
            data: [200, 240, 280, 300],
            backgroundColor: '#003f5c',
        },
        {
            label: 'Expense',
            data: [150, 200, 250, 220],
            backgroundColor: '#ffa600',
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
    },
};

const IncomeExpenseReport: React.FC = () => {
    return (
        <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl mb-4">Income/Expense Report</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default IncomeExpenseReport;
