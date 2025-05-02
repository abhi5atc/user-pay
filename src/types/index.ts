export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  address: string;
  seatNo: string;
  joiningDate: string;
}

export type PaymentMode = 'Cash' | 'Card' | 'UPI' | 'Bank Transfer' | 'Other';

export interface Payment {
  id: string;
  userId: string;
  paymentDate: string;
  paymentMode: PaymentMode;
  amount: number;
  paidForMonth: string; // Format: YYYY-MM
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