'use client'
import { Ticket, Tickets, TicketStatus } from "@/types/support";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { updateTicketStatus } from "@/service/support";
import MessageDialog from "./MessageDialog";

const keys = [
    "SUBJECT",
    "ORGANIZATION",
    "CATEGORY",
    "PRIORITY",
    "STATUS",
    "MESSAGES",
    "CREATED DATE",
    "ACTIONS",
];

const statusOptions: { value: TicketStatus; label: string; variant: "default" | "outline" | "secondary" | "destructive" }[] = [
    { value: "OPEN", label: "Open", variant: "default" },
    { value: "IN_PROGRESS", label: "In Progress", variant: "outline" },
    { value: "WAITING_FOR_CUSTOMER" as TicketStatus, label: "Waiting For Customer", variant: "secondary" },
    { value: "RESOLVED", label: "Resolved", variant: "secondary" },
    { value: "CLOSED", label: "Closed", variant: "destructive" },
];

export default function AllSupportList({ tickets }: { tickets: Tickets }) {
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<{ id: number; status: TicketStatus } | null>(null);

    const handleStatusChange = (ticketId: number, newStatus: TicketStatus) => {
        setSelectedTicket({ id: ticketId, status: newStatus });
        setIsAlertOpen(true);
    };

    const confirmStatusChange = async () => {
        if (selectedTicket) {
            await updateStatus(selectedTicket.id, selectedTicket.status);
            setIsAlertOpen(false);
            setSelectedTicket(null);
        }
    };

    const updateStatus = async (id: number, status: TicketStatus) => {
        const toastId = toast.loading("Updating Ticket Status...");
        try {
            const res = await updateTicketStatus(id, { status });
            if (res.success) {
                toast.success("Updated successfully", { id: toastId });
            } else {
                toast.error(res.message || "Failed to update ticket status", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Error updating ticket status:", error);
        }
    };

    const getStatusVariant = (status: TicketStatus) => {
        const option = statusOptions.find(s => s.value === status);
        return option?.variant || "default";
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "BILLING": return "bg-blue-100 text-blue-800";
            case "TECHNICAL": return "bg-purple-100 text-purple-800";
            case "FEATURE_REQUEST": return "bg-green-100 text-green-800";
            case "BUG_REPORT": return "bg-red-100 text-red-800";
            case "ACCOUNT": return "bg-yellow-100 text-yellow-800";
            case "OTHER": return "bg-gray-100 text-gray-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div>
            <Table className="w-full my-6">
                <TableHeader>
                    <TableRow>
                        {keys.map((label, ind) => (
                            <TableHead
                                first={ind === 0}
                                last={ind === keys.length - 1}
                                key={label}
                                className="text-left text-xs font-semibold uppercase text-muted-foreground"
                            >
                                {label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tickets?.map((ticket: Ticket) => (
                        <TableRow
                            key={ticket.id}
                            className="border-muted hover:bg-muted/50 transition-colors"
                        >
                            {/* Subject */}
                            <TableCell className="px-4 py-3">
                                <div>
                                    <p className="font-medium">{ticket.subject}</p>
                                    <p className="text-xs text-muted-foreground">
                                        by {ticket.creator.name}
                                    </p>
                                </div>
                            </TableCell>

                            {/* Organization */}
                            <TableCell className="px-4 py-3 text-sm">
                                <div>
                                    <p className="font-medium">{ticket.organization.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        @{ticket.organization.slug}
                                    </p>
                                </div>
                            </TableCell>

                            {/* Category */}
                            <TableCell className="px-4 py-3 text-sm text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(ticket.category)}`}>
                                    {ticket.category.replace(/_/g, " ")}
                                </span>
                            </TableCell>

                            {/* Priority */}
                            <TableCell className="px-4 py-3 text-sm text-center">
                                <Badge
                                    variant={
                                        ticket.priority === "URGENT"
                                            ? "destructive"
                                            : ticket.priority === "HIGH"
                                                ? "default"
                                                : ticket.priority === "MEDIUM"
                                                    ? "outline"
                                                    : "secondary"
                                    }
                                >
                                    {ticket.priority}
                                </Badge>
                            </TableCell>

                            {/* Status - Dropdown */}
                            <TableCell className="px-4 py-3 text-sm text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="cursor-pointer inline-block">
                                            <Badge variant={getStatusVariant(ticket.status)}>
                                                {ticket.status.replace(/_/g, " ")}
                                            </Badge>
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="center">
                                        {statusOptions.map((status) => (
                                            <DropdownMenuItem
                                                key={status.value}
                                                onClick={() => handleStatusChange(ticket.id, status.value)}
                                                disabled={ticket.status === status.value}
                                                className="cursor-pointer"
                                            >
                                                <Badge variant={status.variant} className="w-full">
                                                    {status.label}
                                                </Badge>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                            {/* Messages Count */}
                            <TableCell className="px-4 py-3 text-sm text-center font-medium ">
                                <div className="flex justify-center items-center gap-4">
                                    <span>{ticket._count.messages}</span> <MessageDialog id={ticket.id} messages={ticket.messages} />
                                </div>
                            </TableCell>

                            {/* Created Date */}
                            <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                                {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit",
                                })}
                            </TableCell>

                            {/* Actions */}
                            <TableCell className="px-4 py-3 text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer">
                                        <MoreVertical className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[180px]">
                                        <Link href={`/dashboard/support/${ticket.id}`}>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Eye className="w-4 h-4 mr-2" /> View
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <Pencil className="w-4 h-4 mr-2" />
                                            Update
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-destructive">
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Alert Dialog for Status Change Confirmation */}
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to change the ticket status to{" "}
                            <strong>{selectedTicket?.status.replace(/_/g, " ")}</strong>? This action will update the ticket.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedTicket(null)}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmStatusChange}>
                            Confirm
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}