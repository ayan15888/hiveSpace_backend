"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
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
  Users,
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
  SidebarMenuAction,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth/authStore";
import { useWorkspaceStore } from "@/store/workspace/workspaceStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MOCK_CHANNELS } from "@/lib/mock-data";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { CreateWorkspaceModal } from "@/features/dashboard/components/CreateWorkspaceModal";
import { CreateProjectModal } from "@/features/dashboard/components/CreateProjectModal";
import { CreateTeamModal } from "@/features/dashboard/components/CreateTeamModal";

export function AppSidebar() {
  const router = useRouter();
  const { state } = useSidebar();
  const { user, logout } = useAuthStore();
  const { 
    tenants, 
    workspaces, 
    projects, 
    teams,
    activeTenant, 
    activeWorkspace,
    activeProject,
    activeTeam,
    setActiveTenant,
    setActiveWorkspace,
    setActiveProject,
    setActiveTeam
  } = useWorkspaceStore();

  const mainNav = [
    { name: "Overview", icon: LayoutDashboard, active: true },
    { name: "My tasks", icon: CheckSquare, badge: 5 },
    { name: "Inbox", icon: Inbox, badge: 3 },
  ];

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = React.useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = React.useState(false);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };
  
  const handleLogout = () => {
    logout();
    gooeyToast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Sidebar className="border-r border-zinc-200 dark:border-zinc-800" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        {activeTenant && (
          <div className="flex items-center gap-3 px-1 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#534AB7] text-white text-[11px] font-bold">
              {activeTenant.name.substring(0, 2).toUpperCase()}
            </div>
            <span className="flex-1 font-semibold text-sm truncate group-data-[collapsible=icon]:hidden">{activeTenant.name}</span>
            <ChevronRight className="h-4 w-4 text-zinc-400 rotate-90 group-data-[collapsible=icon]:hidden" />
          </div>
        )}
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
                    tooltip={item.name}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1 text-sm group-data-[collapsible=icon]:hidden">{item.name}</span>
                    <div className="group-data-[collapsible=icon]:hidden">
                    {item.badge && <Badge variant="destructive" className="h-4 px-1.5 text-[10px] rounded-full">{item.badge}</Badge>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Workspaces</SidebarGroupLabel>
            <button 
              onClick={() => setIsWorkspaceModalOpen(true)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 group-data-[collapsible=icon]:hidden"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaces.map((ws) => (
                <SidebarMenuItem key={ws.id}>
                  <SidebarMenuButton 
                    tooltip={ws.name}
                    isActive={activeWorkspace?.id === ws.id}
                    onClick={() => setActiveWorkspace(ws)}
                  >
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: ws.color }} />
                    <span className="text-sm group-data-[collapsible=icon]:hidden">{ws.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton className="text-zinc-500" tooltip="Add workspace">
                  <Plus className="h-4 w-4 shrink-0" />
                  <span className="text-sm group-data-[collapsible=icon]:hidden">Add workspace</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <div className="flex items-center justify-between pr-2">
            <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Projects</SidebarGroupLabel>
            <button 
              onClick={() => setIsProjectModalOpen(true)}
              className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-900 group-data-[collapsible=icon]:hidden"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton 
                    tooltip={project.name}
                    isActive={activeProject?.id === project.id}
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: project.color }} />
                    <span className={activeProject?.id === project.id ? "font-medium text-sm group-data-[collapsible=icon]:hidden text-zinc-900 dark:text-zinc-100" : "text-sm group-data-[collapsible=icon]:hidden text-zinc-700 dark:text-zinc-300"}>
                      {project.name}
                    </span>
                  </SidebarMenuButton>
                  {activeProject?.id === project.id && (
                    <SidebarMenuAction
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsTeamModalOpen(true);
                      }}
                      className="hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-500 hover:text-zinc-900"
                      title="Add team to project"
                    >
                      <Plus className="h-3 w-3" />
                    </SidebarMenuAction>
                  )}
                  {activeProject?.id === project.id && teams.length > 0 && (
                    <SidebarMenuSub>
                      {teams.map((team) => (
                        <SidebarMenuSubItem key={team.id}>
                          <SidebarMenuSubButton
                            isActive={activeTeam?.id === team.id}
                            onClick={() => setActiveTeam(team)}
                          >
                            <Users className="h-4 w-4" />
                            <span>{team.name}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="mx-4 my-2 w-auto group-data-[collapsible=icon]:hidden" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-medium uppercase tracking-wider text-zinc-500">Channels</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_CHANNELS.map((channel) => (
                <SidebarMenuItem key={channel.id}>
                  <SidebarMenuButton tooltip={channel.name}>
                    <Hash className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-sm group-data-[collapsible=icon]:hidden">{channel.name}</span>
                    <div className="group-data-[collapsible=icon]:hidden">
                    {channel.badge && <Badge variant="secondary" className="h-4 px-1.5 text-[10px] rounded-full">{channel.badge}</Badge>}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800">
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="text-zinc-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
              tooltip="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm group-data-[collapsible=icon]:hidden">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

      <SidebarFooter className="p-4">
        {user && (
          <div className="flex items-center gap-3 p-1 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors overflow-hidden">
            <Avatar className="h-8 w-8 shrink-0 rounded-full">
              <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-[11px]">
                {getInitials(user.username)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
              <span className="font-medium text-xs truncate">{user.username}</span>
              <span className="text-[10px] text-zinc-500 truncate">{user.role}</span>
            </div>
            <div className="h-2 w-2 shrink-0 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-900 group-data-[collapsible=icon]:hidden" />
          </div>
        )}
      </SidebarFooter>

      <CreateWorkspaceModal 
        isOpen={isWorkspaceModalOpen} 
        onClose={() => setIsWorkspaceModalOpen(false)} 
      />
      <CreateProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
      <CreateTeamModal 
        isOpen={isTeamModalOpen} 
        onClose={() => setIsTeamModalOpen(false)} 
      />
    </Sidebar>
  );
}
