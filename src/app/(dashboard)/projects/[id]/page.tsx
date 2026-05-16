import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus, 
  User as UserIcon,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { Status, Priority } from "@prisma/client";
import { updateTaskStatus } from "@/lib/actions/tasks";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const session = await auth();
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        include: { assignee: true },
        orderBy: { createdAt: "desc" }
      },
      members: { include: { user: true } }
    }
  });

  if (!project) notFound();

  const columns = [
    { label: "To Do", status: Status.TODO, icon: Circle, color: "text-white/40" },
    { label: "In Progress", status: Status.IN_PROGRESS, icon: Clock, color: "text-blue-400" },
    { label: "Done", status: Status.DONE, icon: CheckCircle2, color: "text-emerald-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 text-white/40 mb-2">
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-white/60">{project.name}</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{project.name}</h1>
          <p className="text-white/40">{project.description}</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {project.members.map((member, i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] bg-white/5 flex items-center justify-center overflow-hidden" title={member.user.name || ""}>
                <UserIcon className="w-5 h-5 text-white/20" />
              </div>
            ))}
            <button className="w-10 h-10 rounded-full border-2 border-[#0a0a0c] bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => (
          <div key={col.status} className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <col.icon className={`w-5 h-5 ${col.color}`} />
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">{col.label}</h3>
                <span className="bg-white/5 px-2 py-0.5 rounded text-xs text-white/40">
                  {project.tasks.filter(t => t.status === col.status).length}
                </span>
              </div>
              <button className="text-white/20 hover:text-white transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 min-h-[500px]">
              {project.tasks
                .filter((t) => t.status === col.status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              {project.tasks.filter((t) => t.status === col.status).length === 0 && (
                <div className="h-24 rounded-2xl border border-dashed border-white/5 flex items-center justify-center text-white/10 text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: any }) {
  const priorityColors = {
    LOW: "bg-blue-400/10 text-blue-400",
    MEDIUM: "bg-amber-400/10 text-amber-400",
    HIGH: "bg-red-400/10 text-red-400",
  };

  return (
    <div className="glass-card p-5 space-y-4 group cursor-grab active:cursor-grabbing hover:border-white/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
          {task.priority}
        </span>
        <button className="text-white/20 group-hover:text-white transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-white leading-tight">{task.title}</h4>
        <p className="text-xs text-white/40 line-clamp-2">{task.description}</p>
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/20">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium">
            {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
          </span>
        </div>
        <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10">
          <UserIcon className="w-4 h-4 text-white/20" />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
