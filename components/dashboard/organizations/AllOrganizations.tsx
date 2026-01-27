'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import CustomPagination from "@/components/ui/CustomPagination";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { deleteOrganization } from "@/service/OrganaizationService";
import { Organization, Organizations } from "@/types/organizations";
import { Eye, Funnel, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
const keys = [
    "NAME",
    "STATUS",
    "PLAN",
    "MRR",
    "JOINED DATE",
    "ACTIONS",
];
export default function AllOrganizations({ organizations }: { organizations: Organizations }) {
    const [inputValue, setInputValue] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        sortBy: "created_at",
        order: "desc",
        limit: 10,
        page: 1,
    });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
    const handleSearch = async (val: any) => {
        setFilters({ ...filters, search: val });
    };
    const handleDelete = async (id: number) => {
        try {
            toast.promise(deleteOrganization(id), {
                loading: "Deleting product...",
                success: "Product deleted successfully!",
                error: "Failed to delete product.",
            });
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    return (
        <div className="bg-transparent text-foreground my-4">
            <div className="w-full">
                {/* Filters */}
                <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-0">
                    <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
                        <div className="flex  gap-3 items-center">
                            <Input
                                className="w-64 text-sm bg-transparent"
                                value={inputValue}
                                icon={<Search />}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                                placeholder="Search product by name"
                            />
                            <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
                                <Funnel size={16} />
                            </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                            {/* <Select
                                value={category}
                                onValueChange={(value) => {
                                    setCategory(value);
                                    setFilters((prev) => ({
                                        ...prev,
                                        category: value === "all" ? undefined : value,
                                        page: 1,
                                    }));
                                }}>
                                <SelectTrigger className="w-40" aria-label="Category Filter">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories?.map((category: { id: number; name: string }) => (
                                        <SelectItem key={category.id} value={category.name}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={status}
                                onValueChange={(value) => {
                                    setStatus(value);
                                    setFilters((prev) => ({
                                        ...prev,
                                        status: value === "all" ? undefined : value,
                                        page: 1,
                                    }));
                                }}>
                                <SelectTrigger className="w-36" aria-label="Status Filter">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="Published">Published</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                </SelectContent>
                            </Select> */}
                            <Link href={"/dashboard/add"}>
                                <ButtonComponent buttonName="Create Organization" icon={Plus} />
                            </Link>
                        </div>
                    </div>
                </Card>
                {/* Product Table */}
                <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 p-0 pt-2 border-none ">
                    <div className="overflow-x-auto w-full">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    {keys.map((label, ind) => (
                                        <TableHead
                                            first={ind === 0}
                                            last={ind === keys.length - 1}
                                            key={label}
                                            className="text-left text-xs font-semibold uppercase text-muted-foreground">
                                            {label}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {organizations?.map((organization: Organization) => (
                                    <TableRow
                                        key={organization.id}
                                        className="border-muted hover:bg-muted/50 transition-colors">
                                        <TableCell className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <Image
                                                    src={
                                                        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
                                                    }
                                                    alt={organization.name}
                                                    width={48}
                                                    height={48}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="font-medium">{organization.name}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm text-center ">
                                            {
                                                organization.isActive ?
                                                    <div className="mx-auto py-1 text-green-600 effect text-center w-25 rounded-[3px]">Active</div> :
                                                    <div className="mx-auto py-1 text-red-600 effect text-center w-25  rounded-[3px]">Suspended</div>
                                            }
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm text-center">
                                            {organization.plan}
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm font-medium text-center">
                                            ---
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm font-semibold text-center">
                                            {
                                                new Date(organization.createdAt).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "2-digit",
                                                    },
                                                )
                                            }
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-center ">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="cursor-pointer">
                                                    <MoreVertical className="h-4 w-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-[180px] flex flex-col ">
                                                    <Link
                                                        href={`/dashboard/admin/products/all-products/${organization.id}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2" /> view
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Pencil className="w-4 h-4 mr-2" />
                                                        Update
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setDeleteProductId(organization.id);
                                                            setDeleteDialogOpen(true);
                                                        }}
                                                        className="cursor-pointer">
                                                        <Trash2 className="w-4 h-4 text-destructive mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>

                {/* Pagination */}
                {/* <CustomPagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => setFilters({ ...filters, page })}
                    show={show}
                    setShow={setShow}
                    setFilters={setFilters}
                /> */}
            </div>

            {/* Delete Confirm Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
                                if (deleteProductId) {
                                    handleDelete(deleteProductId);
                                    setDeleteDialogOpen(false);
                                }
                            }}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
