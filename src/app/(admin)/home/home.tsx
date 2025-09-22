"use client";
import React, { useEffect, useState, useCallback } from "react";
import UserInfoCard from "@/components/home/UserInfoCard";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import LiveChatWidget from "@/components/home/LiveChatWidget";
import WeeklyUsageChart from "@/components/home/WeeklyUsageChart";
import PromotionalBanners from "@/components/home/PromotionalBanners";
import TipsAndTricksCard from "@/components/home/TipsAndTricksCard";
import { useUserStatus } from "@/context/UserStatusContext";
import { endpointUrl, httpGet } from "../../../../helpers";

// PERUBAHAN: Sesuaikan interface dengan response API
export interface UserWifiData {
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

interface DailyUsage {
    day: string;
    usage: number; 
}

export default function HomePage() {
    const { userData, setUserData } = useUserStatus();

    // State untuk komponen lain (tidak berubah)
    const [weeklyUsageData, setWeeklyUsageData] = useState<DailyUsage[]>([
        { day: 'Sen', usage: 2.5 },
        { day: 'Sel', usage: 3.1 },
        { day: 'Rab', usage: 4.0 },
        { day: 'Kam', usage: 2.8 },
        { day: 'Jum', usage: 5.2 },
        { day: 'Sab', usage: 6.5 },
        { day: 'Min', usage: 4.8 },
    ]);
    const [banners, setBanners] = useState([
        { id: 1, image: '/images/image1.jpeg', link: '#' },
        { id: 2, image: '/images/image2.jpeg', link: '#' },
        { id: 3, image: '/images/image3.jpeg', link: '#' },
    ]);
    const [tips, setTips] = useState([
        { id: 1, title: 'Optimalkan Sinyal WiFi Anda', description: 'Tempatkan router di area terbuka dan di tengah rumah.', link: '/tips/optimasi-wifi' },
        { id: 2, title: 'Amankan Jaringan WiFi Anda', description: 'Gunakan password yang kuat dan ganti secara berkala.', link: '/tips/keamanan-wifi' },
        { id: 3, title: 'Periksa Kabel Jika Internet Lambat', description: 'Pastikan semua kabel terpasang dengan benar dan tidak rusak.', link: '/tips/troubleshoot' },
    ]);

    // PERUBAHAN: Fungsi untuk mengubah kode status menjadi teks
    const mapAccountStatus = (status: number): UserWifiData['status'] => {
        switch (status) {
            case 0: return 'Active';
            case 1: return 'Idle';
            case 2: return 'Locked';
            case 3: return 'Suspended';
            case 5: return 'Canceled';
            default: return 'Other';
        }
    };
    
    const getMe = useCallback(async () => {
        try {
            const response = await httpGet(endpointUrl(`b2c/b2c-user`), true);
            if (response.data.code === 200) {
                const userFromApi = response.data.data;
                
                const formattedUserData: UserWifiData = {
                    cid: userFromApi.cid,
                    customerName: userFromApi.customerName,
                    address: userFromApi.address,
                    phoneNo: userFromApi.phoneNo,
                    status: mapAccountStatus(userFromApi.accountStatus),
                    packageName: "NAMI GIG 200",
                    packageSpeed: 200,
                    startTime: "16/09/2025",
                    endTime: "16/10/2025"
                };
                
                if (setUserData) {
                    setUserData(formattedUserData);
                }
            } else {
                console.error("Gagal mengambil data pengguna:", response.data.msg);
            }
        } catch (error) {
            console.error("Error saat memanggil API getMe:", error);
        }
    }, [setUserData]);

    useEffect(() => {
        getMe();
    }, [getMe]);


    if (!userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <UserInfoCard data={userData} />
            <QuickActionsGrid />
            <PromotionalBanners banners={banners} />
            <WeeklyUsageChart data={weeklyUsageData} />
            <TipsAndTricksCard tips={tips} />
            <LiveChatWidget />
        </div>
    );
}