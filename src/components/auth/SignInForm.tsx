"use client";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { deleteCookie, setCookie } from "cookies-next";
import { toast } from "react-toastify";
import { FaUserShield, FaPhoneAlt, FaSignInAlt } from "react-icons/fa";
import Alert from "@/components/ui/alert/Alert";
import { endpointUrl, httpGet, httpPost } from "../../../helpers";
import axios from "axios";
import { Root } from "@/types";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ variant: any; title: string; message: string; showLink: boolean; linkHref: string; linkText: string } | null>(null);

  const form = useForm({
    initialValues: {
      cid: "",
      phone: "",
    },
    validate: {
      cid: (value: any) =>
        !/^[0-9]+$/.test(value) ? "Customer ID hanya boleh berisi angka." : null,
      phone: (value: any) =>
        !/^(08)\d{8,11}$/.test(value) ? "Format nomor telepon salah (contoh: 0812...)." : null,
    },
  });

  const getMe = async () => {
    try {
      const response = await httpGet(endpointUrl(`b2c/b2c-user`), true);
      if (response.data.code === 200) {
        const user = response.data.data;

        localStorage.setItem("customer_name", user.customerName);
        localStorage.setItem("customer_id", user.id);
        localStorage.setItem("cid", user.cid);

        toast.success(`Selamat datang, ${user.customerName}! Mengalihkan...`);

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        throw new Error('Gagal mengambil data pengguna.');
      }
    } catch (error) {
      localStorage.removeItem('token');
      deleteCookie('token');
      throw new Error('Sesi tidak valid, silakan login kembali.');
    }
  }

  const onSubmit = async (payload: typeof form.values) => {
    setLoading(true);
    setAlert(null);
    const loginPayload = {
      username: payload.cid,
      password: payload.phone
    }
    try {
      const loginResponse = await httpPost(endpointUrl(`auth/b2c-user/login`), loginPayload);
      console.log(loginResponse.data.data)
      if (loginResponse.data.code === 500) {
        setAlert({
          variant: "error",
          title: "Login Gagal",
          message: loginResponse.data.msg,
          showLink: true,
          linkHref: "https://wa.me/628123456789",
          linkText: "Hubungi Customer Service",
        });
      }
      if (loginResponse.data.code === 200) {
        const { access_token } = loginResponse.data.data;
        localStorage.setItem("token", access_token);
        setCookie("token", access_token, {});
        await getMe();
      }
    } catch (error: any) {
      throw new Error('Terjadi kesalahan saat proses login. Silakan coba lagi.');
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
              <label
                htmlFor="cid"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Customer ID (CID)
              </label>
              <div className="relative">
                <FaUserShield className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...form.getInputProps("cid")}
                  id="cid"
                  type="text"
                  inputMode="numeric" 
                  pattern="[0-9]*"   
                  placeholder="Contoh: 11223344"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                  }}
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