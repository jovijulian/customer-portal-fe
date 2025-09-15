"use client";
import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Bounce, ToastContainer } from "react-toastify";
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const publicPaths = ["/signin", "/signup", "/public-page"];

    if (!token && !publicPaths.includes(pathname)) {
      router.replace("/signin");
    }
  }, [pathname, router]);
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ToastContainer
          style={{
            marginTop: '4rem',
            right: 'max(1rem, calc(50vw - 12rem))',
            left: 'auto',
            width: 'auto',
            maxWidth: '24rem',
            margin: '4rem auto 0 auto'
          }}
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <ThemeProvider>
          <div className="min-h-screen bg-gray-50 flex justify-center">
            {/* Container with mobile-like width */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-lg relative">
              <main className="">
                <SidebarProvider>
                  {children}

                </SidebarProvider>
              </main>
            </div>
          </div>
        </ThemeProvider>

      </body>
    </html>
  );
}
