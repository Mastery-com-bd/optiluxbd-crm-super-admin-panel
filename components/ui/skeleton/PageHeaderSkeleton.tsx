import { ReactNode } from "react";
import { Skeleton } from "../skeleton";

const PageHeaderSkeleton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-4 w-full">
        <Skeleton className="h-10 w-40 " />
        <Skeleton className="h-4 w-96" />
      </div>
      {children}
    </div>
  );
};

export default PageHeaderSkeleton;
