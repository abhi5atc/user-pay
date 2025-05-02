import React, { useState } from 'react';
import { Payment, User, payment_mode } from '../../types';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';
import { Save, X } from 'lucide-react';
import { getMonthName, getMonthOptions } from '../../utils/dateUtils';

interface PaymentFormProps {
  users: User[];
  onSubmit: (payment: Omit<Payment, 'id'>) => void;
  onCancel?: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  users,
  onSubmit,
  onCancel
}) => {
  const initialDate = new Date().toISOString().slice(0, 16);
  const [formData, setFormData] = useState<Omit<Payment, 'id'>>({
    user_id: '',
    payment_date: initialDate,
    payment_mode: 'Cash',
    amount: 0,
    paid_for_month: new Date().toISOString().slice(0, 7),
    remarks: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const payment_modes: { value: payment_mode; label: string }[] = [
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Other', label: 'Other' }
  ];
  
  const monthOptions = getMonthOptions().map(month => ({
    value: month,
    label: getMonthName(month)
  }));
  
  const userOptions = [
    { value: '', label: 'Select User' },
    ...users.map(user => ({
      value: user.id,
      label: `${user.name} (${user.email})`
    }))
  ];
  
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.user_id) {
      newErrors.user_id = 'User is required';
    }
    
    if (!formData.payment_date) {
      newErrors.payment_date = 'Payment date is required';
    }
    
    if (!formData.payment_mode) {
      newErrors.payment_mode = 'Payment mode is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    
    if (!formData.paid_for_month) {
      newErrors.paid_for_month = 'Month is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="User"
        id="user_id"
        name="user_id"
        value={formData.user_id}
        options={userOptions}
        onChange={(value) => {
          setFormData(prev => ({ ...prev, user_id: value }));
          if (errors.user_id) {
            setErrors(prev => ({ ...prev, user_id: '' }));
          }
        }}
        error={errors.user_id}
        required
      />
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Payment Date & Time"
          id="payment_date"
          name="payment_date"
          type="datetime-local"
          value={formData.payment_date}
          onChange={handleChange}
          error={errors.payment_date}
          required
        />
        
        <Select
          label="Payment Mode"
          id="payment_mode"
          name="payment_mode"
          value={formData.payment_mode}
          options={payment_modes}
          onChange={(value) => {
            setFormData(prev => ({ 
              ...prev, 
              payment_mode: value as payment_mode 
            }));
            if (errors.payment_mode) {
              setErrors(prev => ({ ...prev, payment_mode: '' }));
            }
          }}
          error={errors.payment_mode}
          required
        />
        
        <Input
          label="Amount"
          id="amount"
          name="amount"
          type="number"
          min="0"
          step="0.01"
          value={formData.amount.toString()}
          onChange={handleChange}
          error={errors.amount}
          required
        />
        
        <Select
          label="Paid For Month"
          id="paid_for_month"
          name="paid_for_month"
          value={formData.paid_for_month}
          options={monthOptions}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, paid_for_month: value }));
            if (errors.paid_for_month) {
              setErrors(prev => ({ ...prev, paid_for_month: '' }));
            }
          }}
          error={errors.paid_for_month}
          required
        />
      </div>
      
      <div>
        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
          Remarks
        </label>
        <textarea
          id="remarks"
          name="remarks"
          rows={3}
          value={formData.remarks}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      
      <div className="flex justify-end space-x-3 mt-6">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            icon={<X size={16} />}
          >
            Cancel
          </Button>
        )}
        
        <Button
          type="submit"
          variant="primary"
          icon={<Save size={16} />}
        >
          Add Payment
        </Button>
      </div>
    </form>
  );
};