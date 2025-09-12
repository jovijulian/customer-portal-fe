"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { FaCheckCircle, FaSpinner, FaMapMarkerAlt, FaTools } from 'react-icons/fa';

import StatusTracker from '@/components/support/StatusTracker';
import TechnicianCard from '@/components/support/TechnicianCard';

const LiveTrackingMap = dynamic(() => import('@/components/support/LiveTrackingMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] lg:h-full w-full bg-gray-200 rounded-2xl flex items-center justify-center animate-pulse">Memuat Peta...</div>,
});

interface TicketData {
  id: string;
  category: string;
  statusText: string;
  technician: {
    name: string;
    eta: string;
    photoUrl: string;
    position: [number, number];
  };
  progress: any[];
}


const TicketDetailPage = () => {
  const params = useParams();
  const ticketId = params.id;
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  useEffect(() => {
    const mockTicket: TicketData = {
      id: ticketId as string,
      category: 'Koneksi Lambat',
      statusText: 'Teknisi di Jalan',
      technician: {
        name: 'Agus Setiawan',
        eta: '12 menit',
        photoUrl: '/images/default_profile.jpg',
        position: [-6.9025, 107.6187], 
      },
      progress: [
        { name: 'Laporan Diterima', timestamp: '15:20', isCurrent: false, isCompleted: true, icon: FaCheckCircle },
        { name: 'Teknisi Ditugaskan', timestamp: '15:22', isCurrent: false, isCompleted: true, icon: FaCheckCircle },
        { name: 'Teknisi di Jalan', timestamp: '15:35', isCurrent: true, isCompleted: false, icon: FaMapMarkerAlt },
        { name: 'Selesai', timestamp: null, isCurrent: false, isCompleted: false, icon: FaTools },
      ]
    };

    setTimeout(() => {
      setTicketData(mockTicket);
    }, 1500);

  }, [ticketId]);

  if (!ticketData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Detail Laporan #{ticketData.id}</h1>
        <p className="text-gray-500 mt-1">Kategori: <span className="font-semibold">{ticketData.category}</span></p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LiveTrackingMap
            position={ticketData.technician.position}
            technicianName={ticketData.technician.name}
          />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <TechnicianCard
            name={ticketData.technician.name}
            eta={ticketData.technician.eta}
            photoUrl={ticketData.technician.photoUrl}
          />
          <StatusTracker progress={ticketData.progress} />
        </div>


      </div>
    </div>
  );
};

export default TicketDetailPage;