export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  seat_no: string;
  joining_date: string;
}

export type payment_mode = 'Cash' | 'Card' | 'UPI' | 'Bank Transfer' | 'Other';

export interface Payment {
  id: string;
  user_id: string;
  payment_date: string;
  payment_mode: payment_mode;
  amount: number;
  paid_for_month: string; // Format: YYYY-MM
  remarks: string;
}

export interface UserWithPaymentStatus extends User {
  hasPaidForCurrentMonth: boolean;
  hasPaidForPreviousMonth: boolean;
}

export interface MonthYear {
  month: number;
  year: number;
}