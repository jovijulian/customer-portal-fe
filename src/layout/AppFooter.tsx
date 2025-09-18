"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaWifi, FaBell, FaUser, FaPlus, FaTicketAlt, FaPowerOff, FaQuestionCircle } from "react-icons/fa";
import { useUserStatus } from "@/context/UserStatusContext";

const navItems = [
    { href: "/home", label: "Beranda", icon: FaHome },
    { href: "/packages", label: "Paket", icon: FaWifi },
    { href: "/support", label: "Bantuan", icon: FaQuestionCircle },
    { href: "/profile-user", label: "Profil", icon: FaUser },
];

const AppFooter = () => {
    const pathname = usePathname();
    const {  handleFabClick } = useUserStatus();

    return (
        <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-white border-t border-gray-200 shadow-lg w-full max-w-md">
            <div className="flex justify-around items-center h-16 pb-[env(safe-area-inset-bottom)] relative">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <button
                        onClick={handleFabClick}
                        className={`flex flex-col items-center justify-center w-20 h-20 rounded-full text-white shadow-xl transition-all duration-300 transform hover:-translate-y-1
            bg-blue-600 hover:bg-blue-700`}
                    >
                        <FaPowerOff className="w-7 h-7" />
                        <span className="text-xs font-bold mt-1">Connect</span>
                    </button>
                </div>

                {navItems.slice(0, 2).map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full text-xs transition-colors duration-200 py-2 ${isActive ? "text-blue-600 font-medium" : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                <div className="w-full"></div>

                {navItems.slice(2).map((item) => { 
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full text-xs transition-colors duration-200 py-2 ${isActive ? "text-blue-600 font-medium" : "text-gray-500 hover:text-blue-500"
                                }`}
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </footer>
    );
};

export default AppFooter;