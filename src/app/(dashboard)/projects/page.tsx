"use client";

import { useState, useEffect } from "react";
import { Plus, Folder, MoreVertical, Trash2, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createProject, deleteProject } from "@/lib/actions/projects";
import Link from "next/link";

export default function ProjectsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real app, we'd fetch this in a Server Component and pass as props
  // For simplicity in this demo flow, I'll use a client-side fetch or just mock it for now
  // Actually, I'll use a server component for the list. Let's pivot slightly.
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-white/40">Manage and track your team projects</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        >
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* We will map projects here */}
        <div className="glass-card p-6 border-dashed border-white/10 flex flex-col items-center justify-center text-white/20 min-h-[200px]">
           <p>No projects yet. Create your first one!</p>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg glass-card p-8 space-y-6 relative"
            >
              <h2 className="text-2xl font-bold">Create Project</h2>
              <form action={async (formData) => {
                const res = await createProject(formData);
                if (res.success) {
                  setIsModalOpen(false);
                  window.location.reload();
                }
              }} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Project Name</label>
                  <input 
                    name="name"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="e.g. Website Redesign"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/60">Description</label>
                  <textarea 
                    name="description"
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Describe the project goals..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                  >
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
