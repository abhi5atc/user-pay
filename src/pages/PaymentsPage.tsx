import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { PaymentList } from '../components/Payment/PaymentList';
import { PaymentForm } from '../components/Payment/PaymentForm';
import { Modal } from '../components/UI/Modal';
import { useApp } from '../context/AppContext';

export const PaymentsPage: React.FC = () => {
  const { users, payments, addPayment } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };
  
  const handleAddPayment = (paymentData: Omit<Payment, 'id'>) => {
    addPayment(paymentData);
    setIsAddModalOpen(false);
  };
  
  return (
    <Layout title="Payments">
      <PaymentList
        payments={payments}
        users={users}
        onAdd={handleAdd}
      />
      
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