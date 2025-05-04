import React from 'react';
import { Users, CreditCard, Home, AlertCircle, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface NavItem {
  name: string;
  to: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const navigation: NavItem[] = [
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
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-indigo-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-white font-bold text-xl">PaymentTracker</h1>
            </div>
            
            <nav className="mt-8 flex-1 px-2 space-y-1">
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
    </div>
  );
};