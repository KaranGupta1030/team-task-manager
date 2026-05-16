import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Folder, Trash2, Calendar, Users, ArrowRight, Settings2 } from "lucide-react";
import Link from "next/link";
import { deleteProject } from "@/lib/actions/projects";

export default async function ProjectList() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return null;

  const projects = await prisma.project.findMany({
    where: { members: { some: { userId } } },
    include: { 
      members: true,
      _count: { select: { tasks: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  if (projects.length === 0) {
    return (
      <div className="col-span-full glass-card p-20 flex flex-col items-center justify-center text-white/20 min-h-[400px] space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
          <Folder className="w-10 h-10 opacity-20" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-white/40">No projects found</p>
          <p className="text-sm">Create your first project to start collaborating.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <div key={project.id} className="glass-card p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-500 relative overflow-hidden">
          {/* Accent blur */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />
          
          <div className="space-y-6 relative">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Folder className="w-7 h-7 text-blue-400" />
              </div>
              
              {/* Management Actions */}
              <div className="flex items-center gap-2">
                {project.ownerId === userId && (
                   <form action={async () => {
                     "use server";
                     await deleteProject(project.id);
                   }}>
                     <button 
                       title="Delete Project"
                       className="p-2.5 bg-red-500/5 hover:bg-red-500/20 rounded-xl text-red-400/40 hover:text-red-400 transition-all border border-white/5"
                     >
                       <Trash2 className="w-4.5 h-4.5" />
                     </button>
                   </form>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </h3>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2">{project.description || "Building the future, one task at a time."}</p>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 flex items-center justify-between relative">
            <div className="flex items-center gap-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500/40" />
                {project._count.tasks} Tasks
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500/40" />
                {project.members.length} Members
              </div>
            </div>
            
            <div className="flex -space-x-2">
               {project.members.slice(0, 3).map((member, i) => (
                 <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-[#0a0a0c] shadow-lg" />
               ))}
               {project.members.length > 3 && (
                 <div className="w-8 h-8 rounded-full bg-white/5 border-2 border-[#0a0a0c] flex items-center justify-center text-[10px] font-bold text-white/40">
                   +{project.members.length - 3}
                 </div>
               )}
            </div>
          </div>
          
          {/* Hover indicator */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 w-0 group-hover:w-full transition-all duration-700" />
        </div>
      ))}
    </div>
  );
}
