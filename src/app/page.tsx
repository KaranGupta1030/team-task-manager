import Link from "next/link";
import { 
  CheckSquare, 
  ArrowRight, 
  Shield, 
  Zap, 
  Users, 
  LayoutDashboard,
  Target,
  Rocket,
  MousePointerClick
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      {/* Nav */}
      <nav className="h-24 flex items-center justify-between px-10 max-w-7xl mx-auto relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <CheckSquare className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Syncro</h1>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Sign In</Link>
          <Link href="/signup" className="px-6 py-3 bg-white text-black rounded-xl font-bold hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 px-10 max-w-7xl mx-auto text-center space-y-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 blur-[120px] -z-10 rounded-full" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in">
          <Zap className="w-4 h-4" />
          New: AI-Powered Task Prioritization
        </div>
        
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Manage projects with <br />
          <span className="gradient-text">unmatched precision.</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-white/40 text-xl animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
          The all-in-one workspace for modern teams. Assign tasks, track progress, 
          and reach your goals faster than ever with Syncro.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link href="/signup" className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2">
            Start for free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
            Live Demo
          </Link>
        </div>

        {/* Dashboard Preview */}
        <div className="pt-20 animate-fade-in relative group" style={{ animationDelay: '0.4s' }}>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="gradient-border p-[1px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] relative">
            <div className="bg-[#0a0a0c] aspect-[16/9] md:aspect-[21/9] rounded-[23px] flex items-center justify-center border border-white/5 overflow-hidden">
               <div className="relative w-full h-full p-8 md:p-12 flex flex-col gap-8 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
                  {/* Mock Dashboard Layout */}
                  <div className="h-8 w-1/3 bg-white/10 rounded-full" />
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/5" />)}
                  </div>
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    <div className="col-span-2 bg-white/5 rounded-3xl border border-white/5" />
                    <div className="bg-white/5 rounded-3xl border border-white/5" />
                  </div>
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-[2px] group-hover:bg-transparent group-hover:backdrop-blur-0 transition-all duration-700">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                    <LayoutDashboardIcon className="w-10 h-10 text-white/50" />
                  </div>
                  <p className="text-white/40 font-bold tracking-[0.2em] text-xs uppercase">Interactive Experience</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 px-10 max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built for elite performance.</h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">Everything you need to manage complex projects without the overhead.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Real-time Stats", 
              desc: "Instant insights into your team's progress and potential bottlenecks.",
              icon: Zap,
              color: "text-yellow-400"
            },
            { 
              title: "Role-based Access", 
              desc: "Granular control over who can view, edit, or manage project resources.",
              icon: Shield,
              color: "text-blue-400"
            },
            { 
              title: "Team Collaboration", 
              desc: "Invite members by email and assign tasks with one simple click.",
              icon: Users,
              color: "text-purple-400"
            }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-10 space-y-6 hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="py-32 px-10 max-w-7xl mx-auto">
        <div className="glass-card p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Seamless workflow. <br /><span className="text-white/40">From idea to delivery.</span></h2>
              
              <div className="space-y-6">
                {[
                  { step: "01", title: "Create Project", desc: "Define your goal and invite your dream team.", icon: Rocket },
                  { step: "02", title: "Assign Tasks", desc: "Break it down and set deadlines for accountability.", icon: MousePointerClick },
                  { step: "03", title: "Ship Faster", desc: "Track progress in real-time and celebrate wins.", icon: Target },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="text-blue-500 font-mono font-bold text-lg pt-1">{item.step}</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg flex items-center gap-2">
                        {item.title}
                        <item.icon className="w-4 h-4 text-white/20" />
                      </h4>
                      <p className="text-white/40">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl aspect-square border border-white/10 flex items-center justify-center p-12">
                 <div className="w-full h-full bg-white/5 rounded-2xl border border-white/5 shadow-2xl overflow-hidden flex flex-col p-6 gap-6">
                    <div className="h-6 w-1/2 bg-white/10 rounded-full" />
                    <div className="flex-1 space-y-4">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-16 bg-white/5 rounded-xl border border-white/5 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-10 text-center space-y-10">
        <h2 className="text-5xl md:text-6xl font-bold">Ready to sync your team?</h2>
        <p className="text-white/40 text-xl max-w-xl mx-auto">Join thousands of teams who trust Syncro for their most ambitious projects.</p>
        <div className="pt-6">
          <Link href="/signup" className="px-12 py-6 bg-white text-black rounded-2xl font-bold text-xl hover:scale-105 transition-transform inline-block shadow-2xl">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-10 border-t border-white/5 text-center text-white/20 text-sm font-medium">
        <div className="flex items-center justify-center gap-2 mb-6">
          <CheckSquare className="w-5 h-5" />
          <span className="text-white/40 font-bold uppercase tracking-widest">Syncro</span>
        </div>
        <p>© 2026 Syncro | Premium Team Task Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

function LayoutDashboardIcon(props: any) {
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
