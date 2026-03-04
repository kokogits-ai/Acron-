
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
  lastName: string;
  email: string;
  age: number;
  currency: string;
  country: string;
  balance: number;
  // US specific
  state?: string;
  city?: string;
  zipCode?: string;
  phone?: string;
  accountType?: string;
  routingNumber?: string;
  address?: string;
}

export type TransferType = 'ACH' | 'Wire' | 'Internal';

export interface TransferDetails {
  transferType: TransferType;
  recipientName: string;
  bankName: string;
  amount: number;
  description: string;
  date: string;
  reference: string;
  accountNumber: string;
  routingNumber?: string;
}

export type AppView = 'login' | 'dashboard' | 'transfer' | 'history' | 'receipt' | 'profile';
