import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { SortableTable } from '../../components/SortableTable';
import './style.scss';

import supportData from './data.json';
import { useMemo } from 'react';

export const SupportDetails = () => {
    const data = useMemo(() => supportData, []);

    const supportCOlumns = [
        {
            header: '',
            accessorKey: 'image',
            cell: (data: any) => (
                <div className="flex items-stretch self-center m-0">
                    <img
                        src={data.row.original.image}
                        height={50}
                        width={50}
                        className="rounded-full m-0 self-end"
                    />
                </div>
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: (data: any) => (
                <div>
                    <p>{data.row.original.name}</p>
                    <p className="subtext text-xs">
                        #{data.row.original.userID}
                    </p>
                </div>
            ),
        },
        {
            header: 'Issue',
            accessorKey: 'issue',
            enableResizing: false, //disable resizing for just this column
            size: 100,
            cell: (data: any) => (
                <div>
                    <p>{data.row.original.issue}</p>
                </div>
            ),
        },
        {
            header: 'Date issued',
            accessorKey: 'date_issued',
        },
        {
            header: 'Status',
            accessorKey: 'status',
        },
        {
            header: 'Admin',
            accessorKey: 'admin',
        },
        {
            header: 'Action',
            accessorKey: 'action',
            cell: () => (
                <div>
                    <div
                        className="flex flex-row bg-[#EFEFEF] rounded-lg p-2 items-center justify-center"
                        style={{
                            width: 50,
                        }}
                    >
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                        <span style={{ fontSize: 10 }}>&#9679;</span>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="overflow-x-hidden" style={{ height: '100%' }}>
            <Sidebar />
            <div className="p-4 sm:ml-64">
                <Header showBreadCrumb />

                <h3 className="mb-2 font-semibold">
                    User support for #1234567
                </h3>

                <div className="py-3 px-3 flex flex-col md:flex-row info_section rounded-lg mx-3 mb-10">
                    <div className="w-full md:w-1/2 mb-5 md:mb-0 gap-y-2">
                        <p className="info-text" style={{ marginBottom: 10 }}>
                            User information
                        </p>
                        <div className="flex gap-4">
                            <div>
                                <p className="info-text">Name</p>
                                <p className="info-text">Phone</p>
                                <p className="info-text">Email</p>
                                <p className="info-text">UserID</p>
                            </div>
                            <div>
                                <p
                                    className="info-text"
                                    style={{ color: 'black' }}
                                >
                                    Oluwatosin Oluwaston
                                </p>
                                <p
                                    className="info-text"
                                    style={{ color: 'black' }}
                                >
                                    1234566
                                </p>
                                <p
                                    className="info-text"
                                    style={{ color: 'black' }}
                                >
                                    oluwatobioluwalase@gmail.com
                                </p>
                                <p
                                    className="info-text"
                                    style={{ color: 'black' }}
                                >
                                    #123454
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 gap-y-2 w-full md:w-1/2 mb-5 md:mb-0">
                        <div>
                            <p className="info-text">Location</p>
                            <p className="info-text">Role</p>
                            <p className="info-text">Date joined</p>
                            <p className="info-text">Last date active</p>{' '}
                        </div>
                        <div>
                            <p className="info-text">Lagos, Nigeria</p>
                            <p className="info-text">Creative</p>
                            <p className="info-text">March 23, 2023</p>
                            <p className="info-text">Jan 24, 2024</p>
                        </div>
                    </div>
                </div>

                <SortableTable data={data} columns={supportCOlumns} />
            </div>
        </div>
    );
};
