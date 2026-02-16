"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CustomPagination from "@/components/ui/CustomPagination";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TableComponent from "@/components/ui/TableComponent";
import { TAnalyticsResponse } from "@/types/auditStatistics.types";
import {
  AuditAction,
  AuditLog,
  TAuditLogsResponse,
} from "@/types/recentLogs.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Activity, Database, Eye, ListChecks, Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ActivityLogs = ({
  recentLogs,
  auditStatistics,
}: {
  recentLogs: TAuditLogsResponse;
  auditStatistics: TAnalyticsResponse;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("organizationId") || "",
  );
  const [show, setShow] = useState(searchParams.get("limit") || "10");

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const handleFilterChange = (key: string, value: string | number | null) => {
    const queryString = createQueryString({ [key]: value, offset: 0 });
    router.push(`${pathname}?${queryString}`);
  };

  const handlePageChange = (page: number) => {
    const limit = parseInt(show);
    const offset = (page - 1) * limit;
    const queryString = createQueryString({ offset });
    router.push(`${pathname}?${queryString}`);
  };

  // Debounce search term for organizationId
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (searchParams.get("organizationId") || "")) {
        handleFilterChange("organizationId", searchTerm);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns: ColumnDef<AuditLog>[] = [
    {
      header: "User",
      accessorKey: "userName",
      cell: ({ row }) => (
        <div className="flex flex-col items-start">
          <span className="font-semibold text-white">
            {row.original.userName}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.original.userEmail}
          </span>
        </div>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="capitalize border-white/20 text-white bg-white/5"
        >
          {row.original.action.toLowerCase().replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      header: "Entity",
      accessorKey: "entityType",
      cell: ({ row }) => (
        <div className="flex flex-col items-start">
          <span className="capitalize text-white">
            {row.original.entityType.toLowerCase()}
          </span>
          <span className="text-[10px] text-muted-foreground">
            ID: {row.original.entityId}
          </span>
        </div>
      ),
    },
    {
      header: "Method",
      accessorKey: "method",
      cell: ({ row }) => {
        const method = row.original.method.toUpperCase();
        let variant: "default" | "secondary" | "destructive" | "outline" =
          "outline";

        if (method === "POST") variant = "default";
        if (method === "PUT" || method === "PATCH") variant = "secondary";
        if (method === "DELETE") variant = "destructive";
        if (method === "SEED") variant = "secondary";

        return (
          <Badge variant={variant} className="text-[10px] font-bold">
            {method}
          </Badge>
        );
      },
    },
    {
      header: "IP Address",
      accessorKey: "ipAddress",
      cell: ({ row }) => (
        <span className="text-white">{row.original.ipAddress}</span>
      ),
    },
    {
      header: "Date",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <span className="text-xs text-white">
          {format(new Date(row.original.createdAt), "MMM d, yyyy HH:mm")}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }) => (
        <Button
          asChild
          onClick={() => alert(`Details for log ${row.original.id}`)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-medium transition"
        >
          <Link href={`/dashboard/userActions?userId=6`}>
            <Eye className="size-3" />
            All
          </Link>
        </Button>
      ),
    },
  ];

  const totalLogs = recentLogs?.data?.total || 0;
  const limit = parseInt(show);
  const totalPages = Math.ceil(totalLogs / limit);
  const currentPage =
    Math.floor(parseInt(searchParams.get("offset") || "0") / limit) + 1;

  return (
    <div className="w-full space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#111111] p-5 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl">
            <Activity className="size-6 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Actions</p>
            <h3 className="text-2xl font-bold text-white">
              {Object.values(auditStatistics?.data?.byAction || {}).reduce(
                (a, b) => a + b,
                0,
              )}
            </h3>
          </div>
        </div>

        <div className="bg-[#111111] p-5 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-2xl">
            <Database className="size-6 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entity Types</p>
            <h3 className="text-2xl font-bold text-white">
              {Object.keys(auditStatistics?.data?.byEntityType || {}).length}
            </h3>
          </div>
        </div>

        <div className="bg-[#111111] p-5 rounded-3xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl">
            <ListChecks className="size-6 text-purple-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Top Action</p>
            <h3 className="text-xl font-bold text-white truncate">
              {Object.entries(auditStatistics?.data?.byAction || {}).sort(
                (a, b) => b[1] - a[1],
              )[0]?.[0] || "N/A"}
            </h3>
          </div>
        </div>
      </div>

      {/* Action Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#111111] p-6  rounded-3xl border border-white/10">
          <h3 className="text-lg mb-4 font-semibold text-white flex items-center gap-2 ">
            <Activity className="size-4 text-blue-500" /> By Action
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(auditStatistics?.data?.byAction || {}).map(
              ([action, count]) => (
                <div
                  key={action}
                  className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3"
                >
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {action}
                  </span>
                  <span className="text-lg font-bold text-white">{count}</span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="bg-[#111111] p-6 rounded-3xl border border-white/10">
          <h3 className="text-lg mb-4 font-semibold text-white flex items-center gap-2">
            <Database className="size-4 text-green-500" /> By Entity
          </h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(auditStatistics?.data?.byEntityType || {}).map(
              ([entity, count]) => (
                <div
                  key={entity}
                  className="bg-white/5 border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {entity}
                  </span>
                  <span className="text-lg font-bold text-white">{count}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-[#111111] p-6 rounded-3xl border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <h2 className="text-xl font-bold text-white whitespace-nowrap">
            Recent Activity Logs
          </h2>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search by Organization ID */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search Organization ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 rounded-xl text-white h-10 focus:ring-1 focus:ring-white/20"
              />
            </div>

            {/* Action Filter */}
            <Select
              value={searchParams.get("action") || "all"}
              onValueChange={(val) =>
                handleFilterChange("action", val === "all" ? null : val)
              }
            >
              <SelectTrigger className="w-35 bg-white/5 border-white/10 rounded-xl text-white h-10">
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                <SelectItem value="all">All Actions</SelectItem>
                {Object.values(AuditAction).map((action) => (
                  <SelectItem key={action} value={action}>
                    {action.charAt(0) + action.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Limit Selector */}
            <Select
              value={show}
              onValueChange={(val) => {
                setShow(val);
                handleFilterChange("limit", val);
              }}
            >
              <SelectTrigger className="w-35 bg-white/5 border-white/10 rounded-xl text-white h-10">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
                {["10", "20", "30", "50", "100"].map((l) => (
                  <SelectItem key={l} value={l}>
                    {l} / page
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TableComponent data={recentLogs?.data?.logs || []} columns={columns} />

        {totalLogs > limit && (
          <div className="mt-6 border-t border-white/5 pt-6">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              show={show}
              setShow={(val) => {
                setShow(val as string);
                handleFilterChange("limit", val as string);
              }}
              setFilters={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
