"use client";
import React, { useEffect, useState } from "react";
import UserInfoCard from "@/components/home/UserInfoCard";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import LiveChatWidget from "@/components/home/LiveChatWidget";
import WeeklyUsageChart from "@/components/home/WeeklyUsageChart";
import PromotionalBanners from "@/components/home/PromotionalBanners";
import TipsAndTricksCard from "@/components/home/TipsAndTricksCard";
import { useUserStatus } from "@/context/UserStatusContext";

export interface UserWifiData {
    cid: string;
    customerName: string;
    address: string;
    phone: string;
    packageName: string;
    packageSpeed: number;
    startTime: string; 
    endTime: string;
    status: 'Active' | 'Inactive' | 'Suspended';
}

interface DailyUsage {
    day: string;
    usage: number; 
}

export default function HomePage() {
    const { userData, setUserData } = useUserStatus();

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
        { id: 1, image: '/images/banner-promo-1.png', link: '/promo/spesial-ramadhan' },
        { id: 2, image: '/images/banner-promo-2.png', link: '/promo/upgrade-gratis' },
        { id: 3, image: '/images/banner-promo-3.png', link: '/promo/diskon-tagihan' },
    ]);
    const [tips, setTips] = useState([
        { id: 1, title: 'Optimalkan Sinyal WiFi Anda', description: 'Tempatkan router di area terbuka dan di tengah rumah.', link: '/tips/optimasi-wifi' },
        { id: 2, title: 'Amankan Jaringan WiFi Anda', description: 'Gunakan password yang kuat dan ganti secara berkala.', link: '/tips/keamanan-wifi' },
        { id: 3, title: 'Periksa Kabel Jika Internet Lambat', description: 'Pastikan semua kabel terpasang dengan benar dan tidak rusak.', link: '/tips/troubleshoot' },
    ]);

    useEffect(() => {
        const mockUserData: UserWifiData = {
            cid: "11223344",
            customerName: "Budi Santoso",
            phone: "081313162548",
            address: "Jl. Soekarno Hatta No. 456, Bandung",
            packageName: "Free 1 Bulan GKI 200",
            packageSpeed: 200, 
            startTime: "16/09/2025", 
            endTime: "16/10/2025",
            status: 'Active',
        };
        if (setUserData) {
            setUserData(mockUserData);
        }
    }, [setUserData]);

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