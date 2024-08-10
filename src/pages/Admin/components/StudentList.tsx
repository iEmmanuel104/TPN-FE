// src/pages/Admin/components/StudentList.tsx

import React from 'react';
import { Table } from 'antd';

const columns = [
    {
        title: 'Student Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Assigned Coach',
        dataIndex: 'coach',
        key: 'coach',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: () => <a>Details</a>,
    },
];

const data = [
    {
        key: '1',
        name: 'Angelica Ramos',
        coach: 'Ashton Cox',
        date: '12 August 2021',
        time: '10:15',
    },
    // Add more student data here
];

const StudentList: React.FC = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Student List</h2>
            <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default StudentList;
