import React from "react";

export default function HomePage() {
  const services = [
    {
      name: "AI Orchestrator",
      status: "Operational",
      desc: "Google Gemini v1.5 API routing & pipeline reasoning",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-300"
    },
    {
      name: "Execution Engine",
      status: "Operational",
      desc: "Scanpy & AnnData multi-core processing containers",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300"
    },
    {
      name: "Literature Parser",
      status: "Operational",
      desc: "PubMed / BioPython data retrieval crawler",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
    },
    {
      name: "Visualization Engine",
      status: "Operational",
      desc: "Single-cell WebGL spatial clustering viewer",
      color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-300"
    }
  ];

  return (
    <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20 text-white">
            Φ
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              OpenBioFlow AI
            </h1>
            <p className="text-xs text-slate-500">v1.0.0-scaffold</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-slate-400 font-medium">Systems Ready</span>
        </div>
      </header>

      {/* Hero content */}
      <main className="my-auto py-12 max-w-4xl z-10">
        <span className="px-3 py-1 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full border border-indigo-500/20 inline-block mb-6">
          Cloud Native & Distributed
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          AI-Powered Orchestration <br />
          for <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">Bioinformatics</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl leading-relaxed">
          OpenBioFlow AI translates natural language prompts into executable analysis graphs. 
          Upload AnnData profiles, search academic databases, and run clustering pipelines seamlessly.
        </p>

        {/* Systems grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          {services.map((svc) => (
            <div 
              key={svc.name}
              className={`p-5 rounded-2xl bg-gradient-to-br ${svc.color} border backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:border-slate-700`}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-white">{svc.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-950/40 font-mono">
                  {svc.status}
                </span>
              </div>
              <p className="text-sm text-slate-400">{svc.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row justify-between text-xs text-slate-500 z-10">
        <p>&copy; 2026 OpenBioFlow AI Project. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Enterprise Grade Monorepo Scaffolding</p>
      </footer>
    </div>
  );
}
