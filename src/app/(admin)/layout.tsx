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
  const mainContentMargin = isMechanic
    ? "ml-0"
    : isMobileOpen
      ? "ml-0"
      : isExpanded || isHovered
        ? "lg:ml-[290px]"
        : "lg:ml-[90px]";

  return (
    <UserStatusProvider> 
    <div className="min-h-screen xl:flex">
      <AppSidebar />
      <Backdrop />
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        <AppHeader />

        <main className="mx-auto max-w-screen-xl p-4 md:p-6 pb-20 pt-20">
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
