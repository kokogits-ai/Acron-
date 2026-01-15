
export type TransactionType = 'credit' | 'debit';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}

export interface UserProfile {
  accountNumber: string;
  firstName: string;
  surname: string;
  email: string;
  age: number;
  currency: string;
  country: string;
  balance: number;
}

export type TransferType = 'EU' | 'US';

export interface TransferDetails {
  transferType: TransferType;
  recipientName: string;
  bankName: string;
  amount: number;
  description: string;
  date: string;
  reference: string;
  // EU specific
  recipientIban?: string;
  bicSwift?: string;
  // US specific
  accountNumber?: string;
  routingNumber?: string;
}

export type AppView = 'login' | 'dashboard' | 'transfer' | 'history' | 'receipt' | 'profile';
