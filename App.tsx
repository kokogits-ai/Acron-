
import React, { useState, useEffect } from 'react';
import { AppView, TransferDetails, Transaction } from './types';
import { USER_CREDENTIALS, USER_PASSWORD, STATIC_USER, STATIC_TRANSACTIONS } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TransferForm from './components/TransferForm';
import TransactionHistoryView from './components/TransactionHistoryView';
import Receipt from './components/Receipt';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('acron_auth') === 'true';
  });
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [lastTransfer, setLastTransfer] = useState<TransferDetails | null>(null);
  
  // Transaction state with persistence
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('acron_transactions');
    return saved ? JSON.parse(saved) : STATIC_TRANSACTIONS;
  });

  // Sync transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('acron_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentView('login');
    }
  }, [isLoggedIn]);

  const handleLogin = (accountNumber: string, password?: string) => {
    if (accountNumber === USER_CREDENTIALS && password === USER_PASSWORD) {
      setIsLoggedIn(true);
      localStorage.setItem('acron_auth', 'true');
      setCurrentView('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('acron_auth');
    setCurrentView('login');
  };

  const handleTransferComplete = (details: TransferDetails) => {
    setLastTransfer(details);
    
    // Create new transaction object to add to history
    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      description: `Transfer to ${details.recipientName}`,
      amount: -Math.abs(details.amount),
      type: 'debit',
      status: 'Pending' // Matches the "Pending Authorization" state from previous requirement
    };

    // Prepend to transaction list
    setTransactions(prev => [newTransaction, ...prev]);
    setCurrentView('receipt');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard 
          user={STATIC_USER} 
          transactions={transactions}
          onAction={(view) => setCurrentView(view as AppView)} 
        />;
      case 'transfer':
        return <TransferForm 
          onComplete={handleTransferComplete} 
          onCancel={() => setCurrentView('dashboard')} 
        />;
      case 'history':
        return <TransactionHistoryView transactions={transactions} />;
      case 'receipt':
        return lastTransfer ? (
          <Receipt 
            details={lastTransfer} 
            onClose={() => setCurrentView('dashboard')} 
          />
        ) : <Dashboard user={STATIC_USER} transactions={transactions} onAction={(v) => setCurrentView(v as AppView)} />;
      case 'profile':
        return <ProfileView user={STATIC_USER} />;
      default:
        return <Dashboard user={STATIC_USER} transactions={transactions} onAction={(v) => setCurrentView(v as AppView)} />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
      <div className="no-print">
        <Sidebar currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <div className="no-print">
          <Header user={STATIC_USER} currentView={currentView} setView={setCurrentView} onLogout={handleLogout} />
        </div>
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
