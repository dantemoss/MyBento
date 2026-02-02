"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  Link as LinkIcon,
  BarChart3,
  Palette,
  ChevronDown,
  ExternalLink,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string | number
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Links",
    href: "/admin/links",
    icon: LinkIcon,
    badge: "Próximamente",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    badge: "Próximamente",
  },
  {
    label: "Temas",
    href: "/admin/themes",
    icon: Palette,
    badge: "Próximamente",
  },
  {
    label: "Configuración",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin"
    }
    return pathname.startsWith(href)
  }

  const toggleItem = (href: string) => {
    setOpenItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-[296px] border-r border-zinc-800 bg-zinc-950">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 bg-white rounded-md"></div>
          <h2 className="font-bold text-lg tracking-tight text-white">Bion</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          const hasItems = item.items && item.items.length > 0
          const isOpen = openItems.includes(item.href)
          const isDisabled = !!item.badge

          if (hasItems) {
            return (
              <div key={item.href}>
                <button
                  onClick={() => toggleItem(item.href)}
                  className={cn(
                    "group relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-100 ease-linear select-none outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600",
                    active
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                  disabled={isDisabled}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 text-zinc-400">
                      {item.badge}
                    </span>
                  )}
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 ml-2 transition-transform duration-200",
                      isOpen && "transform rotate-180"
                    )}
                  />
                </button>
                {isOpen && item.items && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.items.map((childItem) => {
                      const ChildIcon = childItem.icon
                      const childActive = isActive(childItem.href)
                      return (
                        <Link
                          key={childItem.href}
                          href={childItem.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-100",
                            childActive
                              ? "bg-zinc-800 text-white"
                              : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                          )}
                        >
                          <ChildIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          <span className="flex-1">{childItem.label}</span>
                          {childItem.badge && (
                            <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 text-zinc-400">
                              {childItem.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={isDisabled ? "#" : item.href}
              className={cn(
                "group relative flex w-full cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-100 ease-linear select-none outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600",
                active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white",
                isDisabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
              onClick={(e) => isDisabled && e.preventDefault()}
            >
              <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-zinc-800 text-zinc-400">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
