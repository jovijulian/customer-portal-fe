"use client";

import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaQrcode, FaCog } from "react-icons/fa";
import { useState, useEffect } from "react";

const AppHeader = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nameFromStorage = localStorage.getItem("name");
      setUserName(nameFromStorage);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 bg-white border-b border-gray-200 shadow-sm w-full max-w-md mb-3">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">{getGreeting()},</span>
          <span className="font-bold text-gray-800 -mt-1">
            {userName ? userName : 'Pelanggan'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/settings/wifi" className="text-gray-600 hover:text-blue-600 transition-colors">
            <FaCog className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;