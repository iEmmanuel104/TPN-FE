import React from 'react';
import { Table, Checkbox, Button, Dropdown, Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

const ActionsMenu = () => (
    <Menu>
        <Menu.Item key="accept">
            <Button type="link" className="text-green-500 p-0">
                Accept
            </Button>
        </Menu.Item>
        <Menu.Item key="details">
            <Button type="link" className="text-blue-500 p-0">
                Details
            </Button>
        </Menu.Item>
        <Menu.Item key="cancel">
            <Button type="link" className="text-red-500 p-0">
                Cancel
            </Button>
        </Menu.Item>
    </Menu>
);

const columns = [
    {
        title: () => <Checkbox />,
        dataIndex: 'checkbox',
        key: 'checkbox',
        render: () => <Checkbox />,
        width: 50,
    },
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
        render: () => (
            <Dropdown overlay={ActionsMenu} trigger={['click']}>
                <Button
                    icon={<MoreOutlined />}
                    className="border-none shadow-none"
                />
            </Dropdown>
        ),
        width: 50,
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
    {
        key: '2',
        name: 'Bradley Greer',
        coach: 'Brenden Wagner',
        date: '11 July 2021',
        time: '08:25',
    },
    {
        key: '3',
        name: 'Cedric Kelly',
        coach: 'Brielle Williamson',
        date: '10 May 2021',
        time: '02:30',
    },
    {
        key: '4',
        name: 'Caesar Vance',
        coach: 'Herrod Chandler',
        date: '09 April 2021',
        time: '09:30',
    },
    {
        key: '5',
        name: 'Rhona Davidson',
        coach: 'Sonya Frost',
        date: '08 March 2021',
        time: '09:15',
    },
    {
        key: '6',
        name: 'Bradley Greer',
        coach: 'Brenden Wagner',
        date: '11 July 2021',
        time: '10:00',
    },
];

const StudentList: React.FC = () => {
    return (
        <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="font-bold text-xl mb-4">Student List</h2>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                className="border border-gray-200 rounded-lg"
            />
        </div>
    );
};

export default StudentList;
