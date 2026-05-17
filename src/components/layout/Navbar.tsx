"use client";

import { Bell, Search, User } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Navbar() {
<<<<<<< HEAD
  const { data: session, status } = useSession();
  const isLoading = status === "loading";
=======
  const { data: session } = useSession();
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a

  return (
    <header className="h-20 flex items-center justify-between px-8 glass-morphism border-b border-white/5 sticky top-0 z-40">
      <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-xl border border-white/5 w-96">
        <Search className="w-4 h-4 text-white/40" />
        <input 
          type="text" 
          placeholder="Search tasks, projects..." 
          className="bg-transparent border-none outline-none text-sm text-white placeholder:text-white/20 w-full"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-white/60 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#0a0a0c]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right">
<<<<<<< HEAD
            {isLoading ? (
              <div className="space-y-1">
                <div className="h-4 w-24 bg-white/5 animate-pulse rounded" />
                <div className="h-3 w-16 bg-white/5 animate-pulse rounded" />
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold text-white">{session?.user?.name || "User"}</p>
                <p className="text-xs text-white/40 capitalize">{(session?.user as any)?.role || "Member"}</p>
              </>
            )}
=======
            <p className="text-sm font-semibold text-white">{session?.user?.name || "User"}</p>
            <p className="text-xs text-white/40 capitalize">{(session?.user as any)?.role || "Member"}</p>
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center overflow-hidden">
            <User className="text-white/40 w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
