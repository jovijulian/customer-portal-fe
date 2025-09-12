"use client";

import React, { useState, useEffect } from 'react';
import { useUserStatus } from '@/context/UserStatusContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaCheckCircle } from 'react-icons/fa';

// Tipe data untuk sebuah paket (tetap sama)
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

    // Data mock (tetap sama)
    const [availablePackages] = useState<Package[]>([
        {
            id: 1,
            name: 'Nethome Diamond',
            speed: 500,
            price: 116000,
            features: ['Harga terjangkau, kualitas cepat', 'Gratis internet 1 bulan pertama'],
            mascotImage: '/images/mascot-diamond.png',
        },
        {
            id: 2,
            name: 'Nethome Platinum',
            speed: 1000,
            price: 227000,
            features: ['Harga terjangkau, kualitas cepat', 'Gratis internet 1 bulan pertama'],
            mascotImage: '/images/mascot-platinum.png',
        },
    ]);

    // State untuk tab aktif (tetap sama)
    const [activePackageId, setActivePackageId] = useState<number>(availablePackages[0].id);

    // STATE BARU: Untuk mengontrol animasi fade-in/out
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    // Cari paket yang aktif (tetap sama)
    const activePackage = availablePackages.find(p => p.id === activePackageId);

    // State untuk modal (tetap sama)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isPurchasing, setIsPurchasing] = useState<boolean>(false);

    // Fungsi untuk mengubah tab dengan animasi
    const handleTabClick = (id: number) => {
        if (id === activePackageId) return; // Jangan lakukan apa-apa jika tab yang sama diklik

        setIsTransitioning(true);
        setTimeout(() => {
            setActivePackageId(id);
            setIsTransitioning(false);
        }, 200); // Durasi transisi harus cocok dengan CSS
    };

    // ... (Fungsi handleSelectPackage & handleConfirmPurchase tetap sama) ...
    const handleSelectPackage = () => {
        if (!activePackage) return;
        setIsModalOpen(true);
    };

    const handleConfirmPurchase = async () => {
        if (!activePackage || !userData) return;
        setIsPurchasing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (setUserData) {
            setUserData({
                ...userData,
                totalQuota: activePackage.speed / 10,
                remainingQuota: activePackage.speed / 10,
            });
        }
        setIsPurchasing(false);
        setIsModalOpen(false);
        toast.success(`Berhasil! Anda telah beralih ke paket ${activePackage.name}.`);
    };


    return (
        <>
            <div className="space-y-4 max-w-4xl mx-auto">
               

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-3">
                <div className="bg-blue-600 text-white font-semibold text-center py-3 rounded-t-xl">
                    Stream, game, and browse without limits
                </div>
                    <div className="relative grid grid-cols-2 border-b border-gray-200">
                        {availablePackages.map((pkg, index) => (
                            <button
                                key={pkg.id}
                                onClick={() => handleTabClick(pkg.id)}
                                className="p-4 text-left transition-colors duration-300 z-10"
                            >
                                <h3 className={`font-bold text-lg ${activePackageId === pkg.id ? 'text-blue-600' : 'text-gray-500'}`}>{pkg.name}</h3>
                                <p className={`font-semibold ${activePackageId === pkg.id ? 'text-blue-500' : 'text-gray-400'}`}>
                                    Rp. {pkg.price.toLocaleString('id-ID')} / <span className="font-normal">bulan</span>
                                </p>
                            </button>
                        ))}
                        <div
                            className="absolute bottom-0 h-1 bg-blue-600 rounded-t-full transition-all duration-300 ease-in-out"
                            style={{
                                width: '50%',
                                left: activePackageId === availablePackages[0].id ? '0%' : '50%',
                            }}
                        ></div>
                    </div>

                    <div className={`p-6 md:p-8 transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                        {activePackage && (
                            <div className="grid md:grid-cols-2 gap-6 items-center">
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-extrabold text-gray-900">{activePackage.name}</h2>
                                    <p className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 text-2xl">
                                        up to {activePackage.speed} Mbps
                                    </p>
                                    <div className="space-y-3 pt-2">
                                        {activePackage.features.map(feature => (
                                            <div key={feature} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                                <FaCheckCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center transition-transform duration-300 ease-in-out" key={activePackage.id}>
                                        <Image
                                            src={activePackage.mascotImage}
                                            alt={`${activePackage.name} Mascot`}
                                            width={160}
                                            height={160}
                                            className="object-contain animate-fade-in"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSelectPackage}
                                        className="w-full max-w-xs mx-auto py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                                    >
                                        Berlangganan Sekarang
                                    </button>
                                    <p className="text-xs text-gray-400">*Harga belum termasuk pajak, dan PPN*</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && activePackage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Konfirmasi Pilihan</h2>
                        <p className="text-gray-600 mb-4">
                            Anda akan beralih ke paket <span className="font-bold">{activePackage.name}</span> ({activePackage.speed} Mbps) seharga <span className="font-bold">Rp{activePackage.price.toLocaleString('id-ID')}/bulan</span>.
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