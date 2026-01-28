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
import { deleteOrganization, updateOrganizationStatus, updateOrganizationSuspendStatus } from "@/service/OrganaizationService";
import { OrganizationData, Organizations } from "@/types/organizations";
import { ChangeInput } from "@/types/shared";
import { Eye, Funnel, MoreVertical, Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import UpdatePlanModal from "./UpdatePlanModal";
import { Switch } from "@/components/ui/switch";
const keys = [
    "NAME",
    "STATUS",
    "IS SUSPENDED",
    "PLAN",
    "MRR",
    "JOINED DATE",
    "ACTIONS",
];
export default function AllOrganizations({ organizations }: { organizations: Organizations }) {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState<OrganizationData | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

    const handleChange = (input: ChangeInput) => {
        const name = "target" in input ? input.target.name : input.name;
        const value = "target" in input ? input.target.value : input.value;
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        router.push(`${pathName}?${params.toString()}`, {
            scroll: false,
        });
    }

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
    const handleToggleStatus = async (id: number) => {
        const toastId = toast.loading("Updating...");
        try {
            const r = await updateOrganizationStatus(id);
            if (r.success)
                toast.success(r.message, { id: toastId });
            else
                toast.error(r.message, { id: toastId });
        } catch (error) {
            console.error(error);
        }
    }
    const handleToggleSuspend = async (id: number) => {
        const toastId = toast.loading("Updating...");
        try {
            const r = await updateOrganizationSuspendStatus(id);
            if (r.success)
                toast.success(r.message, { id: toastId });
            else
                toast.error(r.message, { id: toastId });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="bg-transparent text-foreground my-4">
            <div className="w-full">
                {/* Filters */}
                <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-0">
                    <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
                        <div className="flex  gap-3 items-center">
                            <Input
                                name="search"
                                className="w-64 text-sm bg-transparent"
                                value={searchTerm}
                                icon={<Search />}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    handleChange(e);
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
                            <Link href={"/dashboard/organizations/create-organizations"}>
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
                                {organizations?.map((organization: OrganizationData) => (
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
                                            <div className="flex items-center justify-center gap-2">
                                                <Switch
                                                    id={`status-${organization.id}`}
                                                    checked={organization.isActive}
                                                    onCheckedChange={() => handleToggleStatus(organization.id)}
                                                    className={`${organization.isActive
                                                        ? "data-[state=checked]:bg-green-600"
                                                        : "data-[state=unchecked]:bg-red-600"
                                                        }`}
                                                />
                                                <span className={`text-xs font-bold ${organization.isActive ? "text-green-600" : "text-red-600"}`}>
                                                    {organization.isActive ? "ACTIVE" : "SUSPENDED"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm text-center ">
                                            <div className="flex items-center justify-center gap-2">
                                                <Switch
                                                    id={`status-${organization.id}`}
                                                    checked={organization.isSuspended}
                                                    onCheckedChange={() => { handleToggleSuspend(organization.id) }}
                                                    className={`${organization.isSuspended
                                                        ? "data-[state=checked]:bg-red-600"
                                                        : "data-[state=unchecked]:bg-green-600"
                                                        }`}
                                                />
                                                <span className={`text-xs font-bold ${organization.isSuspended ? " text-red-600" : "text-green-600"}`}>
                                                    {organization.isSuspended ? "SUSPENDED" : "SUSPENDED"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-4 py-3 text-sm text-center">
                                            {organization.plan.name}
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
                                                        href={`/dashboard/organizations/${organization.id}`}>
                                                        <DropdownMenuItem className="cursor-pointer">
                                                            <Eye className="w-4 h-4 mr-2" /> view
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <DropdownMenuItem
                                                            onSelect={(e) => {
                                                                e.preventDefault();
                                                                setSelectedOrg(organization);
                                                                setIsUpdateModalOpen(true);
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <Pencil className="w-4 h-4 mr-2" />
                                                            Update
                                                        </DropdownMenuItem>

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
            <UpdatePlanModal
                organization={selectedOrg}
                open={isUpdateModalOpen}
                setOpen={setIsUpdateModalOpen}
            />
        </div>
    )
}