import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { PendingPaymentsList } from '../components/Dashboard/PendingPaymentsList';
import { useApp } from '../context/AppContext';
import { PaymentForm } from '../components/Payment/PaymentForm';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';
import { Plus } from 'lucide-react';

export const PendingPaymentsPage: React.FC = () => {
  const { users, usersWithStatus, addPayment } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };
  
  const handleAddPayment = (paymentData: Omit<Payment, 'id'>) => {
    addPayment(paymentData);
    setIsAddModalOpen(false);
  };
  
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
      
      <div className="space-y-8">
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