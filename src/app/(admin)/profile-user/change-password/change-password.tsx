"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ChangePasswordPage = () => {
  const router = useRouter();
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [visibility, setVisibility] = useState({ old: false, new: false, confirm: false });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('Password baru dan konfirmasi tidak cocok.');
      return;
    }
    if (passwords.newPassword.length < 8) {
        toast.error('Password baru minimal 8 karakter.');
        return;
    }

    setIsSaving(true);
    // Simulasi API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    toast.success('Password berhasil diubah!');
    router.push('/profile');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-800">Ubah Password</h1>
        <p className="text-gray-500 mt-1">Perbarui password login Anda secara berkala untuk keamanan.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input Password Lama */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Lama</label>
            <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={visibility.old ? 'text' : 'password'} name="oldPassword" value={passwords.oldPassword} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg" required/>
                <button type="button" onClick={() => setVisibility(v => ({...v, old: !v.old}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{visibility.old ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
          </div>
          {/* Input Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
            <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={visibility.new ? 'text' : 'password'} name="newPassword" value={passwords.newPassword} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg" required/>
                <button type="button" onClick={() => setVisibility(v => ({...v, new: !v.new}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{visibility.new ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
          </div>
          {/* Input Konfirmasi Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password Baru</label>
            <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={visibility.confirm ? 'text' : 'password'} name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg" required/>
                <button type="button" onClick={() => setVisibility(v => ({...v, confirm: !v.confirm}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">{visibility.confirm ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={isSaving} className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all text-lg">
              {isSaving ? 'Menyimpan...' : 'Simpan Password Baru'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;