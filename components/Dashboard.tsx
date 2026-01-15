
import React from 'react';
import { UserProfile } from '../types';
import { formatCurrency } from '../utils';
import { 
  Send, 
  History, 
  User, 
  ExternalLink, 
  TrendingUp, 
  Shield, 
  Landmark,
  CreditCard
} from 'lucide-react';
import { STATIC_TRANSACTIONS } from '../constants';
import TransactionItem from './TransactionItem';

interface DashboardProps {
  user: UserProfile;
  onAction: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onAction }) => {
  const recentTransactions = STATIC_TRANSACTIONS.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Account Overview Card */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <Landmark size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-blue-100 text-sm font-medium uppercase tracking-widest mb-1">Savings Account</p>
              <h2 className="text-2xl md:text-3xl font-bold">{user.firstName} {user.surname}</h2>
              <div className="flex items-center gap-2 mt-1 text-blue-100 font-mono text-sm">
                <span>{user.accountNumber}</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{user.country}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3">
              <Shield size={20} className="text-blue-200" />
              <span className="text-sm font-semibold">Verified Private Client</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-blue-100 text-sm font-medium">Available Balance</p>
            <div className="text-4xl md:text-6xl font-bold tracking-tight">
              {formatCurrency(user.balance, user.currency)}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Transfer', icon: Send, view: 'transfer', color: 'bg-blue-100 text-blue-700' },
          { label: 'History', icon: History, view: 'history', color: 'bg-indigo-100 text-indigo-700' },
          { label: 'Cards', icon: CreditCard, view: 'profile', color: 'bg-emerald-100 text-emerald-700' },
          { label: 'Profile', icon: User, view: 'profile', color: 'bg-slate-100 text-slate-700' },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => onAction(item.view)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group"
          >
            <div className={`${item.color} p-4 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon size={24} />
            </div>
            <span className="font-semibold text-gray-700">{item.label}</span>
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions List */}
        <section className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              Recent Activity
            </h3>
            <button 
              onClick={() => onAction('history')}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View all <ExternalLink size={14} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentTransactions.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))}
          </div>
        </section>

        {/* Info Column */}
        <section className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Security Insights</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600 h-fit">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">2FA Active</p>
                  <p className="text-xs text-gray-500">Your account is secured with multi-factor authentication.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600 h-fit">
                  <Landmark size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Account Protected</p>
                  <p className="text-xs text-gray-500">Member of Finland's deposit guarantee scheme.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-6 rounded-3xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-2">Investment Portfolio</h3>
              <p className="text-xs text-indigo-100 mb-4 leading-relaxed">Schedule a call with your personal wealth advisor to review your real estate holdings.</p>
              <button className="w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition-colors">
                Contact Advisor
              </button>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 translate-x-4 translate-y-4">
              <TrendingUp size={80} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
