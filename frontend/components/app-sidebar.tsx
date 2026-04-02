"use client";

import * as React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Inbox,
  Plus,
  Hash,
  ChevronRight,
  Settings,
  LogOut,
  User as UserIcon,
  Bell,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  MOCK_ORG,
  MOCK_USER,
  MOCK_WORKSPACES,
  MOCK_PROJECTS,
  MOCK_CHANNELS,
} from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function AppSidebar() {
  const { state } = useSidebar();

  const mainNav = [
    { name: "Overview", icon: LayoutDashboard, active: true },
    { name: "My tasks", icon: CheckSquare, badge: 5 },
    { name: "Inbox", icon: Inbox, badge: 3 },
  ];

  return (
    <Sidebar className="border-r border-zinc-200 dark:border-zinc-800" variant="sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-1 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#534AB7] text-white text-[11px] font-bold">
            {MOCK_ORG.avatar}
          </div>
          <span className="flex-1 font-semibold text-sm truncate">{MOCK_ORG.name}</span>
          <ChevronRight className="h-4 w-4 text-zinc-400 rotate-90" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={item.active}
                    className={item.active ? "bg-zinc-100 dark:bg-zinc-800" : ""}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-sm">{item.name}</span>
                    {item.badge && <Badge variant="destructive" className="h-4 px-1.5 text-[10px] rounded-full">{item.badge}</Badge>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Workspaces</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_WORKSPACES.map((ws) => (
                <SidebarMenuItem key={ws.id}>
                  <SidebarMenuButton>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: ws.color }} />
                    <span className="text-sm">{ws.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-zinc-500">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add workspace</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_PROJECTS.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton isActive={project.active}>
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className={project.active ? "font-medium text-sm" : "text-sm"}>{project.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Channels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_CHANNELS.map((channel) => (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton>
                    <Hash className="h-4 w-4" />
                    <span className="flex-1 text-sm">{channel.name}</span>
                    {channel.badge && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] rounded-full">{channel.badge}</Badge>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
          <Avatar className="h-8 w-8 rounded-full">
            <AvatarImage src={MOCK_USER.avatar} />
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-[11px]">
              {MOCK_USER.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex flex-col min-w-0">
            <span className="font-medium text-xs truncate">{MOCK_USER.name}</span>
            <span className="text-[10px] text-zinc-500 truncate">{MOCK_USER.role}</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-900" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
