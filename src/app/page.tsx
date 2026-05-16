import Link from "next/link";
import { CheckSquare, ArrowRight, Shield, Zap, Users } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30">
      {/* Nav */}
      <nav className="h-24 flex items-center justify-between px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Syncro</h1>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Sign In</Link>
          <Link href="/signup" className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 pb-32 px-10 max-w-7xl mx-auto text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in">
          <Zap className="w-4 h-4" />
          New: Team Collaboration Features
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Manage projects with <br />
          <span className="gradient-text">unmatched precision.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-white/40 text-xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          The all-in-one workspace for modern teams. Assign tasks, track progress, 
          and reach your goals faster than ever.
        </p>

        <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/signup" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2">
            Start for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
            Live Demo
          </Link>
        </div>

        {/* Mockup */}
        <div className="pt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="gradient-border p-[1px] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="bg-[#0a0a0c] aspect-video rounded-[23px] flex items-center justify-center border border-white/5">
               <div className="flex flex-col items-center gap-4">
                 <div className="w-16 h-16 rounded-full bg-white/5 animate-pulse flex items-center justify-center">
                    <LayoutDashboard className="w-8 h-8 text-white/20" />
                 </div>
                 <p className="text-white/20 font-medium tracking-widest text-sm uppercase">Interactive Dashboard Preview</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LayoutDashboard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}
