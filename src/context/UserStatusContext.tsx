"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

// PERUBAHAN: Sesuaikan interface dengan data baru
interface UserWifiData {
  cid: string;
  customerName: string;
  address: string;
  phoneNo: string;
  packageName: string;
  packageSpeed: number;
  startTime: string;
  endTime: string;
  status: 'Active' | 'Idle' | 'Locked' | 'Suspended' | 'Canceled' | 'Other';
}

// PERUBAHAN: Ubah nama properti agar lebih relevan
interface UserStatusContextType {
  userData: UserWifiData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserWifiData | null>>;
  isExpired: boolean; // Menggantikan isOutOfQuota
  handleFabClick: () => void;
}

const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

export const UserStatusProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserWifiData | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  // PERUBAHAN: Logika untuk mengecek tanggal kedaluwarsa
  useEffect(() => {
    if (userData?.endTime) {
      // Ubah format tanggal 'DD/MM/YYYY HH:mm:ss' menjadi 'MM/DD/YYYY HH:mm:ss' agar bisa diparsing
      const [datePart, timePart] = userData.endTime.split(' ');
      const [day, month, year] = datePart.split('/');
      const formattedDateString = `${month}/${day}/${year} ${timePart}`;

      const endTimeDate = new Date(formattedDateString);
      const now = new Date();

      setIsExpired(now > endTimeDate);
    } else {
      setIsExpired(false);
    }
  }, [userData]); // Dijalankan setiap kali data user berubah

  // PERUBAHAN: Logika baru untuk tombol FAB
  const handleFabClick = () => {
    if (isExpired) {
      // Jika paket expired, arahkan untuk perpanjang
      toast.warn("Paket Anda telah berakhir. Silakan pilih paket baru.");
      window.location.href = "/packages";
    } else {
      // Jika paket aktif, berfungsi sebagai tombol bantuan
      window.location.href = "/support/create-ticket";
    }
  };

  return (
    <UserStatusContext.Provider value={{ userData, setUserData, isExpired, handleFabClick }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export const useUserStatus = () => {
  const context = useContext(UserStatusContext);
  if (context === undefined) {
    throw new Error('useUserStatus must be used within a UserStatusProvider');
  }
  return context;
};