"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { toast } from 'react-toastify';

interface UserWifiData {
  wifiId: string;
  activeUntil: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  totalQuota: number;
  remainingQuota: number;
}

interface UserStatusContextType {
  userData: UserWifiData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserWifiData | null>>;
  isOutOfQuota: boolean;
  handleFabClick: () => void;
}

const UserStatusContext = createContext<UserStatusContextType | undefined>(undefined);

export const UserStatusProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserWifiData | null>(null);

  const isOutOfQuota = userData ? userData.remainingQuota <= 0 : false;

  const handleFabClick = () => {
    if (userData) {
      toast.info("Menampilkan iklan... Mohon tunggu 5 detik.", { autoClose: 5000 });
      setTimeout(() => {
        setUserData({
          ...userData,
          totalQuota: 0.5,
          remainingQuota: 0.5,
        });
        toast.success("Anda mendapatkan 500MB kuota darurat dengan kecepatan 1Mbps!");
      }, 5000);
    } 
  };
  
  return (
    <UserStatusContext.Provider value={{ userData, setUserData, isOutOfQuota, handleFabClick }}>
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