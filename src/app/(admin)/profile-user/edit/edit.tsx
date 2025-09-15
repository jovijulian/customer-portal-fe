"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';

const EditProfilePage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [isSaving, setIsSaving] = useState(false);

    // Simulasi mengambil data user saat halaman dimuat
    useEffect(() => {
        const name = localStorage.getItem('name') || 'Budi Santoso';
        const email = localStorage.getItem('email') || 'budi.s@example.com';
        // Anda bisa menambahkan nomor telepon ke localStorage saat login
        const phone = localStorage.getItem('phone') || '081234567890';
        setFormData({ name, email, phone });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulasi API call untuk menyimpan data
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simpan data baru ke localStorage
        localStorage.setItem('name', formData.name);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('phone', formData.phone);

        setIsSaving(false);
        toast.success('Profil berhasil diperbarui!');
        router.push('/profile'); // Kembali ke halaman profil
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-800">Edit Profil</h1>
                <p className="text-gray-500 mt-1">Perbarui informasi data diri Anda.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input Nama */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>
                    {/* Input Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>
                    {/* Input Nomor Telepon */}
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                        <div className="relative">
                            <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="pt-4">
                        <button type="submit" disabled={isSaving} className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all text-lg">
                            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;