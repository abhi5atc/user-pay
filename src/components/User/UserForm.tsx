import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';
import { Save, X } from 'lucide-react';

interface UserFormProps {
  onSubmit: (user: Omit<User, 'id'>) => void;
  initialData?: User;
  onCancel?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  initialData,
  onCancel
}) => {
  const [formData, setFormData] = useState<Omit<User, 'id'>>({
    name: '',
    email: '',
    mobile: '',
    address: '',
    seat_no: '',
    joining_date: new Date().toISOString().split('T')[0]
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        mobile: initialData.mobile,
        address: initialData.address,
        seat_no: initialData.seat_no,
        joining_date: initialData.joining_date.split('T')[0]
      });
    }
  }, [initialData]);
  
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof User, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile should be 10 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.seat_no.trim()) {
      newErrors.seat_no = 'Seat No. is required';
    }
    
    if (!formData.joining_date) {
      newErrors.joining_date = 'Joining Date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof User]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ...formData,
        joining_date: new Date(formData.joining_date).toISOString()
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <Input
          label="Mobile"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          error={errors.mobile}
          required
        />
        
        <Input
          label="Seat No."
          id="seat_no"
          name="seat_no"
          value={formData.seat_no}
          onChange={handleChange}
          error={errors.seat_no}
          required
        />
        
        <div className="sm:col-span-2">
          <Input
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
            required
          />
        </div>
        
        <Input
          label="Joining Date"
          id="joining_date"
          name="joining_date"
          type="date"
          value={formData.joining_date}
          onChange={handleChange}
          error={errors.joining_date}
          required
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
          {initialData ? 'Update User' : 'Add User'}
        </Button>
      </div>
    </form>
  );
};