"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarGroup,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarGroupContent,
} from "~/_components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/_components/ui/collapsible";

import { Separator } from "~/_components/ui/separator";

import Image from "next/image";
import {
  Calendar,
  ChevronDown,
  LayoutDashboard,
  LinkIcon,
} from "~/_components/icons";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const sidebarItems = [
  {
    label: "Overview",
    link: "/",
    icon: LayoutDashboard,
    id: 0,
  },
  {
    label: "Events",
    link: "/events",
    icon: Calendar,
    id: 1,
  },
  {
    label: "Links",
    link: "/links",
    icon: LinkIcon,
    id: 2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Image
              src="https://ba961nquml.ufs.sh/f/8WZL3qQlnribBWhmbCyk0pFvf4qzZU6HG2rjdxcKwEtXRoDn"
              alt="SSA Logo"
              width={32}
              height={32}
              priority
            />
            <h2 className="text-2xl font-bold">SSA Dashboard</h2>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Member Actions{" "}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {sidebarItems.map((item) => {
                      const isActive = pathname === item.link;
                      const Icon = item.icon;
                      return (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.link}>
                              <Icon />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <UserButton showName />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
