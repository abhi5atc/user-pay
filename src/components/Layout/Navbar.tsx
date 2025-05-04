import React, { useState } from 'react';
import { Menu, X, Users, CreditCard, Home, AlertCircle, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  title: string;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', to: '/', icon: <Home size={20} /> },
    { name: 'Users', to: '/users', icon: <Users size={20} /> },
    { name: 'Payments', to: '/payments', icon: <CreditCard size={20} /> },
    { name: 'Pending Payments', to: '/pending', icon: <AlertCircle size={20} /> }
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <h1 className="ml-2 md:ml-0 text-xl font-semibold text-gray-800">
              {title}
            </h1>
          </div>
          
          <div className="hidden md:flex items-center">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <div className={`fixed inset-0 z-20 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-indigo-800 h-full">
          <div className="absolute top-0 right-0 pt-2 pr-2">
            <button
              type="button"
              className="rounded-md p-2 text-gray-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="flex items-center flex-shrink-0 px-4 pt-4">
            <h1 className="text-white font-bold text-xl">PaymentTracker</h1>
          </div>
          
          <div className="flex-1 h-0 pt-6 pb-4 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => {
                const current = location.pathname === item.to;
                
                return (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150
                      ${current
                        ? 'bg-indigo-900 text-white'
                        : 'text-indigo-100 hover:bg-indigo-700'}
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className={`
                      mr-3 flex-shrink-0 h-6 w-6 flex items-center justify-center
                      ${current ? 'text-white' : 'text-indigo-300 group-hover:text-white'}
                    `}>
                      {item.icon}
                    </div>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-indigo-700 p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-700 rounded-md"
            >
              <LogOut size={16} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};