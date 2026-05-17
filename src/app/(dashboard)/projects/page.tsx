import ProjectList from "@/components/ProjectList";
import CreateProjectModal from "@/components/CreateProjectModal";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ProjectsPage() {
  return (
<<<<<<< HEAD
    <div className="space-y-10">
=======
    <div className="space-y-10 animate-fade-in">
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-white/40 text-lg">Manage and track your team projects</p>
        </div>
        <CreateProjectModal />
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center py-20 text-white/20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin" />
          <p className="font-medium">Loading your projects...</p>
        </div>
      }>
        <ProjectList />
      </Suspense>
    </div>
  );
}
