"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  FolderOpen,
  UploadCloud,
  MessageSquare,
  Network,
  Clock,
  BookOpen,
  Image,
  FileText,
  Settings,
  Users,
  Database,
  Activity,
  ShieldAlert,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarItem {
  name: string;
  icon: React.ComponentType<any>;
  href: string;
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  const workspaceItems: SidebarItem[] = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Project Workspace", icon: FolderOpen, href: "/workspace" },
    { name: "Upload Dataset", icon: UploadCloud, href: "/upload" }
  ];

  const toolsItems: SidebarItem[] = [
    { name: "AI Chat Panel", icon: MessageSquare, href: "/chat" },
    { name: "Workflow Builder", icon: Network, href: "/workflows" },
    { name: "Pipeline Timeline", icon: Clock, href: "/pipelines" },
    { name: "Notebook Viewer", icon: FileText, href: "/notebook" }
  ];

  const resourcesItems: SidebarItem[] = [
    { name: "Literature Panel", icon: BookOpen, href: "/literature" },
    { name: "Visualizations", icon: Image, href: "/visualizations" },
    { name: "Report Builder", icon: FileText, href: "/reports" }
  ];

  const platformItems: SidebarItem[] = [
    { name: "Deployment Status", icon: Database, href: "/deployment" },
    { name: "Activity Log", icon: Activity, href: "/activity" },
    { name: "Audit Trail", icon: ShieldAlert, href: "/audit" },
    { name: "Team Settings", icon: Users, href: "/team" },
    { name: "System Settings", icon: Settings, href: "/settings" }
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside
      className={`h-screen border-r border-border bg-card text-foreground flex flex-col justify-between transition-all duration-300 relative ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top Brand Logo */}
      <div>
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/10 shrink-0">
            Φ
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <h2 className="text-sm font-bold tracking-tight bg-gradient-to-r from-foreground to-muted bg-clip-text text-transparent">
                OpenBioFlow AI
              </h2>
              <p className="text-[10px] text-muted-foreground">Orchestrator</p>
            </div>
          )}
        </div>

        {/* Collapsible toggle buttons */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-[-12px] top-12 h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary shadow-sm z-50"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {/* Workspace Groups */}
        <nav className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          {/* Group 1: Workspace */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Workspace
              </h3>
            )}
            <ul className="space-y-1">
              {workspaceItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 2: Tools */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Tools
              </h3>
            )}
            <ul className="space-y-1">
              {toolsItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 3: Resources */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Resources
              </h3>
            )}
            <ul className="space-y-1">
              {resourcesItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Group 4: Platform */}
          <div>
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Platform
              </h3>
            )}
            <ul className="space-y-1">
              {platformItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                  >
                    <item.icon size={16} className="shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Sidebar Footer (Theme toggle & profile) */}
      <div className="p-3 border-t border-border space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-3 p-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all shrink-0"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {!isCollapsed && (
            <span className="truncate">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold flex items-center justify-center shadow-inner text-xs shrink-0">
            DR
          </div>
          {!isCollapsed && (
            <div className="truncate">
              <h4 className="text-xs font-bold leading-none text-foreground truncate">
                Dr. Researcher
              </h4>
              <p className="text-[10px] text-muted-foreground truncate">
                admin@openbioflow.ai
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
