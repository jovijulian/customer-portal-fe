"use client";

import React, { useState, useEffect } from 'react';
import { FaWifi, FaLock, FaEye, FaEyeSlash, FaSyncAlt, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WifiManagementPage = () => {
  const [currentSsid, setCurrentSsid] = useState<string>('Loading...');
  
  const [newSsid, setNewSsid] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isRebooting, setIsRebooting] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setCurrentSsid('Nethome_Budi_Santoso_5G');
    }, 1000);
  }, []);

  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSsid.length < 5) {
      toast.error('Nama SSID minimal 5 karakter.');
      return;
    }
    if (newPassword.length > 0 && newPassword.length < 8) {
      toast.error('Password baru minimal 8 karakter.');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    setCurrentSsid(newSsid);
    setNewSsid('');
    setNewPassword('');
    setIsSaving(false);
    toast.success('Pengaturan WiFi berhasil diperbarui!');
  };

  // Fungsi untuk handle reboot modem
  const handleReboot = async () => {
    const isConfirmed = window.confirm(
      'Apakah Anda yakin ingin me-reboot modem? Koneksi internet Anda akan terputus sementara.'
    );

    if (isConfirmed) {
      setIsRebooting(true);
      toast.info('Perintah reboot modem terkirim...');
      await new Promise(resolve => setTimeout(resolve, 5000));
      setIsRebooting(false);
      toast.success('Modem berhasil di-reboot!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Manajemen WiFi</h1>
        <p className="text-gray-500 mb-6">Ubah nama (SSID) dan password jaringan WiFi Anda di sini.</p>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-500 mb-1">Nama WiFi Saat Ini (SSID)</label>
          <p className="text-lg font-semibold text-gray-700 p-3 bg-gray-100 rounded-lg">{currentSsid}</p>
        </div>

        <form onSubmit={handleSaveChanges} className="space-y-4">
          <div>
            <label htmlFor="new-ssid" className="block text-sm font-medium text-gray-700 mb-2">Nama WiFi Baru</label>
            <div className="relative">
              <FaWifi className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="new-ssid"
                type="text"
                value={newSsid}
                onChange={(e) => setNewSsid(e.target.value)}
                placeholder="Minimal 5 karakter"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">Password Baru (Opsional)</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="new-password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Kosongkan jika tidak ingin ganti"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-7">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Aksi Perangkat</h2>
        <p className="text-gray-500 mb-6">Jika koneksi internet Anda terasa lambat atau bermasalah, coba reboot modem.</p>
        <button
          onClick={handleReboot}
          disabled={isRebooting}
          className="w-full py-3 px-4 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <FaSyncAlt className={isRebooting ? 'animate-spin' : ''} />
          {isRebooting ? 'Sedang Me-reboot...' : 'Reboot Modem'}
        </button>
      </div>
    </div>
  );
};

export default WifiManagementPage;