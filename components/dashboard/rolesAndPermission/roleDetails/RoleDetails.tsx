"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TRoles } from "@/types/roles.types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import AllPermission from "../allPermission/AllPermission";

const RoleDetails = ({ role }: { role: TRoles }) => {
  const router = useRouter();
  const permissions = role?.permissions.map((item) => item?.permission);
  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>

      {/* Role Info Card */}
      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-xl">{role.name}</CardTitle>
          <CardDescription>
            {role.description || "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-semibold">ID:</span> {role.id}
            </div>
            <div>
              <span className="font-semibold">Organization ID:</span>{" "}
              {role.organizationId || "-"}
            </div>
            <div>
              <span className="font-semibold">System Role:</span>{" "}
              {role.isSystemRole ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(role.created_at).toLocaleString()}
            </div>
            <div>
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(role.updated_at).toLocaleString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Section */}
      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle>Permissions</CardTitle>
          <CardDescription>
            All permissions assigned to this role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AllPermission permissions={permissions} />
        </CardContent>
      </Card>

      {/* Optional: Tabs for future extensions */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="text-sm text-muted-foreground">
            Role overview content can go here. For example, who created it or
            last modified it.
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="text-sm text-muted-foreground">
            Role activity logs or history can go here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoleDetails;
