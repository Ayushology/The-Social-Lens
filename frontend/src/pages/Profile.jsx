import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, User as UserIcon, Settings, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto pt-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel p-8 md:p-12"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          <div className="shrink-0 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-zinc-800 border-4 border-amber-500/30 shadow-[0_0_30px_rgba(251,191,36,0.2)] relative z-10">
              <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'user'}&backgroundColor=18181b`} 
                 alt="Avatar" 
                 className="w-full h-full object-cover scale-110" 
              />
            </div>
            {/* Ambient glow behind avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-amber-500/20 rounded-full blur-3xl -z-10"></div>
          </div>

          <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-3xl font-bold text-zinc-100 mb-2 tracking-tight">
              {user?.username}
            </h1>
            <p className="text-amber-500 font-medium mb-6">Elite Member</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <UserIcon size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 font-medium">Username</p>
                  <p className="text-sm text-zinc-200">{user?.username}</p>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Award size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 font-medium">Status</p>
                  <p className="text-sm text-zinc-200">Pro Creator</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Shield size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 font-medium">Security</p>
                  <p className="text-sm text-zinc-200">Verified</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <Settings size={20} />
                </div>
                <div className="text-left">
                  <p className="text-xs text-zinc-500 font-medium">Preferences</p>
                  <p className="text-sm text-zinc-200">Manage Account</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
