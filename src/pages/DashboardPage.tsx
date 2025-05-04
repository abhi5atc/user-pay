import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { DashboardCard } from '../components/Dashboard/DashboardCard';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Users, CreditCard, DollarSign } from 'lucide-react';
import { getCurrentMonth, getPreviousMonth, getMonthName } from '../utils/dateUtils';
import { sortPaymentsByDate } from '../utils/helpers';

export const DashboardPage: React.FC = () => {
  const { users, payments } = useApp();
  
  const totalUsers = users.length;
  
  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();
  
  const currentMonthPayments = payments.filter(p => p.paid_for_month === currentMonth);
  const previousMonthPayments = payments.filter(p => p.paid_for_month === previousMonth);
  
  const currentMonthAmount = currentMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const previousMonthAmount = previousMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  const recentPayments = sortPaymentsByDate(payments).slice(0, 5);
  
  const getUserName = (user_id: string): string => {
    const user = users.find(u => u.id === user_id);
    return user ? user.name : 'Unknown User';
  };
  
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Users"
          value={totalUsers}
          icon={<Users size={24} />}
          color="indigo"
        />
        
        <DashboardCard
          title="Current Month Collection"
          value={`₹${currentMonthAmount.toFixed(2)}`}
          icon={<DollarSign size={24} />}
          color="green"
          trend={{
            value: previousMonthAmount > 0 
              ? Math.round(((currentMonthAmount - previousMonthAmount) / previousMonthAmount) * 100) 
              : 0,
            isPositive: currentMonthAmount >= previousMonthAmount
          }}
        />
        
        <DashboardCard
          title="Total Collection"
          value={`₹${payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}`}
          icon={<CreditCard size={24} />}
          color="blue"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Recent Payments
            </h2>
          </CardHeader>
          
          <CardBody className="p-0">
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentPayments.length > 0 ? (
                  recentPayments.map(payment => (
                    <li key={payment.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {getUserName(payment.user_id)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {getMonthName(payment.paid_for_month)} • {payment.payment_mode}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          ₹{payment.amount.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-6 py-4 text-center text-sm text-gray-500">
                    No recent payments
                  </li>
                )}
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};