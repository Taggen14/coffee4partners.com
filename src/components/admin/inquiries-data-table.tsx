"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type Inquiry = {
  id: string;
  customerName: string;
  customerEmail: string;
  type: "ai" | "human";
  status: "active" | "resolved" | "archived";
  subject: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
};

interface InquiriesDataTableProps {
  data: Inquiry[];
}

export function InquiriesDataTable({ data }: InquiriesDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const router = useRouter();

  const columns: ColumnDef<Inquiry>[] = [
    {
      id: "subject",
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <div>
          <div className="font-medium line-clamp-1">
            {row.getValue("subject")}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1 hidden sm:block">
            {row.original.lastMessage}
          </div>
        </div>
      ),
    },
    {
      id: "customerName",
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <div className="font-medium line-clamp-1">
            {row.getValue("customerName")}
          </div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {row.original.customerEmail}
          </div>
        </div>
      ),
    },
    {
      id: "type",
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("type") as Inquiry["type"];
        return (
          <Badge
            variant={type === "ai" ? "secondary" : "default"}
            className="hidden sm:inline-flex"
          >
            {type === "ai" ? "AI Chat" : "Human Support"}
          </Badge>
        );
      },
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as Inquiry["status"];
        const statusColors = {
          active: "bg-green-100 text-green-800",
          resolved: "bg-blue-100 text-blue-800",
          archived: "bg-gray-100 text-gray-800",
        };

        return (
          <Badge variant="secondary" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      id: "updatedAt",
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hidden sm:flex"
          >
            Last Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));
        return (
          <div className="hidden sm:block">{date.toLocaleDateString()}</div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleRowClick(row.original.id)}>
                View conversation
              </DropdownMenuItem>
              <DropdownMenuItem>Take over chat</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
              <DropdownMenuItem>Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleRowClick = (inquiryId: string) => {
    router.push(`/admin/inquiries/${inquiryId}`);
  };

  // Calculate stats
  const totalInquiries = data.length;
  const activeInquiries = data.filter(
    (inquiry) => inquiry.status === "active",
  ).length;
  const aiChats = data.filter((inquiry) => inquiry.type === "ai").length;
  const humanChats = data.filter((inquiry) => inquiry.type === "human").length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Total Inquiries
          </div>
          <div className="text-lg sm:text-2xl font-bold">{totalInquiries}</div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Active Inquiries
          </div>
          <div className="text-lg sm:text-2xl font-bold text-green-600">
            {activeInquiries}
          </div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            AI Chats
          </div>
          <div className="text-lg sm:text-2xl font-bold text-blue-600">
            {aiChats}
          </div>
        </div>
        <div className="p-3 sm:p-4 border rounded-lg bg-card">
          <div className="text-xs sm:text-sm font-medium text-muted-foreground">
            Human Support
          </div>
          <div className="text-lg sm:text-2xl font-bold text-purple-600">
            {humanChats}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <DataTableToolbar table={table} />
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleRowClick(row.original.id)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
