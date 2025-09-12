import React from 'react';
import { UserWifiData } from '@/app/(admin)/home/home'; 
import { FaWifi, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

interface Props {
  data: UserWifiData;
}

const UserInfoCard: React.FC<Props> = ({ data }) => {
  const usagePercentage = data.totalQuota > 0 ? (data.remainingQuota / data.totalQuota) * 100 : 0;

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Suspended':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <FaWifi className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">ID Pelanggan</p>
            <p className="font-bold text-lg">{data.wifiId}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusChipColor(data.status)}`}>
          {data.status}
        </span>
      </div>

      <div className="flex space-x-4 my-6">
        <div className="w-1/2">
          <p className="text-sm text-gray-500 mb-1">Sisa Kuota</p>
          <p className="text-2xl font-bold">
            {data.remainingQuota.toFixed(1)} <span className="text-lg text-gray-500">GB</span>
          </p>
        </div>
        <div className="w-1/2 border-l border-gray-200 pl-4">
          <p className="text-sm text-gray-500 mb-1 flex items-center gap-1.5">
            <FaCalendarAlt className="text-gray-400" />
            <span>Aktif Hingga</span>
          </p>
          <p className="text-xl font-semibold">{data.activeUntil}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${usagePercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1.5 text-right">Total Kuota: {data.totalQuota.toFixed(1)} GB</p>
      </div>

      <Link href="/packages/upgrade" className="w-full flex justify-between items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
        <span className="font-semibold text-gray-700">Upgrade Paket & Kecepatan</span>
        <FaChevronRight className="text-gray-500" />
      </Link>
    </div>
  );
};

export default UserInfoCard;