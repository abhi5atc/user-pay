import React, { useState } from 'react';
import { Payment, User, payment_mode } from '../../types';
import { Card, CardHeader, CardBody } from '../UI/Card';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Plus, Search, User as UserIcon, Calendar } from 'lucide-react';
import { Badge } from '../UI/Badge';
import { formatDateTime, getMonthName } from '../../utils/dateUtils';
import { filterPayments, sortPaymentsByDate } from '../../utils/helpers';

interface PaymentListProps {
  payments: Payment[];
  users: User[];
  onAdd: () => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  users,
  onAdd
}) => {
  const [filters, setFilters] = useState({
    email: '',
    phone: '',
    mode: '',
    date: ''
  });
  
  const payment_modes: { value: string; label: string }[] = [
    { value: '', label: 'All Modes' },
    { value: 'Cash', label: 'Cash' },
    { value: 'Card', label: 'Card' },
    { value: 'UPI', label: 'UPI' },
    { value: 'Bank Transfer', label: 'Bank Transfer' },
    { value: 'Other', label: 'Other' }
  ];
  
  const filteredPayments = filterPayments(payments, filters, users);
  const sortedPayments = sortPaymentsByDate(filteredPayments);
  
  const getUserName = (user_id: string): string => {
    const user = users.find(u => u.id === user_id);
    return user ? user.name : 'Unknown User';
  };
  
  const getUserEmail = (user_id: string): string => {
    const user = users.find(u => u.id === user_id);
    return user ? user.email : '';
  };
  
  const getUserMobile = (user_id: string): string => {
    const user = users.find(u => u.id === user_id);
    return user ? user.mobile : '';
  };
  
  const getpayment_modeColor = (mode: payment_mode): string => {
    switch (mode) {
      case 'Cash':
        return 'success';
      case 'Card':
        return 'info';
      case 'UPI':
        return 'primary';
      case 'Bank Transfer':
        return 'secondary';
      default:
        return 'warning';
    }
  };
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-900">
            Payment History ({sortedPayments.length})
          </h2>
          
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={onAdd}
          >
            Add Payment
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
          <Input
            placeholder="Filter by email..."
            value={filters.email}
            onChange={(e) => handleFilterChange('email', e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-gray-400" />}
          />
          
          <Input
            placeholder="Filter by phone..."
            value={filters.phone}
            onChange={(e) => handleFilterChange('phone', e.target.value)}
            leftIcon={<UserIcon className="h-4 w-4 text-gray-400" />}
          />
          
          <Select
            options={payment_modes}
            value={filters.mode}
            onChange={(value) => handleFilterChange('mode', value)}
          />
          
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            leftIcon={<Calendar className="h-4 w-4 text-gray-400" />}
          />
        </div>
      </CardHeader>
      
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedPayments.length > 0 ? (
                sortedPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {getUserName(payment.user_id)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getUserEmail(payment.user_id)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {getUserMobile(payment.user_id)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 mr-2">
                          ₹{payment.amount.toFixed(2)}
                        </span>
                        <Badge variant={getpayment_modeColor(payment.payment_mode)}>
                          {payment.payment_mode}
                        </Badge>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDateTime(payment.payment_date)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {getMonthName(payment.paid_for_month)}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {payment.remarks || '-'}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};