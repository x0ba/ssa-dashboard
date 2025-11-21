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
} from "./ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Separator } from "./ui/separator";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const memberInfo = {
  name: "Daniel Xu",
  email: "ddxu@ucsd.edu",
  role: "Member",
  image:
    "https://ba961nquml.ufs.sh/f/8WZL3qQlnribccjRQcHJmjybTOUgLDCH1Xz7RoWupVSqhi45",
};

const sidebarItems = [
  {
    label: "Overview",
    link: "/",
    id: 0,
  },
  {
    label: "Events",
    link: "/events",
    id: 1,
  },
  {
    label: "Links",
    link: "/links",
    id: 2,
  },
];

export function AppSidebar() {
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
                    {sidebarItems.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton>
                          <Link href={item.link}>{item.label}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
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
