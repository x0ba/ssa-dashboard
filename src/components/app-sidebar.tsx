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
import { Button } from "./ui/button";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";

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
  },
  {
    label: "Events",
    link: "/events",
  },
  {
    label: "Links",
    link: "/links",
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
                    {sidebarItems.map((item, index) => (
                      <SidebarMenuItem key={index + 1}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <Image
                      src={memberInfo.image}
                      alt={memberInfo.name}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />{" "}
                    {memberInfo.name}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1 leading-none">
                      <span className="font-medium">{memberInfo.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {memberInfo.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
