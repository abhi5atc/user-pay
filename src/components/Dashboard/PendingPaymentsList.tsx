import React from 'react';
import { UserWithPaymentStatus } from '../../types';
import { Card, CardHeader, CardBody } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Mail, Phone } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface PendingPaymentsListProps {
  users: UserWithPaymentStatus[];
  title: string;
  currentMonth?: boolean;
}

export const PendingPaymentsList: React.FC<PendingPaymentsListProps> = ({
  users,
  title,
  currentMonth = true
}) => {
  const filteredUsers = users.filter(user => 
    currentMonth ? !user.hasPaidForCurrentMonth : !user.hasPaidForPreviousMonth
  );
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">
            {title} ({filteredUsers.length})
          </h2>
          
          <Badge variant={currentMonth ? 'warning' : 'danger'}>
            {currentMonth ? 'Current Month' : 'Previous Month'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seat No.
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joining Date
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 mr-1" />
                          {user.mobile}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.seatNo}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(user.joiningDate)}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    All users have paid for {currentMonth ? 'current' : 'previous'} month
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