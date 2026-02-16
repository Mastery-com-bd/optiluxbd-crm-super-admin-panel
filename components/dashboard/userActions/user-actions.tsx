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
import { AuditAction } from "@/types/recentLogs.types";
import { IUserActionLog, IUserActionsResponse } from "@/types/userActions.types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, FilterX, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const UserActions = ({ userActions }: { userActions: IUserActionsResponse }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [orgIdSearch, setOrgIdSearch] = useState(searchParams.get("organizationId") || "");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("userId") || "");
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
    [searchParams]
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

  const clearFilters = () => {
    const userId = searchParams.get("userId");
    router.push(`${pathname}?userId=${userId}&limit=10&offset=0`);
    setOrgIdSearch("");
    setSearchTerm("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (orgIdSearch !== (searchParams.get("organizationId") || "")) {
        handleFilterChange("organizationId", orgIdSearch);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [orgIdSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== (searchParams.get("userId") || "")) {
        handleFilterChange("userId", searchTerm);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const columns: ColumnDef<IUserActionLog>[] = [
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize border-white/20 text-white bg-white/5">
          {row.original.action.toLowerCase().replace(/_/g, " ")}
        </Badge>
      ),
    },
    {
      header: "Entity",
      accessorKey: "entityType",
      cell: ({ row }) => (
        <div className="flex flex-col items-start">
          <span className="capitalize text-white font-medium">{row.original.entityType}</span>
          <span className="text-[10px] text-muted-foreground">ID: {row.original.entityId}</span>
        </div>
      ),
    },
    {
      header: "Details",
      accessorKey: "method",
      cell: ({ row }) => (
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Badge variant={row.original.method === "POST" ? "default" : "secondary"} className="text-[10px]">
              {row.original.method}
            </Badge>
            <span className="text-[11px] text-muted-foreground truncate max-w-37.5">{row.original.endpoint}</span>
          </div>
          <span className="text-[10px] text-white/50">{row.original.userAgent}</span>
        </div>
      ),
    },
    {
      header: "IP Address",
      accessorKey: "ipAddress",
      cell: ({ row }) => <span className="text-white text-xs">{row.original.ipAddress}</span>
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
  ];

  const totalLogs = userActions?.data?.total || 0;
  const limit = parseInt(show);
  const totalPages = Math.ceil(totalLogs / limit);
  const currentPage = Math.floor(parseInt(searchParams.get("offset") || "0") / limit) + 1;

  // const startDate = searchParams.get("startDate");
  // const endDate = searchParams.get("endDate");

  return (
    <div className="w-full bg-[#111111] p-6 rounded-3xl border border-white/10 space-y-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">User Activity History</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground hover:text-white hover:bg-white/5 gap-2"
          >
            <FilterX className="size-4" /> Clear All
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* User Search */}
          <div className="relative w-full md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search User..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 rounded-xl text-white h-10 focus:ring-1 focus:ring-white/20"
            />
          </div>

          {/* Org ID Search */}
          <div className="relative w-full md:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Organization ID..."
              value={orgIdSearch}
              onChange={(e) => setOrgIdSearch(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 rounded-xl text-white h-10 focus:ring-1 focus:ring-white/20"
            />
          </div>

          {/* Action Filter */}
          <Select
            value={searchParams.get("action") || "all"}
            onValueChange={(val) => handleFilterChange("action", val === "all" ? null : val)}
          >
            <SelectTrigger className="w-35 bg-white/5 border-white/10 rounded-xl text-white h-10">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="all">All Actions</SelectItem>
              {Object.values(AuditAction).map((action) => (
                <SelectItem key={action} value={action}>{action}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Entity Type Filter */}
          <Select
            value={searchParams.get("entityType") || "all"}
            onValueChange={(val) => handleFilterChange("entityType", val === "all" ? null : val)}
          >
            <SelectTrigger className="w-35 bg-white/5 border-white/10 rounded-xl text-white h-10">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="User">User</SelectItem>
              <SelectItem value="Organization">Organization</SelectItem>
              <SelectItem value="Plan">Plan</SelectItem>
            </SelectContent>
          </Select>

          {/* Date Picker */}
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-60 justify-start text-left font-normal bg-white/5 border-white/10 rounded-xl text-white h-10 hover:bg-white/10 hover:text-white",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  endDate ? (
                    <>
                      {format(new Date(startDate), "LLL dd, y")} -{" "}
                      {format(new Date(endDate), "LLL dd, y")}
                    </>
                  ) : (
                    format(new Date(startDate), "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border-white/10" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: startDate ? new Date(startDate) : undefined,
                  to: endDate ? new Date(endDate) : undefined,
                }}
                onSelect={(range) => {
                  handleFilterChange("startDate", range?.from ? format(range.from, "yyyy-MM-dd") : null);
                  handleFilterChange("endDate", range?.to ? format(range.to, "yyyy-MM-dd") : null);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover> */}

          {/* Sort Selector */}
          <Select
            value={searchParams.get("sort") || "desc"}
            onValueChange={(val) => handleFilterChange("sort", val)}
          >
            <SelectTrigger className="w-32.5 bg-white/5 border-white/10 rounded-xl text-white h-10">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="size-3 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              <SelectItem value="desc">Newest</SelectItem>
              <SelectItem value="asc">Oldest</SelectItem>
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
            <SelectTrigger className="w-22.5 bg-white/5 border-white/10 rounded-xl text-white h-10">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1a1a] border-white/10 text-white">
              {["10", "20", "50", "100"].map((l) => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <TableComponent data={userActions?.data?.logs || []} columns={columns} />

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
  );
};

export default UserActions;
