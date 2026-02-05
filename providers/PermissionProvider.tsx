"use client";

import { getUserPermisssion } from "@/service/user";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type TPermissionProvider = {
  email: string;
  isSuperAdmin: boolean;
  name: string;
  organizationId: number | null;
  userId: number;
  roles: string[];
  permissions: string[];
};

export type TPermissionProviderValue = {
  userPermissions: TPermissionProvider | null;
  setUserPermissions: (userPermissions: TPermissionProvider | null) => void;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  refetchPermission: () => Promise<void>;
};

const PermissionContext = createContext<TPermissionProviderValue | undefined>(
  undefined,
);

const PermissionProvider = ({ children }: { children: React.ReactNode }) => {
  const [userPermissions, setUserPermissions] =
    useState<TPermissionProvider | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handlePermissions = async () => {
    const result = await getUserPermisssion();
    const permissions = result?.data;
    setUserPermissions(permissions);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) return;
    Promise.resolve().then(() => {
      handlePermissions();
    });
  }, [isLoading]);

  return (
    <PermissionContext.Provider
      value={{
        userPermissions,
        setUserPermissions,
        isLoading,
        setIsLoading,
        refetchPermission: handlePermissions,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error(
      " permission can be used only within the Use provider hook",
    );
  }
  return context;
};

export default PermissionProvider;
