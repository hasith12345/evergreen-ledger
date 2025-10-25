"use client"

import type React from "react"

import { Sidebar } from "./sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {/* add top padding on small screens so fixed mobile header doesn't overlap content
          add left padding on md+ to account for the fixed desktop sidebar width (w-72) */}
      <main className="flex-1 overflow-auto pt-5 md:pt-0 md:pl-72">{children}</main>
    </div>
  )
}
