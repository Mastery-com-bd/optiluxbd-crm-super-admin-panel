"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TContent, TContents } from "@/types/content";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import ContentUpdateModal from "./ContentUpdateModal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { deleteContent } from "@/service/content";
import { toast } from "sonner";
import Link from "next/link";
const keys = [
    "KEY",
    "TITLE",
    "IS ACTIVE",
    "CREATED AT",
    "UPDATED AT",
    "ACTIONS",
];
export default function AllContent({ contents }: { contents: TContents }) {
    const [selectedContent, setSelectedContent] = useState<TContent | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);

    async function handleToggle(id: number) {

    }

    async function handleDelete(id: number) {
        const toastId = toast.loading("Deleting content...");
        try {
            const res = await deleteContent(id);
            if (res.success) {
                toast.success(res.message || "Content deleted successfully", { id: toastId });
                setIsDeleteDialogOpen(false);
            } else {
                toast.error(res.message || "Failed to delete content", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Error deleting content:", error);
        }
    }
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
                    {contents?.map((content: TContent) => (
                        <TableRow
                            key={content.id}
                            className="border-muted hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="px-4 py-3 font-medium">
                                {content.key}
                            </TableCell>
                            <TableCell className="px-4 py-3">
                                {content.title}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                <Switch
                                    checked={content.isActive}
                                    onCheckedChange={() => handleToggle(content.id)}
                                />
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                {new Date(content.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                {new Date(content.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full transition-colors">
                                        <MoreVertical className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                        >
                                            <Link href={`/dashboard/content/${content.key}`}><Pencil className="w-4 h-4 mr-2" /> View Details</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onSelect={() => {
                                                setSelectedContent(content);
                                                setIsUpdateModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4 mr-2" /> Update
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            onClick={() => {
                                                setSelectedContent(content);
                                                setIsDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ContentUpdateModal
                content={selectedContent}
                open={isUpdateModalOpen}
                setOpen={setIsUpdateModalOpen}
            />
            {/* Delete Confirm Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            product and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (selectedContent?.id) {
                                    handleDelete(selectedContent.id);
                                    setIsDeleteDialogOpen(false);
                                }
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
