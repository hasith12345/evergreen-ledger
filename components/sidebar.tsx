"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Leaf, DollarSign, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/suppliers", label: "Suppliers", icon: Users },
    { href: "/procurement", label: "Procurement", icon: Leaf },
    { href: "/payroll", label: "Payroll", icon: DollarSign },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-72 bg-gradient-to-b from-emerald-800 to-emerald-900 text-white min-h-screen flex flex-col shadow-lg sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-emerald-700/40 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner bg-white/6 flex items-center justify-center ring-1 ring-emerald-200/10 relative">
          {/* keep original project logo, add a small leaf badge overlay */}
          <img
            src="/logo.png"
            alt="EvergreenLedger Logo"
            className="w-9 h-9 object-contain"
            style={{ imageRendering: 'crisp-edges' }}
          />
          <span className="absolute -top-1 -right-1 bg-emerald-600 rounded-full p-0.5 ring-1 ring-white/20 shadow-sm">
            <Leaf className="w-3 h-3 text-white" />
          </span>
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-lg font-extrabold tracking-wide">Evergreen Ledger</h1>
          <p className="text-xs text-emerald-200/80">Tea Supply Ledger</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className="block">
              <div
                role="link"
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-md group transition-all transform ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'text-emerald-100 hover:bg-emerald-700/30 hover:text-white hover:translate-x-1'
                }`}
              >
                {/* active indicator */}
                {isActive ? (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-r-md bg-emerald-300 shadow-sm" />
                ) : (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-9 w-1 rounded-r-md bg-transparent" />
                )}

                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-100' : 'text-emerald-200/90 group-hover:text-white'}`} />
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-emerald-700/40">
        <a
          href="/"
          className="w-full inline-flex items-center justify-between gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-md hover:from-emerald-600 hover:to-emerald-800 transform transition-all hover:-translate-y-0.5"
          aria-label="Logout"
          title="Logout"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/10 shadow-sm">
              <LogOut className="w-4 h-4 text-white" />
            </span>
            <div className="text-left">
              <div className="font-medium text-white">Logout</div>
              <div className="text-xs text-emerald-100/80">Sign out of your account</div>
            </div>
          </div>
          <div className="text-xs text-emerald-100/90 opacity-90">Goodbye</div>
        </a>
      </div>
    </aside>
  )
}
