"use client";

import React, { useState } from 'react';
import { useUserStatus } from '@/context/UserStatusContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

// Tipe data untuk sebuah paket
interface Package {
    id: number;
    name: string;
    speed: number; // in Mbps
    price: number; // in IDR
    features: string[];
    mascotImage: string;
}

const PackagesPage = () => {
    const { userData, setUserData } = useUserStatus();

    // Data sekarang hanya satu objek, bukan array
    const [availablePackage] = useState<Package>({
        id: 1,
        name: 'GKI 200',
        speed: 200,
        price: 116000,
        features: ['Harga terjangkau, kualitas cepat', 'Gratis internet 1 bulan pertama'],
        mascotImage: '/images/mascot-diamond.png',
    });

    // State untuk modal (tetap diperlukan)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

    // Fungsi konfirmasi pembelian (diperbarui untuk logika waktu)
    const handleConfirmPurchase = async () => {
        if (!userData || !setUserData) return;

        setIsPurchasing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        // LOGIKA BARU: Perpanjang masa aktif selama 30 hari dari sekarang
        const now = new Date();
        const newEndTime = new Date(now.setDate(now.getDate() + 30));

        // Format tanggal kembali ke DD/MM/YYYY HH:mm:ss
        const day = String(newEndTime.getDate()).padStart(2, '0');
        const month = String(newEndTime.getMonth() + 1).padStart(2, '0');
        const year = newEndTime.getFullYear();
        const hours = String(newEndTime.getHours()).padStart(2, '0');
        const minutes = String(newEndTime.getMinutes()).padStart(2, '0');
        const seconds = String(newEndTime.getSeconds()).padStart(2, '0');
        const formattedEndTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        setUserData({
            ...userData,
            packageName: availablePackage.name,
            packageSpeed: availablePackage.speed,
            endTime: formattedEndTime, // Perbarui endTime
            status: 'Active',
        });

        setIsPurchasing(false);
        setIsModalOpen(false);
        toast.success(`Berhasil! Anda telah berlangganan paket ${availablePackage.name}.`);
    };


    return (
        <>
            <div className="space-y-4 max-w-4xl mx-auto">
                {/* Header Bar */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-3">
                    <div className="bg-blue-600 text-white font-semibold text-center py-3 rounded-t-xl">
                        Stream, game, and browse without limits
                    </div>
                    {/* Bagian Header Paket (bukan tab lagi) */}
                    {/* <div className="p-4 bg-blue-50 border-b border-gray-200">
                        <h3 className="font-bold text-lg text-blue-700">{availablePackage.name}</h3>
                        <p className="font-semibold text-blue-600">
                            Rp. {availablePackage.price.toLocaleString('id-ID')} / <span className="font-normal">bulan</span>
                        </p>
                    </div> */}

                    {/* Konten Detail Paket */}
                    <div className="p-6 gap-6 items-center">
                        {/* Kiri: Deskripsi Paket */}
                      {/* Kiri: Deskripsi Paket (Layout Baru) */}
                      <div className="space-y-6">
                            <div>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{availablePackage.name}</h2>
                                <p className="text-lg font-semibold text-gray-500 mt-1">
                                    Rp. {availablePackage.price.toLocaleString('id-ID')}
                                    <span className="font-normal text-base"> / bulan</span>
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                <p className="text-sm text-gray-500">KECEPATAN INTERNET</p>
                                <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 text-2xl">
                                    up to {availablePackage.speed} Mbps
                                </p>
                            </div>
                            
                            <div className="space-y-3 pt-2">
                                <p className="font-semibold text-gray-700">Yang Anda Dapatkan:</p>
                                {availablePackage.features.map(feature => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                                        <span className="text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Kanan: Maskot dan Tombol Aksi */}
                        <div className="text-center space-y-4 mt-5">
                            <div className="flex justify-center">
                                <Image
                                    src={availablePackage.mascotImage}
                                    alt={`${availablePackage.name} Mascot`}
                                    width={160}
                                    height={160}
                                    className="object-contain"
                                />
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full max-w-xs mx-auto py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                            >
                                Berlangganan Sekarang
                            </button>
                            <p className="text-xs text-gray-400">*Harga belum termasuk pajak, dan PPN*</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50 backdrop-blur-[32px] bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Pilihan</h2>
                        <p className="text-gray-600 mb-4">
                            Anda akan berlangganan paket <span className="font-bold">{availablePackage.name}</span> ({availablePackage.speed} Mbps) seharga <span className="font-bold">Rp{availablePackage.price.toLocaleString('id-ID')}/bulan</span>.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setIsModalOpen(false)} className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmPurchase}
                                disabled={isPurchasing}
                                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
                            >
                                {isPurchasing ? 'Memproses...' : 'Ya, Lanjutkan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PackagesPage;