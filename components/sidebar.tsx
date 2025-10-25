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

  // Sidebar content — uses responsive paddings so mobile compresses
  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-3 md:p-6 border-b border-emerald-700/40 flex items-center gap-3 md:gap-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-inner bg-white/6 flex items-center justify-center ring-1 ring-emerald-200/10">
          <img src="/logo.png" alt="EvergreenLedger Logo" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-base md:text-lg font-extrabold tracking-wide">Evergreen Ledger</h1>
          <p className="text-[11px] md:text-xs text-emerald-200/80">Tea Supply Ledger</p>
        </div>
      </div>

      {/* Navigation (no internal scrolling; content should compress) */}
      <nav className="flex-1 p-2 md:p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="block" onClick={() => setMobileOpen(false)}>
              <div
                role="link"
                aria-current={isActive ? "page" : undefined}
                title={item.label}
                className={`relative flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-md group transition-all transform ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-emerald-100 hover:bg-emerald-700/30 hover:text-white hover:translate-x-1"
                }`}
              >
                {isActive ? (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 md:h-9 w-1 rounded-r-md bg-emerald-300 shadow-sm" />
                ) : (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 md:h-9 w-1 rounded-r-md bg-transparent" />
                )}

                <Icon className={`w-5 h-5 ${isActive ? "text-emerald-100" : "text-emerald-200/90 group-hover:text-white"}`} />
                <span className="font-medium text-sm md:text-base">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Weather */}
      <div className="px-2 md:px-3 mt-2">
        <WeatherWidget />
      </div>

      {/* Logout */}
      <div className="p-2 md:p-4 border-t border-emerald-700/40">
        <a
          href="/"
          className="w-full inline-flex items-center justify-between gap-3 px-2 py-2 md:px-3 md:py-3 rounded-lg bg-gradient-to-r from-emerald-700 to-emerald-800 shadow-md hover:from-emerald-600 hover:to-emerald-800 transform transition-all hover:-translate-y-0.5 text-sm md:text-base"
          aria-label="Logout"
          title="Logout"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 ring-1 ring-white/10 shadow-sm">
              <LogOut className="w-4 h-4 text-white" />
            </span>
            <div className="text-left">
              <div className="font-medium text-white">Logout</div>
            </div>
          </div>
        </a>
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
      {/* Desktop / tablet sidebar */}
      <aside className="hidden md:flex w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white min-h-screen flex-col shadow-lg sticky top-0">
        {SidebarContent}
      </aside>

      {/* Mobile header with hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-2 z-50 flex items-center justify-between px-3 py-2 bg-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-md p-2 text-white bg-emerald-700/60 hover:bg-emerald-700/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          
        </div>
      </div>

      {/* Mobile drawer overlay + full-height drawer (no internal scroll) */}
  <div className={`fixed inset-0 z-40 md:hidden`} aria-hidden={!mobileOpen}>
        {/* overlay */}
        <div
          className={`absolute bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100 " : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

  {/* drawer */}
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className={`fixed left-0 top-0 bottom-0 w-80 max-w-full h-screen transform bg-gradient-to-b from-emerald-800 to-emerald-900 text-white shadow-xl transition-transform duration-300 ease-in-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-3 md:p-4 flex items-center justify-between border-b border-emerald-700/30">
            <div className="flex items-center gap-3">
             
             
            </div>
            <button
              ref={closeBtnRef}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* SidebarContent placed directly — it will compress rather than scroll */}
          <div className="flex flex-col h-full">{SidebarContent}</div>
        </aside>
      </div>
    </>
  )
}
