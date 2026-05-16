import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, Clock, Circle, Filter } from "lucide-react";

export default async function MyTasksPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const tasks = await prisma.task.findMany({
    where: { assigneeId: userId },
    include: { project: true },
    orderBy: { dueDate: "asc" }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Tasks</h1>
          <p className="text-white/40">Keep track of your personal assignments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium transition-all border border-white/5">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Task</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Project</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Due Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <p className="text-white font-semibold group-hover:text-blue-400 transition-colors">{task.title}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white/40 text-sm">{task.project.name}</span>
                </td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  <span className="text-white/40 text-sm">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                  </span>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-white/20">
                  You have no tasks assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
