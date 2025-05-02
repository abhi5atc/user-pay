import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Payment, UserWithPaymentStatus } from '../types';
import { getUserPaymentStatus } from '../utils/helpers';
import { supabase } from '../lib/supabase';
import { useAlert } from './AlertContext';

interface AppContextType {
  users: User[];
  payments: Payment[];
  usersWithStatus: UserWithPaymentStatus[];
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Omit<User, 'id'>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addPayment: (payment: Omit<Payment, 'id'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [usersWithStatus, setUsersWithStatus] = useState<UserWithPaymentStatus[]>([]);
  const { showAlert } = useAlert();
  
  useEffect(() => {
    fetchUsers();
    fetchPayments();
  }, []);
  
  useEffect(() => {
    const newUsersWithStatus = getUserPaymentStatus(users, payments);
    setUsersWithStatus(newUsersWithStatus);
  }, [users, payments]);
  
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching users:', error);
      showAlert('error', `Failed to fetch users: ${error.message}`);
      return;
    }
    
    setUsers(data);
  };
  
  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching payments:', error);
      showAlert('error', `Failed to fetch payments: ${error.message}`);
      return;
    }
    
    setPayments(data);
  };
  
  const addUser = async (user: Omit<User, 'id'>) => {
    const { error } = await supabase
      .from('users')
      .insert([user]);
    
    if (error) {
      console.error('Error adding user:', error);
      showAlert('error', `Failed to add user: ${error.message}`);
      return;
    }
    
    showAlert('success', 'User added successfully');
    fetchUsers();
  };
  
  const updateUser = async (id: string, user: Omit<User, 'id'>) => {
    const { error } = await supabase
      .from('users')
      .update(user)
      .eq('id', id);
    
    if (error) {
      console.error('Error updating user:', error);
      showAlert('error', `Failed to update user: ${error.message}`);
      return;
    }
    
    showAlert('success', 'User updated successfully');
    fetchUsers();
  };
  
  const deleteUser = async (id: string) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting user:', error);
      showAlert('error', `Failed to delete user: ${error.message}`);
      return;
    }
    
    showAlert('success', 'User deleted successfully');
    fetchUsers();
    fetchPayments();
  };
  
  const addPayment = async (payment: Omit<Payment, 'id'>) => {
    const { error } = await supabase
      .from('payments')
      .insert([payment]);
    
    if (error) {
      console.error('Error adding payment:', error);
      showAlert('error', `Failed to add payment: ${error.message}`);
      return;
    }
    
    showAlert('success', 'Payment added successfully');
    fetchPayments();
  };
  
  return (
    <AppContext.Provider 
      value={{ 
        users, 
        payments, 
        usersWithStatus,
        addUser, 
        updateUser, 
        deleteUser, 
        addPayment 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};