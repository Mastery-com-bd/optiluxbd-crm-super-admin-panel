import React from "react";
import { Skeleton } from "../skeleton";

type TableSkeletonProps = {
  columns?: number;
  rows?: number;
};

const TableSkeleton = ({ columns = 6, rows = 8 }: TableSkeletonProps) => {
  return (
    <div className="overflow-x-auto w-full pb-10">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="h-12 px-4">
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="[&_tr:last-child]:border-0">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex} className="p-4">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
