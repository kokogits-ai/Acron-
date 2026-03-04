
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ChevronRight, 
  Loader2, 
  Lock, 
  Building, 
  User, 
  CreditCard, 
  MessageSquare,
  ArrowRight,
  Globe,
  Flag,
  AlertCircle
} from 'lucide-react';
import { TransferDetails, TransferType } from '../types';
import { US_BANKS, STATIC_USER } from '../constants';
import { generateReference } from '../utils';

interface TransferFormProps {
  onComplete: (details: TransferDetails) => void;
  onCancel: () => void;
}

type Step = 'form' | 'processing' | 'pin';

const TransferForm: React.FC<TransferFormProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState<Step>('form');
  const [pin, setPin] = useState('');
  const [transferType, setTransferType] = useState<TransferType>('ACH');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    recipientName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: US_BANKS[0],
    amount: '',
    description: ''
  });

  const handleTypeChange = (type: TransferType) => {
    setTransferType(type);
    setError(null);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.accountNumber.length !== 10) {
      setError('Account number must be exactly 10 digits.');
      return;
    }
    if (formData.routingNumber.length !== 10) {
      setError('Routing number must be exactly 10 digits.');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (amount > STATIC_USER.balance) {
      setError('Insufficient funds. Amount exceeds your current balance.');
      return;
    }

    setError(null);
    setStep('processing');
    setTimeout(() => {
      setStep('pin');
    }, 2500);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 4) {
      setStep('processing');
      setTimeout(() => {
        onComplete({
          transferType,
          recipientName: formData.recipientName,
          bankName: formData.bankName,
          amount: parseFloat(formData.amount),
          description: formData.description,
          date: new Date().toISOString(),
          reference: generateReference(),
          accountNumber: formData.accountNumber,
          routingNumber: formData.routingNumber,
        });
      }, 2000);
    }
  };

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in duration-300 px-4 text-center">
        <Loader2 size={48} className="text-blue-600 animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-gray-900">Processing transaction...</h2>
        <p className="text-gray-500 mt-2">Connecting to Federal Reserve ACH/Wire gateway</p>
      </div>
    );
  }

  if (step === 'pin') {
    return (
      <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl text-center">
          <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Secure PIN Confirmation</h2>
          <p className="text-gray-500 mb-8">Please authorize this {transferType} transfer with your 4-digit code.</p>
          
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`w-4 h-4 rounded-full border-2 border-blue-600 ${pin.length > i ? 'bg-blue-600' : 'bg-transparent'}`} />
              ))}
            </div>
            <input
              autoFocus
              type="password"
              maxLength={4}
              className="sr-only"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            />
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '✓'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (num === 'C') setPin('');
                    else if (num === '✓') { if(pin.length === 4) handlePinSubmit({ preventDefault: () => {} } as any); }
                    else if (pin.length < 4) setPin(prev => prev + num);
                  }}
                  className="h-14 bg-slate-50 hover:bg-slate-100 rounded-xl text-xl font-bold text-gray-700 active:scale-95 transition-all"
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={pin.length < 4}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              Confirm Transfer
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500 px-4">
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Return to Dashboard
      </button>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
        <div className="bg-slate-50 p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">New Money Transfer</h2>
          <p className="text-sm text-gray-500">Choose destination and recipient details.</p>
        </div>

        <div className="p-8 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Transfer Method</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleTypeChange('ACH')}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                  transferType === 'ACH' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                <Globe size={20} />
                <span>ACH</span>
                <span className="text-[10px] font-normal opacity-70">1-3 business days</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('Wire')}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                  transferType === 'Wire' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                <Flag size={20} />
                <span>Wire</span>
                <span className="text-[10px] font-normal opacity-70">Same/Next day</span>
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('Internal')}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-2xl border-2 transition-all font-bold ${
                  transferType === 'Internal' 
                    ? 'border-blue-600 bg-blue-50 text-blue-700' 
                    : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                }`}
              >
                <Lock size={20} />
                <span>Internal</span>
                <span className="text-[10px] font-normal opacity-70">Instant</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleContinue} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User size={16} className="text-blue-500" />
                  Recipient Full Name
                </label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="e.g. John Doe"
                  value={formData.recipientName}
                  onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building size={16} className="text-blue-500" />
                  Target Institution
                </label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
                  value={formData.bankName}
                  onChange={e => setFormData({ ...formData, bankName: e.target.value })}
                >
                  {US_BANKS.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CreditCard size={16} className="text-blue-500" />
                  Account Number
                </label>
                <input
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                  placeholder="1234567890"
                  value={formData.accountNumber}
                  onChange={e => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, '').trim().slice(0, 10) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Routing Number (ABA)</label>
                <input
                  required
                  maxLength={10}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                  placeholder="0210000210"
                  value={formData.routingNumber}
                  onChange={e => setFormData({ ...formData, routingNumber: e.target.value.replace(/\D/g, '').trim().slice(0, 10) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0.01"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none text-xl font-bold"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-500" />
                  Message to Recipient
                </label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none"
                  placeholder="Payment reference"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              Continue to Authorization
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
