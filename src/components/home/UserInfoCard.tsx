import React from 'react';
import { UserWifiData } from '@/app/(admin)/home/home';
import { FaUser, FaMapMarkerAlt, FaRocket, FaChevronRight, FaPlay, FaStop } from 'react-icons/fa';
import Link from 'next/link';
import { Timer, TimerOff } from 'lucide-react';

interface Props {
  data: UserWifiData;
}

const UserInfoCard: React.FC<Props> = ({ data }) => {
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
    <div className="bg-white rounded-2xl shadow-lg text-gray-800 overflow-hidden">
      {/* Bagian Header Kartu */}
      <div className="p-5 bg-gray-50 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <FaUser className="w-5 h-5 text-gray-400" />
            <div>
              <p className="font-bold text-lg">{data.customerName}</p>
              <p className="text-sm text-gray-500">CID: {data.cid}</p>
              <p className="text-sm text-gray-500">Telepon: {data.phoneNo}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusChipColor(data.status)}`}>
            {data.status}
          </span>
        </div>
      </div>

      {/* Bagian Detail Paket */}
      <div className="p-5 space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Paket Anda Saat Ini</p>
          <p className="text-2xl font-bold">{data.packageName}</p>
          <p className="text-xl font-semibold text-blue-600 flex items-center gap-2 mt-1">
            <FaRocket />
            <span>{data.packageSpeed} Mbps</span>
          </p>
        </div>
        
        {/* PERUBAHAN: Bagian Waktu Mulai & Akhir ditambahkan di sini */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
                <p className="text-sm text-gray-500 flex items-center gap-1.5"><Timer className="w-3 h-3"/> Waktu Mulai</p>
                <p className="font-semibold">{data.startTime}</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 flex items-center gap-1.5"><TimerOff className="w-3 h-3"/> Waktu Akhir</p>
                <p className="font-semibold">{data.endTime}</p>
            </div>
        </div>
      </div>
      
      {/* Tombol Aksi */}
      <Link href="/packages" className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-200 transition-colors border-t border-gray-200">
        <span className="font-semibold text-gray-700">Lihat & Upgrade Paket</span>
        <FaChevronRight className="text-gray-500" />
      </Link>
    </div>
  );
};

export default UserInfoCard;