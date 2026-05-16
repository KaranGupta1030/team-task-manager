import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  LayoutDashboard
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Fetch real stats from DB
  const totalTasks = await prisma.task.count({
    where: { assigneeId: userId }
  });

  const completedTasks = await prisma.task.count({
    where: { assigneeId: userId, status: "DONE" }
  });

  const inProgressTasks = await prisma.task.count({
    where: { assigneeId: userId, status: "IN_PROGRESS" }
  });

  const overdueTasks = await prisma.task.count({
    where: { 
      assigneeId: userId, 
      status: { not: "DONE" },
      dueDate: { lt: new Date() }
    }
  });

  const stats = [
    { label: "Total Tasks", value: totalTasks, icon: LayoutDashboard, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "In Progress", value: inProgressTasks, icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Completed", value: completedTasks, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Overdue", value: overdueTasks, icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Welcome back, <span className="gradient-text">{session?.user?.name || "User"}</span>!
        </h1>
        <p className="text-white/40 text-lg">Here&apos;s what&apos;s happening with your projects today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-6 group hover:border-white/20 transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-white/40 font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Recent Tasks</h3>
            <button className="text-blue-400 text-sm font-medium hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {totalTasks === 0 ? (
              <p className="text-white/20 text-center py-8">No tasks assigned to you yet.</p>
            ) : (
              // This would map over actual tasks
              null
            )}
          </div>
        </div>

        <div className="glass-card p-8 space-y-6">
          <h3 className="text-xl font-bold">Team Activity</h3>
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
             <p className="text-white/20">No recent activity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
