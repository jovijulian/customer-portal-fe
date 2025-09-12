import React from 'react';
import { FaBoxOpen, FaMoneyBillWave, FaHistory, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';

const actions = [
  { label: 'Beli Paket', icon: FaBoxOpen, href: '/packages' },
  { label: 'Bayar Tagihan', icon: FaMoneyBillWave, href: '/billing' },
  { label: 'Riwayat Pakai', icon: FaHistory, href: '/history' },
  { label: 'Pusat Bantuan', icon: FaHeadset, href: '/support' },
];

const QuickActionsGrid = () => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-lg">
      <div className="grid grid-cols-4 gap-2 text-center">
        {actions.map((action) => (
          <Link 
            href={action.href} 
            key={action.label} 
            className="flex flex-col items-center justify-start p-2 space-y-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="p-4 bg-blue-100 rounded-full">
              <action.icon className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;