"use client"

import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Leaf,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import WeatherWidget from "./weather"

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/suppliers", label: "Suppliers", icon: Users },
    { href: "/procurement", label: "Procurement", icon: Leaf },
    { href: "/payroll", label: "Payroll", icon: DollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  // Desktop sidebar content with logo
  const DesktopSidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo - only for desktop */}
      <div className="p-6 border-b border-emerald-700/40 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner bg-white/6 flex items-center justify-center ring-1 ring-emerald-200/10">
          <img src="/logo.png" alt="EvergreenLedger Logo" className="w-9 h-9 object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-lg font-extrabold tracking-wide">Evergreen Ledger</h1>
          <p className="text-xs text-emerald-200/80">Tea Supply Ledger</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 min-h-0 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="block touch-manipulation" onClick={() => setMobileOpen(false)}>
              <div
                role="link"
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md group transition-all transform min-h-[44px] ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-emerald-100 hover:bg-emerald-700/30 hover:text-white hover:translate-x-1 active:bg-emerald-700/40"
                }`}
              >
                {isActive ? (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-r-md bg-emerald-300 shadow-sm" />
                ) : (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-r-md bg-transparent" />
                )}

                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-100" : "text-emerald-200/90 group-hover:text-white"}`} />
                <span className="font-medium text-base">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Weather */}
      <div className="px-3 mt-2 flex-shrink-0">
        <WeatherWidget />
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-emerald-700/40 flex-shrink-0 mt-auto">
        <button
          onClick={() => {
            // Clear any stored user data
            localStorage.clear()
            sessionStorage.clear()
            
            // Navigate to login page
            window.location.href = "/"
          }}
          className="w-full inline-flex items-center justify-between gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 shadow-md hover:from-emerald-600 hover:to-emerald-800 transform transition-all hover:-translate-y-0.5 text-base min-h-[44px] touch-manipulation active:from-emerald-600 active:to-emerald-800"
          aria-label="Logout"
          title="Logout"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/10 shadow-sm">
              <LogOut className="w-4 h-4 text-white" />
            </span>
            <div className="text-left">
              <div className="font-medium text-white">Logout</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )

  // Mobile sidebar content without logo
  const MobileSidebarContent = (
    <div className="flex flex-col h-full">
      {/* Navigation - takes most of the space */}
      <nav className="flex-1 p-3 space-y-1 min-h-0 overflow-y-auto pt-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="block touch-manipulation" onClick={() => setMobileOpen(false)}>
              <div
                role="link"
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-md group transition-all transform min-h-[44px] ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-emerald-100 hover:bg-emerald-700/30 hover:text-white hover:translate-x-1 active:bg-emerald-700/40"
                }`}
              >
                {isActive ? (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-md bg-emerald-300 shadow-sm" />
                ) : (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-md bg-transparent" />
                )}

                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-100" : "text-emerald-200/90 group-hover:text-white"}`} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Weather - compact for mobile */}
      <div className="px-3 mt-2 flex-shrink-0">
        <WeatherWidget />
      </div>

      {/* Logout - always visible at bottom */}
      <div className="p-3 border-t border-emerald-700/40 flex-shrink-0 mt-auto">
        <button
          onClick={() => {
            // Clear any stored user data
            localStorage.clear()
            sessionStorage.clear()
            
            // Close mobile drawer
            setMobileOpen(false)
            
            // Navigate to login page
            window.location.href = "/"
          }}
          className="w-full inline-flex items-center justify-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 shadow-md hover:from-emerald-600 hover:to-emerald-800 transform transition-all hover:-translate-y-0.5 text-sm min-h-[44px] touch-manipulation active:from-emerald-600 active:to-emerald-800"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="w-4 h-4 text-white" />
          <span className="font-medium text-white">Logout</span>
        </button>
      </div>
    </div>
  )

  // Manage body scroll + keyboard focus when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      setTimeout(() => closeBtnRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ""
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }

    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      {/* Desktop / tablet sidebar — fixed so it doesn't scroll with the page */}
      <aside className="hidden lg:flex w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white h-screen flex-col shadow-lg fixed left-0 top-0 z-20">
        {DesktopSidebarContent}
      </aside>

      {/* Mobile header with hamburger, logo and title */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-emerald-800/95 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-white bg-emerald-700/60 hover:bg-emerald-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white touch-manipulation"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="EvergreenLedger Logo" className="w-6 h-6 object-contain" />
            <span className="text-white font-semibold text-sm">EvergreenLedger</span>
          </div>
        </div>
      </div>

      {/* Mobile drawer overlay + full-height drawer (no internal scroll) */}
      <div className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] h-screen transform bg-gradient-to-b from-emerald-800 to-emerald-900 text-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
            mobileOpen ? "translate-x-0 pointer-events-auto" : "-translate-x-full pointer-events-none"
          }`}
        >
          {/* Close button header */}
          <div className="p-4 flex items-center justify-end border-b border-emerald-700/40 flex-shrink-0">
            <button
              ref={closeBtnRef}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white touch-manipulation"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Navigation - scrollable middle section */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className="block touch-manipulation" onClick={() => setMobileOpen(false)}>
                  <div
                    role="link"
                    aria-current={isActive ? "page" : undefined}
                    title={item.label}
                    className={`relative flex items-center gap-3 px-3 py-3 rounded-md group transition-all transform min-h-[44px] ${
                      isActive
                        ? "bg-emerald-700 text-white shadow-md"
                        : "text-emerald-100 hover:bg-emerald-700/30 hover:text-white hover:translate-x-1 active:bg-emerald-700/40"
                    }`}
                  >
                    {isActive ? (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-md bg-emerald-300 shadow-sm" />
                    ) : (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-md bg-transparent" />
                    )}

                    <Icon className={`w-5 h-5 ${isActive ? "text-emerald-100" : "text-emerald-200/90 group-hover:text-white"}`} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Weather widget - flexible */}
          <div className="px-3 pb-2 flex-shrink-0">
            <WeatherWidget />
          </div>

          {/* Logout button - always at bottom */}
          <div className="p-3 border-t border-emerald-700/40 flex-shrink-0">
            <button
              onClick={() => {
                // Clear any stored user data
                localStorage.clear()
                sessionStorage.clear()
                
                // Close mobile drawer
                setMobileOpen(false)
                
                // Navigate to login page
                window.location.href = "/"
              }}
              className="w-full inline-flex items-center justify-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 shadow-md hover:from-emerald-600 hover:to-emerald-800 transform transition-all hover:-translate-y-0.5 text-sm min-h-[44px] touch-manipulation active:from-emerald-600 active:to-emerald-800"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-4 h-4 text-white" />
              <span className="font-medium text-white">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}
