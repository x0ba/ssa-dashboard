import { ClerkProvider } from "@clerk/nextjs";
import { SidebarInset, SidebarProvider } from "~/app/_components/ui/sidebar";
import { AppSidebar } from "~/app/_components/app-sidebar";
import "~/styles/globals.css";
// import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "SSA Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable}`}>
        <body>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
