"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStatus } from '@/context/UserStatusContext';
import Link from 'next/link';
import { FaUserCircle, FaChevronRight, FaEdit, FaLock, FaWifi, FaSignOutAlt } from 'react-icons/fa';
import { deleteCookie } from 'cookies-next';
import { toast } from 'react-toastify';

// Komponen untuk setiap item menu agar lebih rapi
const ProfileMenuItem = ({ href, icon: Icon, title, subtitle }: { href: string, icon: React.ElementType, title: string, subtitle: string }) => (
  <Link href={href} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div className="p-2 bg-blue-100 rounded-full mr-4">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <FaChevronRight className="text-gray-400" />
  </Link>
);

const ProfilePage = () => {
  const router = useRouter();
  const { userData, setUserData } = useUserStatus();
  const [userName, setUserName] = useState<string | null>('Memuat...');

  useEffect(() => {
    // Ambil nama dari localStorage yang disimpan saat login
    const nameFromStorage = localStorage.getItem("name");
    if (nameFromStorage) {
      setUserName(nameFromStorage);
    } else {
      setUserName('Pelanggan Nethome'); // Fallback jika tidak ada nama
    }
  }, []);

  const handleLogout = () => {
    // Tampilkan konfirmasi sebelum logout
    // if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      // Hapus data dari Context
      if(setUserData) {
          setUserData(null);
      }
      
      // Hapus semua data dari localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      localStorage.removeItem('user_id');

      // Hapus cookie
      deleteCookie('token');
      deleteCookie('role');

      toast.success('Anda berhasil logout.');
      
      // Arahkan ke halaman login
      router.push('/signin');
    // }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-800">Profil Saya</h1>
        <p className="text-gray-500 mt-1">Kelola informasi akun dan pengaturan layanan Anda.</p>
      </div>

      {/* --- KARTU PROFIL PENGGUNA --- */}
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-4">
        <FaUserCircle className="w-16 h-16 text-gray-300" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{userName}</h2>
          <p className="text-gray-500">ID Pelanggan: {userData?.wifiId || '...'}</p>
        </div>
      </div>

      {/* --- MENU PENGATURAN --- */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        <div className="space-y-3">
          <h3 className="px-2 text-sm font-semibold text-gray-400 uppercase">Pengaturan Akun</h3>
          <ProfileMenuItem 
            href="/profile/edit" 
            icon={FaEdit} 
            title="Edit Profil" 
            subtitle="Ubah nama, email, & nomor telepon" 
          />
          <ProfileMenuItem 
            href="/profile/change-password" 
            icon={FaLock} 
            title="Ubah Password" 
            subtitle="Ganti password login aplikasi Anda" 
          />
          <h3 className="px-2 pt-4 text-sm font-semibold text-gray-400 uppercase">Pengaturan Layanan</h3>
          <ProfileMenuItem 
            href="/settings/wifi" 
            icon={FaWifi} 
            title="Manajemen Jaringan WiFi" 
            subtitle="Ubah SSID & password WiFi Anda" 
          />
        </div>
      </div>

      {/* --- TOMBOL LOGOUT --- */}
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors"
        >
          <FaSignOutAlt />
          Keluar (Logout)
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;