"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LayoutDashboard, UserPlus, FileSearch, BarChart3, Map } from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Report Missing",
    href: "/dashboard/missing",
    icon: UserPlus,
  },
  {
    title: "Report UIDB",
    href: "/dashboard/uidb",
    icon: FileSearch,
  },
  {
    title: "Heatmap",
    href: "/dashboard/heatmap",
    icon: Map,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-muted/40">
      <div className="container flex h-14 items-center px-4 overflow-x-auto">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
