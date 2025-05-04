import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { useApp } from '../context/AppContext';
import { PaymentForm } from '../components/Payment/PaymentForm';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';
import { Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/UI/Tabs';
import { Card, CardHeader, CardBody } from '../components/UI/Card';
import { Mail, Phone } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { getMonthOptions, getMonthName } from '../utils/dateUtils';

export const PendingPaymentsPage: React.FC = () => {
  const { users, payments, addPayment } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };
  
  const handleAddPayment = (paymentData: Omit<Payment, 'id'>) => {
    addPayment(paymentData);
    setIsAddModalOpen(false);
  };

  const months = getMonthOptions().slice(0, 5);
  
  return (
    <Layout title="Pending Payments">
      <div className="mb-6 flex justify-end">
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={handleAdd}
        >
          Add Payment
        </Button>
      </div>
      
      <div className="w-full overflow-hidden">
        <Tabs defaultValue={months[0]} className="w-full">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-max min-w-full inline-flex">
              {months.map((month) => (
                <TabsTrigger key={month} value={month} className="min-w-[200px]">
                  {getMonthName(month)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {months.map((month) => (
            <TabsContent key={month} value={month}>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">
                      Pending Payments for {getMonthName(month)}
                    </h2>
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
                        {users
                          .filter(user => !payments.some(p => 
                            p.user_id === user.id && p.paid_for_month === month
                          ))
                          .map((user) => (
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
                                <div className="text-sm text-gray-900">{user.seat_no}</div>
                              </td>
                              
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {formatDate(user.joining_date)}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Payment"
        size="lg"
      >
        <PaymentForm
          users={users}
          onSubmit={handleAddPayment}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
};