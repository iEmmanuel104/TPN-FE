// FinancialReport.tsx

import React from 'react';
import { Column } from '@ant-design/plots';

const FinancialReport: React.FC = () => {
    const data = [
        { year: '2006', type: 'Income', value: 200 },
        { year: '2006', type: 'Expense', value: 100 },
        { year: '2007', type: 'Income', value: 150 },
        { year: '2007', type: 'Expense', value: 80 },
        { year: '2008', type: 'Income', value: 180 },
        { year: '2008', type: 'Expense', value: 90 },
        { year: '2009', type: 'Income', value: 220 },
        { year: '2009', type: 'Expense', value: 110 },
        // Add more financial data here
    ];

    const config = {
        data,
        isGroup: true,
        xField: 'year',
        yField: 'value',
        seriesField: 'type',
        label: {
            position: 'middle',
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ],
        },
        color: ['#ff9900', '#003366'],
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Income/Expense Report</h2>
            <Column {...config} />
        </div>
    );
};

export default FinancialReport;
