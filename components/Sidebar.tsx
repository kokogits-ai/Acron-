
import React from 'react';
import { AppView } from '../types';
import { 
  Landmark, 
  LayoutDashboard, 
  Send, 
  History, 
  User, 
  Settings, 
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  const menuItems = [
    { label: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { label: 'Money Transfer', id: 'transfer', icon: Send },
    { label: 'Transactions', id: 'history', icon: History },
    { label: 'My Profile', id: 'profile', icon: User },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white h-screen border-r border-gray-100 sticky top-0 overflow-y-auto">
      <div className="p-8">
        <div className="flex items-center gap-3 text-blue-600 mb-12">
          <Landmark size={32} />
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Acron</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                currentView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'text-gray-500 hover:bg-slate-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-4">
        <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Portal</span>
          </div>
          <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
            Acron Private Banking uses industry-grade encryption for all communications.
          </p>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-semibold"
        >
          <LogOut size={20} />
          Logout System
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
