import React, { useState } from 'react';
import MediaUploadZone from '../components/upload/MediaUploadZone';
import CaptionDashboard from '../components/dashboard/CaptionDashboard';
import HistoryFeed from '../components/feed/HistoryFeed';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import * as Toast from '@radix-ui/react-toast';
import { AlertCircle, X, LogOut, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentCaptionData, setCurrentCaptionData] = useState(null);
  const [currentPreviewUrl, setCurrentPreviewUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const { user, logout } = useAuth();
  
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpload = async (file) => {
    setIsLoading(true);
    setCurrentCaptionData(null);
    setToastOpen(false);
    
    const objectUrl = URL.createObjectURL(file);
    setCurrentPreviewUrl(objectUrl);

    try {
      const formData = new FormData();
      formData.append('image', file); 
      
      const response = await apiClient.post('/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const captionResponse = response.data;
      setCurrentCaptionData(captionResponse);
      
      const historyItem = {
        id: Date.now().toString(),
        caption: captionResponse,
        timestamp: new Date().toISOString(),
        preview: objectUrl,
        type: file.type
      };
      setHistory(prev => [historyItem, ...prev]);

    } catch (error) {
      console.error("Upload error:", error);
      setToastMessage(error.response?.data?.message || error.message || 'Generation failed.');
      setToastOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item) => {
    setCurrentCaptionData(item.caption);
    setCurrentPreviewUrl(item.preview);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Toast.Provider swipeDirection="right">
      <div className="relative z-10 flex flex-col gap-10">
        
        {/* Header Bar */}
        <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded-2xl border border-white/5 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full overflow-hidden bg-zinc-800 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
               <img 
                 src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'user'}&backgroundColor=18181b`} 
                 alt="Avatar" 
                 className="w-full h-full object-cover" 
               />
             </div>
             <div>
               <p className="text-sm text-zinc-400">Welcome back,</p>
               <p className="text-zinc-100 font-medium tracking-wide">{user?.username}</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <Link 
              to="/profile"
              className="p-2.5 rounded-xl text-zinc-300 hover:text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-2 border border-transparent hover:border-amber-500/20"
            >
              <UserIcon size={18} />
              <span className="hidden sm:inline text-sm font-medium">Profile</span>
            </Link>
            <button 
              onClick={logout}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 border border-transparent hover:border-red-500/20"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MediaUploadZone onUpload={handleUpload} isLoading={isLoading} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CaptionDashboard captionData={currentCaptionData} previewUrl={currentPreviewUrl} />
          </motion.div>

          {history.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <h3 className="text-lg font-medium text-zinc-200 mb-4 px-2">History</h3>
              <HistoryFeed history={history} onSelect={handleSelectHistory} />
            </motion.div>
          )}
        </div>
      </div>

      <Toast.Root 
        className="bg-red-950/90 border border-red-900 text-red-200 p-4 rounded-xl shadow-lg flex items-start gap-3" 
        open={toastOpen} 
        onOpenChange={setToastOpen}
      >
        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div className="grid gap-1">
          <Toast.Title className="font-medium text-red-100">Error</Toast.Title>
          <Toast.Description className="text-sm opacity-90">
            {toastMessage}
          </Toast.Description>
        </div>
        <Toast.Close className="ml-auto p-1 rounded hover:bg-red-900/50 text-red-400 hover:text-red-200 transition-colors">
          <X size={16} />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 p-6 w-[390px] max-w-[100vw] m-0 z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default Dashboard;
