import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const UserDetailsLoading = () => {
  return (
    <div className=" mx-auto p-4 space-y-6 w-full">
      {/* Back Button */}
      <Skeleton className="h-10 w-10 rounded-md" />

      {/* ================= Header Skeleton ================= */}
      <Card className="bg-white/5 border border-white/10 w-full">
        <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6">
          {/* Avatar */}
          <Skeleton className="h-24 w-24 rounded-full" />

          {/* User Info */}
          <div className="flex-1 w-full space-y-4 text-center sm:text-left">
            {/* Name + Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-48 mx-auto sm:mx-0" />
                <Skeleton className="h-3 w-32 mx-auto sm:mx-0" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= Tabs Skeleton ================= */}
      <div className="space-y-4">
        {/* Tabs Bar */}
        <div className="inline-flex h-10 rounded-lg bg-white/10 p-1 gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>

        {/* Tab Content */}
        <Card className="bg-white/5">
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-3 w-64" />
          </CardHeader>

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDetailsLoading;
