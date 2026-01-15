
import React from 'react';
import { Transaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const isCredit = transaction.type === 'credit';

  return (
    <div className="px-4 py-4 md:px-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group gap-3">
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <div className={`p-2.5 md:p-3 rounded-full flex-shrink-0 ${isCredit ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'} group-hover:scale-110 transition-transform`}>
          {isCredit ? <ArrowUpRight size={18} className="md:w-5 md:h-5" /> : <ArrowDownLeft size={18} className="md:w-5 md:h-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-gray-900 leading-tight mb-1 truncate text-sm md:text-base">{transaction.description}</h4>
          <div className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs text-gray-500">
            <span className="flex items-center gap-1 font-medium whitespace-nowrap">
              <Calendar size={10} className="md:w-3 md:h-3" />
              {formatDate(transaction.date)}
            </span>
            <span className="bg-gray-100 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider whitespace-nowrap">{transaction.status}</span>
          </div>
        </div>
      </div>
      <div className={`font-bold text-base md:text-lg whitespace-nowrap flex-shrink-0 text-right ${isCredit ? 'text-emerald-600' : 'text-gray-900'}`}>
        {isCredit ? '+' : ''}{formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
