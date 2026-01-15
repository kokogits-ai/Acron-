
import { Transaction, UserProfile } from './types';

export const USER_CREDENTIALS = "FI74-9845-2210-6631";
export const USER_PASSWORD = "matti1974";

export const STATIC_USER: UserProfile = {
  accountNumber: "FI74-9845-2210-6631",
  firstName: "Matti",
  surname: "Kajupank",
  email: "kajupankmatti@gmail.com",
  age: 74,
  currency: "EUR",
  country: "Finland",
  balance: 7100000.00
};

export const STATIC_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "2025-01-18", description: "Rental Property Income – Helsinki Apartment", amount: 12500.00, type: "credit", status: "Completed" },
  { id: 2, date: "2025-01-12", description: "Bank Transfer to Jukka Lehtinen", amount: -8500.00, type: "debit", status: "Completed" },
  { id: 3, date: "2025-01-05", description: "Uber Ride – Helsinki City", amount: -42.60, type: "debit", status: "Completed" },
  { id: 4, date: "2024-12-22", description: "Rental Property Income – Espoo Residence", amount: 10400.00, type: "credit", status: "Completed" },
  { id: 5, date: "2024-12-10", description: "Transfer to Anna Korhonen", amount: -15000.00, type: "debit", status: "Completed" },
  { id: 6, date: "2024-11-28", description: "Rental Property Income – Turku Apartment", amount: 9800.00, type: "credit", status: "Completed" },
  { id: 7, date: "2024-11-14", description: "Uber Eats – Helsinki", amount: -36.20, type: "debit", status: "Completed" },
  { id: 8, date: "2024-10-30", description: "Rental Property Income – Helsinki Apartment", amount: 12000.00, type: "credit", status: "Completed" },
  { id: 9, date: "2024-10-18", description: "International Transfer to Lars Nyström", amount: -22000.00, type: "debit", status: "Completed" },
  { id: 10, date: "2024-09-25", description: "Rental Property Income – Espoo Residence", amount: 10150.00, type: "credit", status: "Completed" },
  { id: 11, date: "2024-09-02", description: "Uber Ride – Airport Transfer", amount: -58.90, type: "debit", status: "Completed" },
  { id: 12, date: "2024-08-20", description: "Rental Property Income – Turku Apartment", amount: 11000.00, type: "credit", status: "Completed" },
  { id: 13, date: "2024-07-15", description: "Transfer to Mika Salonen", amount: -17500.00, type: "debit", status: "Completed" },
  { id: 14, date: "2024-06-28", description: "Rental Property Income – Helsinki Apartment", amount: 10000.00, type: "credit", status: "Completed" },
  { id: 15, date: "2024-05-10", description: "Uber Ride – Helsinki", amount: -31.75, type: "debit", status: "Completed" }
];

export const EU_BANKS = [
  "Nordea Bank",
  "Danske Bank",
  "SEB",
  "OP Financial Group",
  "Deutsche Bank",
  "Barclays",
  "BNP Paribas"
];

export const US_BANKS = [
  "JPMorgan Chase",
  "Bank of America",
  "Wells Fargo",
  "Citibank",
  "US Bank",
  "Capital One"
];
