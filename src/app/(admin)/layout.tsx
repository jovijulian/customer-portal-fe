"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import AppFooter from "@/layout/AppFooter";
import React, { Suspense } from "react";
import { UserStatusProvider } from "@/context/UserStatusContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const role = "2";
  const isMechanic = role == "2";

  return (
    <UserStatusProvider> 
      <div className="min-h-screen bg-gray-50 flex justify-center">
        {/* Container with mobile-like width */}
        <div className="w-full max-w-md bg-white min-h-screen shadow-lg relative">
          <AppHeader />
          
          <main className="p-4 pb-20 pt-20">
            <React.Suspense
              fallback={
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
                </div>
              }
            >
              {children}
            </React.Suspense>
          </main>
          
          <AppFooter />
        </div>
      </div>
    </UserStatusProvider>
  );
}