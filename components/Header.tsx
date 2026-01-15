
import React, { useState } from 'react';
import { UserProfile, AppView } from '../types';
import { Bell, Search, Menu, X, Landmark, LogOut, User as UserIcon } from 'lucide-react';

interface HeaderProps {
  user: UserProfile;
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, currentView, setView, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'Transfer', id: 'transfer' },
    { label: 'History', id: 'history' },
    { label: 'Profile', id: 'profile' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-2">
          <Landmark size={28} className="text-blue-600" />
          <span className="font-bold text-xl text-gray-900">Acron</span>
        </div>

        {/* View Title (Desktop) */}
        <div className="hidden lg:block">
          <h2 className="text-xl font-bold text-gray-900 capitalize">{currentView}</h2>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              className="bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 w-64 outline-none focus:ring-2 focus:ring-blue-600/20 text-sm transition-all" 
              placeholder="Search features..." 
            />
          </div>
          
          <button className="p-2.5 bg-slate-50 text-gray-500 hover:text-blue-600 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
          </button>

          <div className="h-10 w-px bg-gray-100 mx-2 hidden md:block"></div>

          <div 
            onClick={() => setView('profile')}
            className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-xl transition-colors group"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-900 leading-none">{user.firstName}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">Premier Account</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold group-hover:scale-105 transition-transform">
              {user.firstName[0]}
            </div>
          </div>

          <button 
            className="lg:hidden p-2.5 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl animate-in slide-in-from-right duration-500 p-8">
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <Landmark size={28} className="text-blue-600" />
                <span className="font-bold text-xl text-gray-900">Acron Bank</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400">
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id as AppView);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                    currentView === item.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-gray-700'
                  }`}
                >
                  {item.label}
                  <ChevronRight size={18} />
                </button>
              ))}
            </nav>

            <div className="absolute bottom-8 left-8 right-8">
               <button 
                 onClick={onLogout}
                 className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold"
               >
                 <LogOut size={20} />
                 Sign Out
               </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const ChevronRight = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Header;
