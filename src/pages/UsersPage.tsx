import React, { useState } from 'react';
import { Layout } from '../components/Layout/Layout';
import { UserList } from '../components/User/UserList';
import { UserForm } from '../components/User/UserForm';
import { Modal } from '../components/UI/Modal';
import { useApp } from '../context/AppContext';
import { User } from '../types';

export const UsersPage: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useApp();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };
  
  const handleUpdateUser = (userData: Omit<User, 'id'>) => {
    if (selectedUser) {
      updateUser(selectedUser.id, userData);
      setIsEditModalOpen(false);
      setSelectedUser(null);
    }
  };
  
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };
  
  const handleAddUser = (userData: Omit<User, 'id'>) => {
    addUser(userData);
    setIsAddModalOpen(false);
  };
  
  const handleDelete = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user) {
      setSelectedUser(user);
      setIsDeleteModalOpen(true);
    }
  };
  
  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    }
  };
  
  return (
    <Layout title="Users">
      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New User"
        size="lg"
      >
        <UserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        title="Edit User"
        size="lg"
      >
        {selectedUser && (
          <UserForm
            initialData={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </Modal>
      
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
        }}
        title="Confirm Delete"
        size="sm"
      >
        <div className="text-center">
          <p className="mb-4">
            Are you sure you want to delete user <strong>{selectedUser?.name}</strong>?
            This action cannot be undone.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
            >
              Cancel
            </button>
            
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};