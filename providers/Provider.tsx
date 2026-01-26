import { ReactNode } from "react";
import AuthProvider from "./AuthProvider";

const Provider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Provider;
