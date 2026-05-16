"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  Users, 
  Settings, 
  LogOut,
  Plus
} from "lucide-react";
import { clsx } from "clsx";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/projects" },
  { icon: CheckSquare, label: "My Tasks", href: "/tasks" },
  { icon: Users, label: "Team", href: "/team" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 glass-morphism border-r border-white/5 flex flex-col p-6 z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <CheckSquare className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Syncro</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                : "text-white/50 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className={clsx(
              "w-5 h-5 transition-transform duration-200 group-hover:scale-110",
              pathname === item.href ? "text-blue-400" : "text-white/40"
            )} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
        <button 
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-white/50 hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
