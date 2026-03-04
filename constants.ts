
import { Transaction, UserProfile } from './types';

export const USER_CREDENTIALS = "1482345679";
export const USER_PASSWORD = "monbiot9000";

export const STATIC_USER: UserProfile = {
  accountNumber: "1482345679",
  routingNumber: "021000021",
  firstName: "Owens",
  lastName: "Max",
  email: "monbiot9000@gmail.com",
  age: 52,
  currency: "USD",
  country: "USA",
  balance: 50000.00,
  state: "NJ",
  city: "Jersey City",
  zipCode: "07001",
  phone: "(201) 555-0198",
  accountType: "Checking",
  address: "Somewhere in New Jersey, USA"
};

export const STATIC_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "2025-02-12", description: "Direct Deposit - Tech Corp", amount: 8500.00, type: "credit", status: "Completed" },
  { id: 2, date: "2025-02-10", description: "Whole Foods Market - Jersey City", amount: -185.40, type: "debit", status: "Completed" },
  { id: 3, date: "2025-02-05", description: "Apple Store - Online Purchase", amount: -1299.00, type: "debit", status: "Completed" },
  { id: 4, date: "2025-01-28", description: "Zillow Group - Monthly Rent", amount: -3200.00, type: "debit", status: "Completed" },
  { id: 5, date: "2025-01-20", description: "Venmo Transfer - Dinner Split", amount: 45.00, type: "credit", status: "Completed" },
  { id: 6, date: "2025-01-12", description: "Starbucks - Journal Square", amount: -6.50, type: "debit", status: "Completed" },
  { id: 7, date: "2025-01-05", description: "IRS Tax Refund", amount: 2450.00, type: "credit", status: "Completed" },
  { id: 8, date: "2024-12-28", description: "Delta Air Lines - Flight to LAX", amount: -450.00, type: "debit", status: "Completed" },
  { id: 9, date: "2024-12-15", description: "Vanguard Dividend Reinvestment", amount: 1200.00, type: "credit", status: "Completed" },
  { id: 10, date: "2024-12-01", description: "Netflix Subscription", amount: -19.99, type: "debit", status: "Completed" }
];

export const US_BANKS = [
  "JPMorgan Chase Bank, N.A. (Chase)",
  "Bank of America, N.A.",
  "Wells Fargo Bank, N.A.",
  "Citibank, N.A.",
  "U.S. Bank, N.A.",
  "PNC Bank, N.A.",
  "Truist Bank",
  "Capital One, N.A.",
  "TD Bank, N.A.",
  "BMO Bank N.A.",
  "Citizens Bank, N.A.",
  "Fifth Third Bank, N.A.",
  "Regions Bank",
  "Huntington National Bank",
  "KeyBank National Association",
  "M&T Bank",
  "Santander Bank, N.A.",
  "Ally Bank",
  "Discover Bank",
  "American Express National Bank",
  "Charles Schwab Bank, SSB",
  "Navy Federal Credit Union",
  "USAA Federal Savings Bank",
  "First Citizens Bank",
  "Silicon Valley Bank",
  "Comerica Bank",
  "Zions Bancorporation / Zions Bank",
  "Synovus Bank",
  "HSBC Bank USA, N.A.",
  "Barclays Bank Delaware"
];
