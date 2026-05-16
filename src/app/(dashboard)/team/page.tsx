import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { User, ShieldCheck, Mail, MoreVertical } from "lucide-react";
import { redirect } from "next/navigation";

export default async function TeamPage() {
  const session = await auth();
  if ((session?.user as any)?.role !== "ADMIN") {
    // For now, let members see the team but not manage it
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-white/40">Manage roles and permissions for your team</p>
        </div>
        {(session?.user as any)?.role === "ADMIN" && (
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all">
            Invite Member
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="glass-card p-6 space-y-6 relative overflow-hidden">
            {user.role === "ADMIN" && (
              <div className="absolute top-0 right-0 p-3">
                 <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
            )}
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/5">
                <User className="w-8 h-8 text-white/20" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{user.name}</h3>
                <p className="text-white/40 text-sm flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${user.role === "ADMIN" ? "bg-blue-500/20 text-blue-400" : "bg-white/5 text-white/40"}`}>
                {user.role}
              </span>
              <button className="text-white/20 hover:text-white transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
