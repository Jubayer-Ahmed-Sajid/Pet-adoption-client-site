import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
const BasicTable = ({data,columns}) => {
   /** @type import ('@tanstack/react-table').columnDef<any>*/
    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
    return (
        <div className='w-[80vw]  text-center my-4 mx-auto '>
            <table className='table-auto w-full'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className='border p-2'>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border p-2'>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
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
        </div>
    );
};

export default BasicTable;