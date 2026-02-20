/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Eye, EyeOff, MoveRight } from "lucide-react";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { useUser } from "@/providers/AuthProvider";
import LargeYellowSvg from "@/components/svgIcon/LargeYellowSvg";
import { login } from "@/service/authService";
import { config } from "@/config";
import { usePermission } from "@/providers/PermissionProvider";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type TLoginData = z.infer<typeof loginSchema>;

const LoginComponent = () => {
  const router = useRouter();
  const { visible, toggle } = usePasswordToggle();
  const [redirect, setRedirect] = useState<string | null>(null);
  const { refetchUser, setIsLoading } = useUser();
  const { refetchPermission, setIsLoading: setPermissionLoading } =
    usePermission();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirectPath");
    if (redirectParam) {
      Promise.resolve().then(() => {
        setRedirect(redirectParam);
      });
    }
  }, []);

  const onSubmit = async (data: TLoginData) => {
    const toastId = toast.loading("logging in");
    try {
      const res = await login(data);
      if (res?.success) {
        setIsLoading(false);
        setPermissionLoading(false);
        await refetchUser();
        await refetchPermission();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push(redirect ? redirect : "/dashboard");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  const handleAdmin = async (data: { email: string; password: string }) => {
    const toastId = toast.loading("logging in");
    try {
      const res = await login(data);
      if (res?.success) {
        setIsLoading(false);
        setPermissionLoading(false);
        await refetchUser();
        await refetchPermission();
        toast.success(res?.message, { id: toastId, duration: 3000 });
        reset();
        router.push(redirect ? redirect : "/dashboard");
      } else {
        toast.error(res?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="rounded-lg bg-[linear-gradient(331deg,rgba(238,235,255,0.04)_-7.38%,rgba(238,235,255,0.02)_-7.37%,rgba(238,235,255,0.08)_107.38%)] px-4 py-4 relative max-w-sm">
      {/* top and bottom component0 */}
      <div className="absolute top-0 left-0 inset-2 border-l border-t border-[#221F33] rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-2 border-r border-b border-[#221F33] rounded-br-lg pointer-events-none" />

      <div className="space-y-4">
        {config.next_public_fast_login === "development" && (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() =>
                handleAdmin({
                  email: "admin@landlord.com",
                  password: "password@123",
                })
              }
              className="font-medium py-2 w-full rounded-full flex items-center justify-center text-[#C3C0D8] border border-[#2C293D] gap-2 cursor-pointer"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          {/* Email */}
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className={`${
              errors.email && "border-red-500 dark:border-red-400"
            } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
            {...register("email", { required: "Email is required" })}
          />

          {/* Password */}

          <div className="relative space-y-1">
            <input
              id="password"
              type={visible ? "text" : "password"}
              placeholder="Password"
              className={`${
                errors.password && "border-red-500 dark:border-red-400"
              } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={toggle}
              className="absolute right-4 top-3 text-[#514D6A] "
            >
              {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {/* <Link
                            href="/forgot-password"
                            className=" text-sm bg-[linear-gradient(180deg,#C3C0D8_0%,#7361E5_100%)] bg-clip-text text-transparent underline underline-offset-2 decoration-[#7361E5]"
                        >
                            Forgot Password?
                        </Link> */}
          </div>

          {/* Submit Button */}

          <button
            type="submit"
            disabled={isSubmitting}
            className="relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden w-full text-white"
          >
            {/* top and bottom line */}
            <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <div className="pointer-events-none">
              <LargeYellowSvg />
            </div>

            {/* Button text */}
            <p className="flex items-center gap-2">
              <span className="text-sm">Continue</span>
              <MoveRight />
            </p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
