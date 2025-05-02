import { Payment, User, UserWithPaymentStatus } from '../types';
import { getCurrentMonth, getPreviousMonth } from './dateUtils';

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const getUserPaymentStatus = (users: User[], payments: Payment[]): UserWithPaymentStatus[] => {
  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();
  
  return users.map(user => {
    const hasPaidForCurrentMonth = payments.some(
      payment => payment.user_id === user.id && payment.paid_for_month === currentMonth
    );
    
    const hasPaidForPreviousMonth = payments.some(
      payment => payment.user_id === user.id && payment.paid_for_month === previousMonth
    );
    
    return {
      ...user,
      hasPaidForCurrentMonth,
      hasPaidForPreviousMonth
    };
  });
};

export const filterUsers = (
  users: User[],
  searchTerm: string
): User[] => {
  if (!searchTerm) return users;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return users.filter(
    user =>
      user.name.toLowerCase().includes(lowerSearchTerm) ||
      user.email.toLowerCase().includes(lowerSearchTerm) ||
      user.mobile.includes(searchTerm)
  );
};

export const filterPayments = (
  payments: Payment[],
  filters: {
    email?: string;
    phone?: string;
    mode?: string;
    date?: string;
  },
  users: User[]
): Payment[] => {
  return payments.filter(payment => {
    const user = users.find(u => u.id === payment.user_id);
    if (!user) return false;
    
    const matchesEmail = !filters.email || user.email.toLowerCase().includes(filters.email.toLowerCase());
    const matchesPhone = !filters.phone || user.mobile.includes(filters.phone);
    const matchesMode = !filters.mode || payment.payment_mode === filters.mode;
    const matchesDate = !filters.date || payment.payment_date.includes(filters.date);
    
    return matchesEmail && matchesPhone && matchesMode && matchesDate;
  });
};

export const sortPaymentsByDate = (payments: Payment[]): Payment[] => {
  return [...payments].sort((a, b) => 
    new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime()
  );
};