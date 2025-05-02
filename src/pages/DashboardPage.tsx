import React from 'react';
import { Layout } from '../components/Layout/Layout';
import { DashboardCard } from '../components/Dashboard/DashboardCard';
import { PendingPaymentsList } from '../components/Dashboard/PendingPaymentsList';
import { useApp } from '../context/AppContext';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Users, CreditCard, AlertCircle, DollarSign } from 'lucide-react';
import { getCurrentMonth, getPreviousMonth, getMonthName } from '../utils/dateUtils';
import { sortPaymentsByDate } from '../utils/helpers';

export const DashboardPage: React.FC = () => {
  const { users, payments, usersWithStatus } = useApp();
  
  const totalUsers = users.length;
  
  const currentMonth = getCurrentMonth();
  const previousMonth = getPreviousMonth();
  
  const currentMonthPayments = payments.filter(p => p.paidForMonth === currentMonth);
  const previousMonthPayments = payments.filter(p => p.paidForMonth === previousMonth);
  
  const currentMonthAmount = currentMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const previousMonthAmount = previousMonthPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  const usersNotPaidCurrentMonth = usersWithStatus.filter(u => !u.hasPaidForCurrentMonth).length;
  const usersNotPaidPreviousMonth = usersWithStatus.filter(u => !u.hasPaidForPreviousMonth).length;
  
  const recentPayments = sortPaymentsByDate(payments).slice(0, 5);
  
  const getUserName = (userId: string): string => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
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
          title="Pending Current Month"
          value={usersNotPaidCurrentMonth}
          icon={<AlertCircle size={24} />}
          color="yellow"
        />
        
        <DashboardCard
          title="Pending Previous Month"
          value={usersNotPaidPreviousMonth}
          icon={<CreditCard size={24} />}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
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
                            {getUserName(payment.userId)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {getMonthName(payment.paidForMonth)} • {payment.paymentMode}
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
        
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">
              Payment Summary
            </h2>
          </CardHeader>
          
          <CardBody>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Month ({getMonthName(currentMonth)})</h3>
                <div className="mt-2 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Collected</p>
                    <p className="text-lg font-semibold text-gray-900">₹{currentMonthAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Paid Users</p>
                    <p className="text-lg font-semibold text-gray-900">{totalUsers - usersNotPaidCurrentMonth} / {totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500">Previous Month ({getMonthName(previousMonth)})</h3>
                <div className="mt-2 flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Collected</p>
                    <p className="text-lg font-semibold text-gray-900">₹{previousMonthAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Paid Users</p>
                    <p className="text-lg font-semibold text-gray-900">{totalUsers - usersNotPaidPreviousMonth} / {totalUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="space-y-6">
        <PendingPaymentsList
          users={usersWithStatus}
          title="Pending Payments for Current Month"
          currentMonth={true}
        />
        
        <PendingPaymentsList
          users={usersWithStatus}
          title="Pending Payments for Previous Month"
          currentMonth={false}
        />
      </div>
    </Layout>
  );
};