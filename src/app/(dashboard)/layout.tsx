<<<<<<< HEAD
"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
=======
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
<<<<<<< HEAD
  const pathname = usePathname();

=======
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
  return (
    <div className="flex min-h-screen bg-[#0a0a0c]">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Navbar />
<<<<<<< HEAD
        <main className="p-8 flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
=======
        <main className="p-8 animate-fade-in flex-1">
          {children}
>>>>>>> 5827ca977c88515c1711e93e365eef6dec42c48a
        </main>
      </div>
    </div>
  );
}
