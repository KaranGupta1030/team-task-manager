import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  LayoutDashboard,
  Calendar,
  User as UserIcon,
  Folder,
  Plus,
  ArrowRight,
  Target,
  Users
} from "lucide-react";
import Link from "next/link";
<<<<<<< HEAD
import CreateProjectModal from "@/components/CreateProjectModal";
=======
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  // Fetch real stats from DB
  const [
    myTasksCount,
    projects,
    completedTasksCount,
    overdueTasksCount,
    recentTasks
  ] = await Promise.all([
    prisma.task.count({ where: { assigneeId: userId } }),
    prisma.project.findMany({ 
      where: { members: { some: { userId } } },
      include: { _count: { select: { tasks: true } } },
      take: 3,
      orderBy: { updatedAt: "desc" }
    }),
    prisma.task.count({ where: { assigneeId: userId, status: "DONE" } }),
    prisma.task.count({ 
      where: { 
        assigneeId: userId, 
        status: { not: "DONE" },
        dueDate: { lt: new Date() }
      } 
    }),
    prisma.task.findMany({
      where: { 
        OR: [
          { assigneeId: userId },
          { createdById: userId }
        ]
      },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { project: true, assignee: true }
    })
  ]);

  const stats = [
    { label: "My Tasks", value: myTasksCount, icon: UserIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Projects", value: projects.length, icon: Folder, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Completed", value: completedTasksCount, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { label: "Overdue", value: overdueTasksCount, icon: AlertCircle, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
<<<<<<< HEAD
    <div className="space-y-10">
=======
    <div className="space-y-10 animate-fade-in">
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
      {/* Header with Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Welcome back, <span className="gradient-text">{session?.user?.name || "User"}</span>!
          </h1>
          <p className="text-white/40 text-lg">Here&apos;s a summary of your workspace activity.</p>
        </div>
        <div className="flex items-center gap-4">
           <Link href="/projects" className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-bold transition-all border border-white/5">
             <Folder className="w-5 h-5" />
             All Projects
           </Link>
           <Link href="/tasks" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] text-white rounded-xl font-bold transition-all">
             <Plus className="w-5 h-5" />
             New Task
           </Link>
        </div>
      </div>

      {/* Main Stats Grid */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects List */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Active Projects
              </h3>
              <Link href="/projects" className="text-sm text-blue-400 hover:underline">View all</Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.length === 0 ? (
<<<<<<< HEAD
                <div className="col-span-full glass-card p-10 flex flex-col items-center justify-center text-center gap-6">
                  <div className="space-y-2">
                    <p className="text-white/20 text-lg font-medium">No active projects yet.</p>
                    <p className="text-sm text-white/10">Create your first workspace to start managing tasks.</p>
                  </div>
                  <CreateProjectModal />
=======
                <div className="col-span-full glass-card p-10 text-center text-white/20">
                  No active projects. Start by creating one!
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
                </div>
              ) : (
                projects.map((p) => (
                  <div key={p.id} className="glass-card p-6 space-y-4 hover:border-white/20 transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Folder className="w-5 h-5 text-white/40" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Updated {new Date(p.updatedAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg group-hover:text-blue-400 transition-colors">{p.name}</h4>
                      <p className="text-sm text-white/40 line-clamp-1">{p.description || "No description"}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                       <span className="text-xs text-white/40">{p._count.tasks} tasks assigned</span>
                       <div className="flex -space-x-1">
                          {[1,2].map(i => <div key={i} className="w-5 h-5 rounded-full bg-blue-500/20 border border-[#0a0a0c]" />)}
                       </div>
                    </div>
                  </div>
                ))
              )}
           </div>

           {/* Recent Activity Table */}
           <div className="glass-card overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-bold">Recent Task Activity</h3>
              </div>
              <div className="divide-y divide-white/5">
                {recentTasks.length === 0 ? (
                  <p className="p-10 text-center text-white/20">No recent tasks found.</p>
                ) : (
                  recentTasks.map((task) => (
                    <div key={task.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${task.status === "DONE" ? "bg-emerald-500" : task.status === "IN_PROGRESS" ? "bg-blue-500" : "bg-white/20"}`} />
                        <div>
                          <p className="text-sm font-semibold">{task.title}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-wider">{task.project.name}</p>
                        </div>
                      </div>
                      <div className="text-xs text-white/40">
                         {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
           </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           {/* Productivity Card */}
           <div className="glass-card p-8 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-500/20 space-y-6">
              <h3 className="font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Team Overview
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-end">
                    <span className="text-sm text-white/60">Task Completion Rate</span>
                    <span className="text-2xl font-bold">{Math.round((completedTasksCount / (myTasksCount || 1)) * 100)}%</span>
                 </div>
                 <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500" style={{ width: `${(completedTasksCount / (myTasksCount || 1)) * 100}%` }} />
                 </div>
                 <p className="text-xs text-white/40 leading-relaxed">
                   You have completed {completedTasksCount} out of {myTasksCount} tasks assigned to you across all projects.
                 </p>
              </div>
              <button className="w-full py-3 bg-white text-black rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform">
                Generate Report
              </button>
           </div>

           {/* Quick Tips */}
           <div className="glass-card p-8 space-y-6">
              <h3 className="font-bold text-sm uppercase tracking-widest text-white/40">Quick Tips</h3>
              <div className="space-y-4">
                 {[
                   "Use the 'New Task' button to quickly assign work.",
                   "Overdue tasks are highlighted in red on your list.",
                   "Click on a project card to manage its members."
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <p className="text-sm text-white/60">{tip}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
