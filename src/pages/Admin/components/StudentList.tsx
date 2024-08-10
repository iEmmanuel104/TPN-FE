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
        render: () => <a>...</a>,
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
        <div className="bg-white p-4 shadow rounded">
            <h2 className="font-bold text-xl mb-4">Student List</h2>
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};

export default StudentList;
