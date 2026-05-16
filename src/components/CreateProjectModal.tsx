"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createProject } from "@/lib/actions/projects";

export default function CreateProjectModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await createProject(formData);
    setLoading(false);
    if (res.success) {
      setIsModalOpen(false);
    } else {
      alert(res.error || "Failed to create project");
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95"
      >
        <Plus className="w-5 h-5" />
        New Project
      </button>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg glass-card p-10 space-y-8 relative border-white/20"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Create Project</h2>
                <p className="text-white/40">Start a new collaboration workspace.</p>
              </div>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 uppercase tracking-widest">Project Name</label>
                  <input 
                    name="name"
                    required
                    disabled={loading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                    placeholder="e.g. Website Redesign"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/60 uppercase tracking-widest">Description</label>
                  <textarea 
                    name="description"
                    rows={4}
                    disabled={loading}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                    placeholder="What are the goals for this project?"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] text-white rounded-2xl font-bold transition-all disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
