
import React from 'react';
import { TransferDetails } from '../types';
import { STATIC_USER } from '../constants';
import { formatCurrency, formatDate } from '../utils';
import { CheckCircle, Printer, Share2, Landmark, X, Globe, Flag } from 'lucide-react';

interface ReceiptProps {
  details: TransferDetails;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ details, onClose }) => {
  return (
    <div className="max-w-2xl mx-auto py-4 md:py-8 px-4">
      <div className="no-print mb-6 flex items-center justify-between">
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white rounded-full transition-colors text-gray-500 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        <div className="flex gap-2">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <Printer size={18} />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button className="flex items-center gap-2 bg-blue-600 px-3 md:px-4 py-2 rounded-xl text-sm font-semibold text-white hover:bg-blue-700 shadow-sm">
            <Share2 size={18} />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-2xl rounded-[1.5rem] md:rounded-[2rem] overflow-hidden animate-in zoom-in duration-500 origin-top">
        {/* Success Header */}
        <div className="bg-emerald-500 text-white p-6 md:p-10 text-center no-print relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center">
             {details.transferType === 'EU' ? <Globe size={200} /> : <Flag size={200} />}
          </div>
          <div className="relative z-10">
            <div className="bg-white/20 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/50">
              <CheckCircle size={32} className="md:w-10 md:h-10" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Transfer Successful</h2>
            <p className="text-emerald-50 text-xs md:text-sm mt-1">Ref: {details.reference}</p>
          </div>
        </div>

        {/* Branding (Visible in print) */}
        <div className="hidden print:flex items-center justify-between px-10 py-8 border-b border-gray-100">
           <div className="flex items-center gap-3">
             <Landmark size={32} className="text-blue-600" />
             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Acron Bank</h1>
           </div>
           <div className="text-right">
             <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Official Transaction Receipt</p>
             <p className="text-sm font-semibold text-gray-900">{formatDate(details.date)}</p>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 space-y-6 md:space-y-8">
          <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-6 md:pb-8">
            <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Total Amount</p>
            <div className="text-3xl md:text-5xl font-bold text-gray-900">
              {formatCurrency(details.amount)}
            </div>
            <div className="mt-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Completed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Sender Details</p>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-bold text-gray-900">{STATIC_USER.firstName} {STATIC_USER.surname}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">From Account</p>
                <p className="font-mono text-xs md:text-sm font-semibold text-gray-700">{STATIC_USER.accountNumber}</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2">Recipient Details</p>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-bold text-gray-900">{details.recipientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Bank Name</p>
                <p className="font-bold text-gray-900">{details.bankName}</p>
              </div>
              {details.transferType === 'EU' ? (
                <>
                  <div>
                    <p className="text-xs text-gray-500">IBAN</p>
                    <p className="font-mono text-xs md:text-sm font-semibold text-gray-700">{details.recipientIban}</p>
                  </div>
                  {details.bicSwift && (
                    <div>
                      <p className="text-xs text-gray-500">BIC / SWIFT</p>
                      <p className="font-mono text-xs md:text-sm font-semibold text-gray-700">{details.bicSwift}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <p className="text-xs text-gray-500">Account Number</p>
                    <p className="font-mono text-xs md:text-sm font-semibold text-gray-700">{details.accountNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Routing Number</p>
                    <p className="font-mono text-xs md:text-sm font-semibold text-gray-700">{details.routingNumber}</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="pt-6 md:pt-8 border-t border-gray-100 space-y-3 md:space-y-4">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-500">Description</span>
              <span className="font-semibold text-gray-900">{details.description}</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-500">Transfer Type</span>
              <span className="font-bold text-blue-600">{details.transferType === 'EU' ? 'International / SEPA' : 'US Domestic (ACH)'}</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-500">Transaction Date</span>
              <span className="font-semibold text-gray-900">{formatDate(details.date)}</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-500">Reference Number</span>
              <span className="font-mono font-bold text-gray-900">{details.reference}</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
             <div className="inline-block p-4 border border-dashed border-gray-200 rounded-xl mb-4">
                <Landmark size={24} className="text-gray-300 mx-auto" />
             </div>
             <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">
               Secured by Acron Bank Finland
             </p>
             <p className="text-[8px] md:text-[10px] text-gray-300 mt-1 italic">
               This document serves as an official confirmation of transfer. Member of European Deposit Guarantee Scheme.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
