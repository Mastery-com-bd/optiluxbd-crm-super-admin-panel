import { AppSidebar } from "@/components/pages/shared/dashboard/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import Navbar from "@/components/pages/shared/dashboard/navbar";

// Load custom fonts
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// Metadata for Next.js
export const metadata: Metadata = {
    title: "Optilux CRM",
    description: "This is the dashboard of Optiluxbd CRM",
};

// Root layout component
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`
        ${geistSans.variable} ${geistMono.variable} 
        antialiased 
        relative 
        min-h-screen 
        bg-[linear-gradient(40deg,hsl(0_0%_0%)_2%,hsl(285_65%_8%)_34%,hsl(278_72%_13%)_46%,hsl(278_72%_13%)_57%,hsl(285_65%_8%)_69%,hsl(0_0%_0%)_99%)]
        text-white`}
        >
            {/* Layout Structure */}
            <div className="max-w-360 mx-auto relative">
                <SidebarProvider className="px-4" defaultOpen={true}>
                    <AppSidebar />
                    <SidebarInset>
                        <Navbar />
                        <div className="flex flex-1 flex-col w-full mx-auto gap-4 py-4 px-1 overflow-hidden max-w-[1135px]">
                            {children}
                        </div>
                    </SidebarInset>
                </SidebarProvider>
            </div>
        </div>
    );
}