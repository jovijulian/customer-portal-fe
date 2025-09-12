"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@mantine/form";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { FaWifi, FaIdCard, FaHome, FaSignal, FaShieldAlt } from "react-icons/fa";
import Alert from "@/components/ui/alert/Alert";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ variant: any; title: string; message: string; showLink: boolean; linkHref: string; linkText: string } | null>(null);

  const form = useForm({
    initialValues: {
      nik: "",
    },
    validate: {
      nik: (value: any) =>
        value.length !== 16 ? "NIK harus terdiri dari 16 digit" : null,
    },
  });

  const onSubmit = async (payload: typeof form.values) => {
    setLoading(true);
    setAlert(null);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    try {
      const mockUsers = [
        { nik: "1234567890123456", name: "Budi Santoso", id: "user-001" },
        { nik: "3201234567890123", name: "John Doe", id: "user-002" },
        { nik: "3201234567890124", name: "Jane Smith", id: "user-003" }
      ];

      const user = mockUsers.find(u => u.nik === payload.nik);

      if (user) {
        const mockResponse = {
          token: "ini_adalah_mock_jwt_token_untuk_customer",
          user: {
            id: user.id,
            name: user.name,
            nik: user.nik,
            role_id: 3
          },
        };

        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("role", mockResponse.user.role_id.toString());
        localStorage.setItem("name", mockResponse.user.name);
        localStorage.setItem("user_id", mockResponse.user.id);
        setCookie("token", mockResponse.token, {});
        setCookie("role", mockResponse.user.role_id.toString());

        toast.success("Login berhasil! Mengalihkan ke customer portal...");

        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      } else {
        throw new Error("NIK tidak terdaftar dalam sistem. Silakan hubungi customer service.");
      }
    } catch (error: any) {
      setAlert({
        variant: "error",
        title: "Login Gagal",
        message: error.message || "Terjadi kesalahan.",
        showLink: true,
        linkHref: "https://wa.me/628123456789",
        linkText: "Hubungi Customer Service",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-100 animate-gradient-xy"></div>
      <div className="absolute inset-0 bg-slate-100 opacity-25"></div>
      <div className="relative w-full max-w-md px-4 z-10">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl shadow-black/25 p-8 sm:p-10 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white mb-3 transition-all duration-500">
                NetHome
              </h1>
              <div className="h-1 w-20 mx-auto bg-gray-400 rounded-full mb-4 "></div>
              <p className="text-gray-400 text-base sm:text-lg font-medium">
                Portal Pelanggan WiFi Rumahan
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Akses mudah, koneksi terpercaya
              </p>
            </div>
            <form onSubmit={form.onSubmit(onSubmit)} className="space-y-7">
              <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-400 tracking-wide">
                  Nomor Induk Kependudukan (NIK)
                  <span className="text-pink-400 ml-2 text-base">*</span>
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-0  rounded-2xl blur opacity-0 group-hover/input:opacity-20 transition-opacity duration-300"></div>
                  <FaIdCard className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within/input:text-blue-600 transition-all duration-300 z-10" />
                  <input
                    {...form.getInputProps("nik")}
                    type="text"
                    name="nik"
                    placeholder="Masukkan 16 digit NIK Anda"
                    className="relative w-full pl-13 pr-5 py-4 bg-white/5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500"
                    maxLength={16}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      form.setFieldValue('nik', value);
                      if (alert) setAlert(null);
                    }}
                    disabled={loading}
                  />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 ml-2">
                    {form.values.nik.length}/16 digit
                  </span>
                  <div className="flex space-x-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${form.values.nik.length >= (i + 1) * 4
                          ? 'bg-blue-400 shadow-lg shadow-blue-400/50'
                          : 'bg-gray-600'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {alert && (
                <div className="transform transition-all duration-300 animate-fadeIn">
                  <Alert
                    variant={alert.variant}
                    title={alert.title}
                    message={alert.message}
                    showLink={alert.showLink}
                    linkHref={alert.linkHref}
                    linkText={alert.linkText}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading || form.values.nik.length !== 16}
                className="w-full py-4 px-6  bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl  transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-3 group/button relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover/button:translate-x-[200%] transition-transform duration-700"></div>

                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-base">Memverifikasi...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <FaWifi className="w-5 h-5 group-hover/button:animate-pulse" />
                    <span className="text-base tracking-wide">Masuk ke Portal</span>
                  </div>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-gray-400">
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-16"></div>
                <span className="text-xs font-medium">Butuh bantuan?</span>
                <div className="h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent w-16"></div>
              </div>
              <a
                href="https://wa.me/628123456789"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-400 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Hubungi Customer Service
              </a>
            </div>


          </div>
        </div>
      </div>


    </div>
  );
};

export default SignIn;