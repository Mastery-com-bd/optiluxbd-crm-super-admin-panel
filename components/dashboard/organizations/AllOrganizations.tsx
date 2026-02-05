// AllOrganizations.tsx
"use client";
import { useMemo, useState } from "react";
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
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  deleteOrganization,
  updateOrganizationStatus,
  updateOrganizationSuspendStatus,
} from "@/service/OrganaizationService";
import { Organization, Organizations } from "@/types/organizations";
import { Funnel, Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import UpdatePlanModal from "./UpdatePlanModal";
import TableComponent from "@/components/ui/TableComponent";
import { getOrganizationColumns } from "./organizationColumns";

export default function AllOrganizations({
  organizations,
}: {
  organizations: Organizations;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    try {
      toast.promise(deleteOrganization(id), {
        loading: "Deleting organization...",
        success: "Organization deleted successfully!",
        error: "Failed to delete organization.",
      });
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };



  const handleToggleSuspend = async (id: number, status: boolean) => {
    const toastId = toast.loading("Updating...");
    try {
      let r;
      if (status)
        r = await updateOrganizationStatus(id);
      else
        r = await updateOrganizationSuspendStatus(id);
      if (r.success) toast.success(r.message, { id: toastId });
      else toast.error(r.message, { id: toastId });
    } catch (error) {
      console.error(error);
    }
  };

  const columns = useMemo(
    () =>
      getOrganizationColumns({
        handleToggleSuspend,
        setSelectedOrg,
        setIsUpdateModalOpen,
        setDeleteProductId,
        setDeleteDialogOpen,
      }),
    []
  );

  return (
    <div className="bg-transparent text-foreground my-4">
      <div className="w-full">
        {/* Filters */}
        <Card className="bg-transparent border-none text-card-foreground border shadow-sm p-0">
          <div className="flex flex-col lg:flex-row gap-4 my-7 justify-between">
            <div className="flex gap-3 items-center">
              <Input
                className="w-64 text-sm bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search organizations..."
              />
              <Button className="w-9 h-9 p-2.5 rounded-[12px] bg-transparent effect cursor-pointer">
                <Funnel size={16} />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href={"/dashboard/organizations/create-organizations"}>
                <ButtonComponent buttonName="Create Organization" icon={Plus} />
              </Link>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="bg-transparent text-card-foreground shadow-sm overflow-hidden mb-5 p-0 pt-2 border-none">
          <TableComponent data={organizations} columns={columns} />
        </Card>
      </div>

      {/* Delete Confirm Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              organization and remove your data from our servers.
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
              }}
            >
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
  );
}