import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import { useState } from 'react';
import { FaSort } from 'react-icons/fa';
const BasicTable = ({ data, columns }) => {
    /** @type import ('@tanstack/react-table').columnDef<any>*/
    const [sorting, setSorting] = useState()
    const table = useReactTable({
        data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(),
        state: {
            sorting: sorting
        },
        onSortingChange: setSorting

    })
    return (
        <div className='w-[80vw]  text-center my-4 mx-auto '>
            <table className='table-auto w-full'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className='border p-2'>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border p-2' onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {
                                        { asc: <FaSort></FaSort>, desc: <FaSort></FaSort> }[header.column.getIsSorted() ?? null]
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border p-2'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className=' flex gap-8 justify-center mt-4'>
                <button className='bg-green-600 px-4 py-3 rounded-lg text-white disabled:bg-slate-200 disabled:text-black' onClick={() => table.setPageIndex(0)}>First Page</button>
                <button className='bg-green-600 px-4 py-3 rounded-lg text-white disabled:bg-slate-200 disabled:text-black' disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Previous Page</button>
                <button className='bg-green-600 px-4 py-3 rounded-lg text-white disabled:bg-slate-200 disabled:text-black' disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
                <button className='bg-green-600 px-4 py-3 rounded-lg text-white disabled:bg-slate-200 disabled:text-black' onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
            </div>
        </div>
    );
};

export default BasicTable;