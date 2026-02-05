
import { Transaction, UserProfile } from './types';

export const USER_CREDENTIALS = "US98-1234-5678-9012";
export const USER_PASSWORD = "Jason1972";

export const STATIC_USER: UserProfile = {
  accountNumber: "US98-1234-5678-9012",
  firstName: "Jason",
  surname: "Owens",
  email: "drjasonowens997@gmail.com",
  age: 53,
  currency: "USD",
  country: "USA",
  balance: 700000.00
};

export const STATIC_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "2025-02-10", description: "Medical Consulting Fee - Jersey Shore Medical", amount: 15200.00, type: "credit", status: "Completed" },
  { id: 2, date: "2025-02-08", description: "Whole Foods Market - Wall Township", amount: -432.50, type: "debit", status: "Completed" },
  { id: 3, date: "2025-02-01", description: "Monthly Dividend - Vanguard S&P 500", amount: 2850.75, type: "credit", status: "Completed" },
  { id: 4, date: "2025-01-25", description: "Apple Store - Short Hills Mall", amount: -3499.00, type: "debit", status: "Completed" },
  { id: 5, date: "2025-01-20", description: "Quarterly Property Tax - Monmouth County", amount: -8400.00, type: "debit", status: "Completed" },
  { id: 6, date: "2025-01-15", description: "Delta Airlines - JFK to London", amount: -4200.00, type: "debit", status: "Completed" },
  { id: 7, date: "2025-01-10", description: "Stripe Payout - Telemedicine Services", amount: 8900.00, type: "credit", status: "Completed" },
  { id: 8, date: "2024-12-28", description: "Ritz-Carlton Residences - Maintenance", amount: -1500.00, type: "debit", status: "Completed" },
  { id: 9, date: "2024-12-15", description: "Annual Performance Bonus", amount: 45000.00, type: "credit", status: "Completed" },
  { id: 10, date: "2024-12-05", description: "Tesla Supercharging - Edison, NJ", amount: -32.40, type: "debit", status: "Completed" }
];

export const EU_BANKS = [
  "Deutsche Bank",
  "HSBC",
  "BNP Paribas",
  "Société Générale",
  "Santander",
  "UBS"
];

export const US_BANKS = [
  "JPMorgan Chase",
  "Bank of America",
  "Wells Fargo",
  "Citibank",
  "Goldman Sachs",
  "Morgan Stanley",
  "TD Bank"
];
