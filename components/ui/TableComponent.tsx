/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const TableComponent = <T,>({ data = [], columns }: TableProps<T>) => {
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table?.getRowModel()?.rows || [];

  return (
    <div className="overflow-x-auto w-full pb-10">
      <table className="w-full caption-bottom text-sm">
        <thead className="mb-48">
          {table?.getHeaderGroups()?.map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              {headerGroup.headers.map((header, ind) => (
                <th
                  key={header.id}
                  className="h-12 text-left align-middle font-medium text-muted-foreground cursor-pointer"
                >
                  <div
                    className={`border w-full h-full flex justify-center items-center text-[12px] px-3 text-white border-white/30 ${
                      ind === 0
                        ? "rounded-l-2xl"
                        : ind === headerGroup.headers.length - 1
                          ? "rounded-r-2xl"
                          : ""
                    }`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {rows.length > 0 ? (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-2 font-medium text-sm whitespace-nowrap text-center"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-8 text-center text-muted-foreground"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
