import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, Clock, Circle, Filter, Search, Calendar } from "lucide-react";
import CreateTaskModal from "@/components/CreateTaskModal";

export default async function MyTasksPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const [tasks, projects] = await Promise.all([
    prisma.task.findMany({
      where: { assigneeId: userId },
      include: { project: true },
      orderBy: { dueDate: "asc" }
    }),
    prisma.project.findMany({
      where: { members: { some: { userId } } }
    })
  ]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">My Tasks</h1>
          <p className="text-white/40 text-lg">Keep track of your personal assignments</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                placeholder="Search tasks..."
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all w-64"
              />
           </div>
           <CreateTaskModal projects={projects} />
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-5 text-xs font-bold text-white/40 uppercase tracking-widest">Task</th>
              <th className="px-6 py-5 text-xs font-bold text-white/40 uppercase tracking-widest">Project</th>
              <th className="px-6 py-5 text-xs font-bold text-white/40 uppercase tracking-widest">Priority</th>
              <th className="px-6 py-5 text-xs font-bold text-white/40 uppercase tracking-widest">Status</th>
              <th className="px-6 py-5 text-xs font-bold text-white/40 uppercase tracking-widest">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">{task.title}</p>
                    {task.description && <p className="text-xs text-white/20 line-clamp-1">{task.description}</p>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-1 rounded bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-wider border border-white/5">
                    {task.project.name}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className={`text-xs font-bold ${
                    task.priority === "HIGH" ? "text-red-400" : 
                    task.priority === "MEDIUM" ? "text-orange-400" : "text-blue-400"
                  }`}>
                    {task.priority}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    {task.status === "DONE" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : task.status === "IN_PROGRESS" ? (
                      <Clock className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-white/20" />
                    )}
                    <span className="text-sm text-white/60 capitalize">{task.status.replace("_", " ").toLowerCase()}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
                    <Calendar className="w-4 h-4 opacity-50" />
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                  </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-32 text-center">
                  <div className="flex flex-col items-center gap-4 opacity-20">
                    <Circle className="w-16 h-16" />
                    <p className="text-xl font-medium">You have no tasks assigned.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
