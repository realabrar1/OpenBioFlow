"use client";

import React from "react";
import { Bell, Search, Terminal, Wifi, Cloud } from "lucide-react";

export function Header() {
  return (
    <header className="h-14 border-b border-border bg-card text-foreground flex items-center justify-between px-6 shrink-0">
      {/* Left Path Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <span>workspace</span>
          <span>/</span>
          <span className="text-foreground font-semibold">pbmc3k-transcriptomics</span>
        </div>
        <span className="h-4 w-[1px] bg-border" />
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-success/15 border border-success/30 text-success text-[10px] font-semibold">
          <Wifi size={10} className="animate-pulse" />
          <span>Gateway Live</span>
        </div>
      </div>

      {/* Right Search and Utility Tools */}
      <div className="flex items-center gap-4">
        {/* Mock Search Input */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search commands... (Cmd + K)"
            disabled
            className="w-64 pl-9 pr-4 py-1.5 rounded-lg border border-border bg-secondary/50 text-xs text-muted-foreground cursor-not-allowed focus:outline-none"
          />
        </div>

        {/* Terminal Button */}
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
          <Terminal size={16} />
        </button>

        {/* Notification Bell */}
        <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all relative">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        {/* Sync Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Cloud size={14} />
          <span className="hidden sm:inline">Synced</span>
        </div>
      </div>
    </header>
  );
}
