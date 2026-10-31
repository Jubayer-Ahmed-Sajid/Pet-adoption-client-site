import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const BasicTable = ({ data = [], columns = [] }) => {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div className="w-full bg-card rounded-card border border-rule overflow-hidden shadow-sm my-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-ink-2">
          <thead className="bg-paper-2 text-xs text-muted border-b border-rule font-medium">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="py-3.5 px-4 cursor-pointer select-none hover:text-ink transition-colors duration-150"
                  >
                    <div className="inline-flex items-center gap-1.5">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <FaSortUp className="text-accent-3" />,
                        desc: <FaSortDown className="text-accent-3" />,
                      }[header.column.getIsSorted()] || (
                          <FaSort className="text-muted/40 text-[10px]" />
                        )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-rule">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-8 text-center text-sm text-muted"
                >
                  No records found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-paper-2/60 transition-colors duration-150"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3.5 px-4 align-middle text-sm text-ink">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      {table.getPageCount() > 1 && (
        <div className="p-4 bg-paper-2 border-t border-rule flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-muted">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <div className="inline-flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1.5 rounded-pill bg-paper border border-rule text-ink font-medium disabled:opacity-40 transition-colors duration-150 hover:bg-paper-3 press-down"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1.5 rounded-pill bg-paper border border-rule text-ink font-medium disabled:opacity-40 transition-colors duration-150 hover:bg-paper-3 press-down"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicTable;
