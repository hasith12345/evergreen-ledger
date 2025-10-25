"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { Sidebar } from "./sidebar"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show sidebar on login page (root path)
  const showSidebar = pathname !== "/"
  
  if (!showSidebar) {
    return (
      <div className="min-h-screen bg-background">
        <main className="w-full h-full">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      {/* add top padding on small screens so fixed mobile header doesn't overlap content
          add left padding on lg+ to account for the fixed desktop sidebar width (w-72) */}
      <main className="flex-1 overflow-auto pt-16 lg:pt-0 lg:pl-72">{children}</main>
    </div>
  )
}
