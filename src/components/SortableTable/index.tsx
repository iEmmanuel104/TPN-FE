import { useState } from 'react';
import './style.scss';

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { ColumnDef } from '@tanstack/react-table';

type Column = ColumnDef<unknown, unknown>;

export const SortableTable = ({ data, columns }: { data: unknown[], columns: Column[] }) => {
    // const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');

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

    return (
        <>
            <div className="flex flex-row flex-wrap justify-between">
                <h3 className="font-semibold">Support issues</h3>

                <div className="rounded-full p-2 px-5 filter_box">
                    <p
                        className="text-xs font-normal"
                        style={{ marginTop: -20 }}
                    >
                        Sort by
                    </p>
                    <div className="flex flex-row items-center">
                        <img
                            src={
                                'https://cdn.blkat.io/assets/image/dashboard/bx_bx-filter.svg'
                            }
                            height={18}
                            width={18}
                        />

                        <p className="ml-2 mr-4 text-xs font-medium text-[#8D9091]">
                            Recently Added
                        </p>
                    </div>
                </div>
            </div>

            <table className="table-auto border-separate border-spacing-y-3 text-sm w-[100%] shadow-sm rounded-lg p-4 bg-[#FCFCFC]">
                <thead className="border-b-2 border-green-500 border-solid">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="text-left border-2 border-green-500 border-solid"
                        >
                            {headerGroup.headers.map((header) => (
                                <th
                                    className="text-[#8D9091] font-medium"
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
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
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
                        title='Previous Page'
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
                        title='Next Page'
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
