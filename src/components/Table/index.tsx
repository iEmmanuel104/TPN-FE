import { useState, useEffect } from 'react';
import './style.scss';

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

export const Table = ({ data, columns }: any) => {
    // const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
    const [loading, setLoading] = useState(true); // Step 2: Add loading state

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            // sorting: sorting,
            globalFilter: filtering,
        },
        defaultColumn: {
            maxSize: 200, //enforced during column resizing
        },
        // onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    useEffect(() => {
        // Use useEffect to simulate loading process or to fetch data
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after data is "fetched"
        }, 1000); // Simulate a loading time of 1 second

        return () => clearTimeout(timer);
    }, []); // Empty dependency array means this effect runs once on mount

    if (loading) {
        // Step 4: Conditionally render loading state or table
        return (
            <div
                className="loading-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '300px', // Adjust based on your table's average height
                }}
            >
                <div className="loader"></div>Loading...
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-row flex-wrap justify-between">
                <div className="flex mb-9 pt-2 user_list">
                    <h6
                        className={`user_tyoe ${filtering == '' && 'active'}`}
                        onClick={() => setFiltering('')}
                    >
                        All users
                    </h6>
                    <h6
                        className={`user_tyoe ${
                            filtering == 'Executive' && 'active'
                        }`}
                        onClick={() => setFiltering('Executive')}
                    >
                        Executives
                    </h6>
                    <h6
                        className={`user_tyoe ${
                            filtering == 'Vendor' && 'active'
                        }`}
                        onClick={() => setFiltering('Vendor')}
                    >
                        Vendors
                    </h6>
                    <h6
                        className={`user_tyoe ${
                            filtering == 'Creative' && 'active'
                        }`}
                        onClick={() => setFiltering('Creative')}
                    >
                        Creatives
                    </h6>
                </div>

                <div className="search-field mb-8">
                    <img
                        src={
                            'https://cdn.blkat.io/assets/image/search-normal.png'
                        }
                        height={15}
                        width={15}
                    />
                    <input
                        className="inner-field"
                        type="text"
                        placeholder="Search for people"
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                    />
                </div>
            </div>

            <table className="table-auto border-separate border-spacing-y-3 text-sm w-[100%] shadow-sm rounded-lg p-4 bg-[#FCFCFC]">
                <thead className="border-b-2 border-green-500 border-solid">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="text-center border-2 border-green-500 border-solid"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    className="text-[#8D9091] font-medium text-center align-middle"
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder ? null : (
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="font-bold">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="align-middle">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="text-center align-middle whitespace-nowrap p-2"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="w-100 mt-4 bg-[#FBFBFB] rounded-lg flex flex-row justify-between items-center p-2">
                <div>
                    <p className="footer-text">
                        {table.getRowModel().rows.length} items
                    </p>
                </div>

                <div>
                    <button
                        className="mr-3"
                        disabled={!table.getCanPreviousPage()}
                        onClick={() => table.previousPage()}
                    >
                        <img
                            src={
                                'https://cdn.blkat.io/assets/image/chevrons/arrow-square-left.svg'
                            }
                            height={25}
                            width={25}
                        />
                    </button>
                    <button
                        disabled={!table.getCanNextPage()}
                        onClick={() => table.nextPage()}
                    >
                        <img
                            src={
                                'https://cdn.blkat.io/assets/image/chevrons/arrow-square-right.svg'
                            }
                            height={25}
                            width={25}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};
