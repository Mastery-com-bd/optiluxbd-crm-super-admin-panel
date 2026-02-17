import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/providers/AuthProvider";
import ReactProvider from "@/providers/ReactProvider";
import PermissionProvider from "@/providers/PermissionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Optilux CRM Super Admin Panel",
  description: "This is super admin panel for optiluxbd crm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <AuthProvider>
              <div className="w-full">
                <PermissionProvider>{children}</PermissionProvider>
              </div>
            </AuthProvider>

            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </ReactProvider>
      </body>
    </html>
  );
}
