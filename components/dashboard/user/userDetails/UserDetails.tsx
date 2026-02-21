"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Mail, Phone, ShieldCheck, ShieldX } from "lucide-react";
import { TUserData } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const statusColor: Record<string, string> = {
  ACTIVE: "bg-green-500/10 text-green-500",
  INACTIVE: "bg-gray-500/10 text-gray-400",
  SUSPENDED: "bg-yellow-500/10 text-yellow-500",
  DISABLED: "bg-red-500/10 text-red-500",
  REJECTED: "bg-red-500/10 text-red-500",
};

const UserDetailsPage = ({ user }: { user: TUserData }) => {
  const router = useRouter();
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>

      <Card className="relative overflow-hidden bg-white/5 border border-white/10">
        {/* subtle top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/10 to-transparent" />

        <CardContent className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          {/* Avatar */}
          <Avatar className="h-24 w-24 ring-2 ring-white/10 shadow-md">
            <AvatarImage src={user?.avatar_secure_url ?? undefined} />
            <AvatarFallback className="text-xl font-semibold">
              {user?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 w-full space-y-3 text-center sm:text-left">
            {/* Name + Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold leading-tight">
                  {user?.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  User ID: <span className="font-medium">{user?.userId}</span>
                </p>
              </div>

              <Badge
                className={`px-3 py-1 text-xs font-medium ${statusColor[user?.status]}`}
              >
                {user?.status}
              </Badge>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail size={14} />
                {user?.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone size={14} />
                {user?.phone}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Tabs ================= */}
      <Tabs defaultValue="overview" className="w-full space-y-4 flex flex-col">
        {/* Tab Bar */}
        <TabsList className="inline-flex h-10 rounded-lg bg-white/10 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <div>
          {/* ========== Overview Tab ========== */}
          <TabsContent value="overview" className="mt-4">
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>
                  Basic profile and account details
                </CardDescription>
              </CardHeader>

              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <b>ID:</b> {user?.id}
                </div>
                <div>
                  <b>User Code:</b> {user?.userId}
                </div>
                <div>
                  <b>Organization:</b> {user?.organizationId ?? "-"}
                </div>
                <div>
                  <b>Created At:</b>{" "}
                  {new Date(user?.created_at).toLocaleString()}
                </div>
                <div>
                  <b>Last Login:</b> {user?.last_login ?? "Never"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== Roles Tab ========== */}
          <TabsContent value="roles" className="mt-4">
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle>Assigned Roles</CardTitle>
                <CardDescription>
                  Access level and responsibilities
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3">
                {user?.roles.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No roles assigned
                  </p>
                ) : (
                  user?.roles.map((ur) => (
                    <div
                      key={ur.roleId}
                      className="p-4 rounded-lg border border-white/10"
                    >
                      <div className="font-medium">{ur.role.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {ur.role.description}
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ========== Security Tab ========== */}
          <TabsContent value="security" className="mt-4">
            <Card className="bg-white/5">
              <CardHeader>
                <CardTitle>Verification & Security</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-2">
                  {user?.email_verified ? (
                    <ShieldCheck className="text-green-500" />
                  ) : (
                    <ShieldX className="text-red-500" />
                  )}
                  Email Verified
                </div>

                <div className="flex items-center gap-2">
                  {user?.phone_verified ? (
                    <ShieldCheck className="text-green-500" />
                  ) : (
                    <ShieldX className="text-red-500" />
                  )}
                  Phone Verified
                </div>

                <Separator />

                <div>
                  <b>Approved:</b> {user?.is_approved ? "Yes" : "No"}
                </div>
                <div>
                  <b>Approved At:</b> {user?.approved_at ?? "-"}
                </div>
                <div>
                  <b>Approved By:</b> {user?.approved_by ?? "-"}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserDetailsPage;
