"use client";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { FaUserShield, FaPhoneAlt, FaSignInAlt } from "react-icons/fa";
import Alert from "@/components/ui/alert/Alert";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ variant: any; title: string; message: string; showLink: boolean; linkHref: string; linkText: string } | null>(null);

  // Perubahan pada state form: dari nik menjadi cid dan phone
  const form = useForm({
    initialValues: {
      cid: "",
      phone: "",
    },
    validate: {
      cid: (value: any) =>
        value.length < 5 ? "Customer ID minimal 5 karakter" : null,
      phone: (value: any) =>
        !/^(08)\d{8,11}$/.test(value) ? "Format nomor telepon salah (contoh: 0812...)" : null,
    },
  });

  const onSubmit = async (payload: typeof form.values) => {
    setLoading(true);
    setAlert(null);
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    try {
      // Data mock baru disesuaikan dengan CID dan Phone
      const mockUsers = [
        { cid: "11223344", phone: "081313162548", name: "Budi Santoso", id: "user-001" },
        { cid: "JKT-0015", phone: "089876543210", name: "John Doe", id: "user-002" },
      ];

      const user = mockUsers.find(u => u.cid.toLowerCase() === payload.cid.toLowerCase() && u.phone === payload.phone);

      if (user) {
        const mockResponse = {
          token: "ini_adalah_mock_jwt_token_untuk_customer_NAMI",
          user: {
            id: user.id,
            name: user.name,
            cid: user.cid,
            phone: user.phone,
            role_id: 3
          },
        };

        localStorage.setItem("token", mockResponse.token);
        localStorage.setItem("role", mockResponse.user.role_id.toString());
        localStorage.setItem("name", mockResponse.user.name);
        localStorage.setItem("user_id", mockResponse.user.id);
        setCookie("token", mockResponse.token, {});
        setCookie("role", mockResponse.user.role_id.toString());

        toast.success(`Selamat datang, ${user.name}! Mengalihkan...`);

        setTimeout(() => {
          window.location.href = "/"; // Arahkan ke halaman utama setelah login
        }, 2000);
      } else {
        throw new Error("Customer ID atau Nomor Telepon tidak cocok.");
      }
    } catch (error: any) {
      setAlert({
        variant: "error",
        title: "Login Gagal",
        message: error.message || "Terjadi kesalahan.",
        showLink: true,
        linkHref: "https://wa.me/628123456789", // Ganti dengan nomor CS Anda
        linkText: "Hubungi Customer Service",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-1">
              NAMI NetHome
            </h1>
            <p className="text-gray-500 text-sm">
              Network Assistant Messaging Intelligence
            </p>
          </div>

          <form onSubmit={form.onSubmit(onSubmit)} className="space-y-6">
            {/* Input Customer ID */}
            <div>
              <label htmlFor="cid" className="block text-sm font-medium text-gray-700 mb-2">
                Customer ID (CID)
              </label>
              <div className="relative">
                <FaUserShield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...form.getInputProps("cid")}
                  id="cid"
                  type="text"
                  placeholder="Contoh: BDI-0012"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Input Nomor Telepon */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <FaPhoneAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...form.getInputProps("phone")}
                  id="phone"
                  type="tel"
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            {alert && (
              <Alert
                variant={alert.variant}
                title={alert.title}
                message={alert.message}
                showLink={alert.showLink}
                linkHref={alert.linkHref}
                linkText={alert.linkText}
              />
            )}

            <button
              type="submit"
              disabled={loading || !form.isValid()}
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transform hover:-translate-y-1 transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Bantuan */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Tidak bisa masuk?{" "}
              <a
                href="https://wa.me/628123456789" // Ganti dengan nomor CS Anda
                className="font-medium text-blue-600 hover:underline"
              >
                Hubungi Bantuan
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;