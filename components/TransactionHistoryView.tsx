
import React, { useState } from 'react';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';
import { Filter, Search, Download } from 'lucide-react';

interface TransactionHistoryViewProps {
  transactions: Transaction[];
}

const TransactionHistoryView: React.FC<TransactionHistoryViewProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = transactions.filter(tx => 
    tx.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <p className="text-gray-500">Manage and track your account movements</p>
        </div>
        <button className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
          <Download size={18} />
          Export Statements
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              placeholder="Search by description..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl text-gray-600 font-semibold hover:bg-slate-100 transition-colors w-full md:w-auto justify-center">
            <Filter size={18} />
            Filters
          </button>
        </div>

        <div className="hidden md:grid grid-cols-12 px-6 py-3 bg-slate-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
          <div className="col-span-1">Status</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-6">Description</div>
          <div className="col-span-3 text-right">Amount</div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length > 0 ? (
            filtered.map((tx) => (
              <TransactionItem key={tx.id} transaction={tx} />
            ))
          ) : (
            <div className="p-20 text-center text-gray-400">
              No transactions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryView;
