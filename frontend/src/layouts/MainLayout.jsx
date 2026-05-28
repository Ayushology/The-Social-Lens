import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans relative overflow-hidden">
      {/* Authentic Aurora Glassmorphism Background */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-cyan-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-fuchsia-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col">
        <header className="mb-14 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(251,191,36,0.15)] border border-amber-500/20 glass-panel">
              <img src="/logo.png" alt="The Social Lens Logo" className="w-full h-full object-cover scale-105" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-400">
              The Social Lens
            </h1>
          </div>
        </header>

        <main className="flex-1 w-full flex flex-col justify-center">
          {children}
        </main>

        <footer className="mt-16 py-8 border-t border-zinc-800/30 text-center text-sm text-zinc-500">
          <p>© 2026 Created By Ayush Kumar</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
