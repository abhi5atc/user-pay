import React from 'react';
import { Card, CardBody } from '../UI/Card';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  color,
  trend
}) => {
  const colors = {
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500'
  };
  
  return (
    <Card className="h-full">
      <CardBody className="flex items-center">
        <div className={`
          flex items-center justify-center w-12 h-12 rounded-full ${colors[color as keyof typeof colors]} text-white mr-4
        `}>
          {icon}
        </div>
        
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={`
                text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
              `}>
                {trend.isPositive ? '+' : '-'}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};