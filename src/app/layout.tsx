import "~/styles/globals.css";

import { ThemeProvider } from "~/app/_components/theme-provider";
import { SidebarLayout } from "~/app/_components/sidebar-layout";
// import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/themes";
import { Figtree } from "next/font/google";
import { PostHogProvider } from "./_analytics/provider";

export const metadata: Metadata = {
  title: "SSA Member Dashboard",
  description: "A dashboard for SSA members and board members",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const figtree = Figtree({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>
      <PostHogProvider>
        <html
          lang="en"
          className={`${figtree.className}`}
          suppressHydrationWarning
        >
          <body suppressHydrationWarning>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarLayout>{children}</SidebarLayout>
            </ThemeProvider>
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}
