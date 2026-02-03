"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Settings,
  Link as LinkIcon,
  BarChart3,
  Palette,
} from "lucide-react";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Links",
      href: "/admin/links",
      icon: (
        <LinkIcon className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 opacity-50" />
      ),
    },
    {
      label: "Analytics",
      href: "/admin/analytics",
      icon: (
        <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 opacity-50" />
      ),
    },
    {
      label: "Temas",
      href: "/admin/themes",
      icon: (
        <Palette className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0 opacity-50" />
      ),
    },
    {
      label: "Configuración",
      href: "/admin/settings",
      icon: (
        <Settings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <Sidebar animate={true}>
      <SidebarBody className="justify-between gap-10 bg-zinc-950 border-r border-zinc-800">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-6 w-6 bg-white rounded-md flex-shrink-0"></div>
            <h2 className="font-bold text-lg tracking-tight text-white">Bion</h2>
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink 
                key={idx} 
                link={link}
                className={cn(
                  "hover:bg-zinc-800/50 rounded-md px-2",
                  pathname === link.href && "bg-zinc-800"
                )}
              />
            ))}
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
